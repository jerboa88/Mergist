/*
	Common methods used in the project
	----------------------------------
*/

import {
	createContext,
	type SyntheticEvent,
	useContext,
	useEffect,
	useRef,
} from 'react';
import type { GatsbyConfig } from 'gatsby';
import { PDFDocument } from 'pdf-lib';
import {
	type MetadataInterface,
	type PdfFileMapInterface,
	SeverityTypes,
} from '../common/types.ts';

// Constants

const regexKeywordSeparator = /, ?/;

// Generate unique hashes from input parameters
// This is used to ensure that React component keys and PDF files are unique
// Adapted from a StackOverflow answer by esmiralha (https://stackoverflow.com/users/495174/esmiralha)
// Source: https://stackoverflow.com/a/7616484/1378560
function generateHash(...args: unknown[]): string {
	const inputString = args.join('');
	let hash = 0;
	let chr = 0;

	if (inputString.length === 0) {
		return String(hash);
	}

	for (let i = 0; i < inputString.length; ++i) {
		chr = inputString.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return String(hash);
}

// Exports

// Custom React hook that returns whether the current render is the first render
// Adapted from a StackOverflow answer by Scotty Waggoner (https://stackoverflow.com/users/665224/scotty-waggoner)
// Source: https://stackoverflow.com/a/56267719/1378560
export const useIsMount = () => {
	const isMountRef = useRef(true);

	useEffect(() => {
		isMountRef.current = false;
	}, []);

	return isMountRef.current;
};

// Context for updating the site theme
export const DarkThemeContext = createContext({
	isEnabled: true,
	toggle: () => {
		/* no-op */
	},
});

// Context for updating whether animations with motion are allowed
export const AllowMotionContext = createContext({
	isEnabled: true,
	toggle: () => {
		/* no-op */
	},
});

// Return whether animations with motion are allowed
export const getIsMotionAllowed = () => {
	const { isEnabled } = useContext(AllowMotionContext);

	return (() => isEnabled)();
};

// Default transition settings for Framer Motion animations
export function getDefaultTransition() {
	if (getIsMotionAllowed()) {
		return {
			transition: {
				duration: 0.2,
				scale: {
					type: 'spring',
					duration: 0.2,
					bounce: 0.2,
				},
			},
		};
	}

	return {
		transition: {
			duration: 0,
		},
	};
}

// Check if the window object exists
// This will return false if the method is called from a server-side environment
export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}

// Check if the document object exists
// This will return false if the method is called from a server-side environment
export function doesDocumentExist(): boolean {
	return typeof document !== 'undefined';
}

// Check if the browser supports the provided media feature and whether it matches the provided value
// Otherwise, return the provided default value
export function mediaFeatureMatches(
	mediaFeature: string,
	expectedResult: string,
	defaultValue: boolean,
): boolean {
	const mediaQuery = `(${mediaFeature})`;
	const specificMediaQuery = `(${mediaFeature}: ${expectedResult})`;

	// If browser supports media queries, check if the media feature matches the expected value
	if (
		doesWindowExist() &&
		window.matchMedia &&
		window.matchMedia(mediaQuery).media !== 'not all'
	) {
		return window.matchMedia(specificMediaQuery).matches;
	}

	return defaultValue;
}

// Load site metadata from gatsby-config.js
export function loadMetadata(config: GatsbyConfig): MetadataInterface {
	// Cast to match expected return type. siteMetadata type is enforced in gatsby-config.js
	return config.siteMetadata as MetadataInterface;
}

// Stop default behavior for mouse events
export function ignoreDefault(event: SyntheticEvent<HTMLElement>) {
	event.preventDefault();
	event.stopPropagation();
}

// A class to represent a status message and its severity
export class StatusMsg {
	public id: string;
	private static prefixMap = {
		[SeverityTypes.Success]: 'Success',
		[SeverityTypes.Warning]: 'Warning',
		[SeverityTypes.Error]: 'Error',
	};
	private static logFuncMap = {
		[SeverityTypes.Success]: (msg: string) => console.log(msg),
		[SeverityTypes.Warning]: (msg: string) => console.warn(msg),
		[SeverityTypes.Error]: (msg: string) => console.error(msg),
	};
	public severity: SeverityTypes;
	public msg: string;
	private exception: Error | null;

	constructor(
		severity: SeverityTypes,
		msg: string,
		exception: Error | null = null,
	) {
		this.id = generateHash(severity, msg, Date.now());
		this.severity = severity;
		this.msg = `${StatusMsg.prefixMap[severity]}: ${msg}`;
		this.exception = exception;

		// Log message immediately upon creation
		this.log();
	}

	public get getId(): string {
		return this.id;
	}

	public get getSeverity(): SeverityTypes {
		return this.severity;
	}

	public get getMsg(): string {
		return this.msg;
	}

	private log() {
		StatusMsg.logFuncMap[this.severity](this.msg);

		if (this.exception) {
			console.error(this.exception);
		}
	}
}

// A class to represent a PDF file
// This wraps a File object and adds an id to uniquely identify it
export class PdfFile {
	public id: string;
	private fileObj: File;

	constructor(fileObj: File) {
		this.id = generateHash(fileObj.name, fileObj.size, fileObj.lastModified);
		this.fileObj = fileObj;
	}

	public get getId(): string {
		return this.id;
	}

	public get getName(): string {
		return this.fileObj.name;
	}

	public get getSize(): number {
		return this.fileObj.size;
	}

	public arrayBuffer(): Promise<ArrayBuffer> {
		return this.fileObj.arrayBuffer();
	}
}

// A class with methods for loading PDF files and processing them
export class PdfManager {
	private pdfCreator: string;

	constructor(pageTitle: string, pageUrl: string) {
		this.pdfCreator = `${pageTitle} (${pageUrl})`;
	}

	// Filter out invalid input files. Returns a list of valid files and a list of warning messages
	public filterInvalidFiles(
		existingFileMap: PdfFileMapInterface,
		inputFiles: File[],
	): [PdfFile[], StatusMsg[]] {
		const fileList: PdfFile[] = [];
		const statusMsgList: StatusMsg[] = [];

		for (const inputFile of inputFiles) {
			// Skip and show a warning if the file is not a pdf
			if (inputFile.type !== 'application/pdf') {
				statusMsgList.push(
					new StatusMsg(
						SeverityTypes.Warning,
						`${inputFile.name} is not a PDF file`,
					),
				);
				continue;
			}

			const pdfFile = new PdfFile(inputFile);

			// Skip and show a warning if the file has already been added
			if (pdfFile.getId in existingFileMap) {
				statusMsgList.push(
					new StatusMsg(
						SeverityTypes.Warning,
						`${pdfFile.getName} is already in the list`,
					),
				);
				continue;
			}

			fileList.push(pdfFile);
		}

		return [fileList, statusMsgList];
	}

	// Combine multiple PDF files into a single one using PDF-LIB
	// Adapted from a StackOverflow answer by Nicholas Barrow (https://stackoverflow.com/users/14717625/nicholas-barrow)
	// Source: https://stackoverflow.com/a/65555135/1378560
	public async createMergedFile(
		existingFileMap: PdfFileMapInterface,
		fileIds: string[],
		onProgress: (progress: number) => void,
	): Promise<[string, StatusMsg[]]> {
		try {
			const numOfFiles = fileIds.length;
			const authorsSet = new Set();
			const creatorsSet = new Set();
			const keywordsSet = new Set() as Set<string>;
			const subjectsSet = new Set();
			const pdfDoc = await PDFDocument.create();

			for (let i = 0; i < numOfFiles; ++i) {
				const arrayBuffer = await existingFileMap[fileIds[i]].arrayBuffer();
				const donorPdfDoc = await PDFDocument.load(arrayBuffer);
				const docLength = donorPdfDoc.getPageCount();

				authorsSet.add(donorPdfDoc.getAuthor());
				creatorsSet.add(donorPdfDoc.getCreator());

				const keywordsString = donorPdfDoc.getKeywords();

				if (keywordsString) {
					const keywords = new Set(keywordsString.split(regexKeywordSeparator));

					keywordsSet.union(keywords);
				}

				subjectsSet.add(donorPdfDoc.getSubject());

				for (let j = 0; j < docLength; ++j) {
					const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [j]);

					pdfDoc.addPage(donorPage);
				}

				onProgress(this.calculateProgressPercentage(i + 1, numOfFiles));
			}

			// Set metadata of the created file using the metadata from all input files
			pdfDoc.setTitle('Merged PDF');
			pdfDoc.setSubject(Array.from(subjectsSet).join(', '));
			pdfDoc.setKeywords(Array.from(keywordsSet));
			pdfDoc.setAuthor(Array.from(authorsSet).join(', '));
			pdfDoc.setCreator(this.pdfCreator);
			pdfDoc.setProducer(this.pdfCreator);
			pdfDoc.setCreationDate(new Date());
			pdfDoc.setModificationDate(new Date());

			const byteArray = await pdfDoc.save();
			const blob = new Blob([byteArray], { type: 'application/pdf' });
			const pdfDataUri = window.URL.createObjectURL(blob);

			return [pdfDataUri, []];
		} catch (error) {
			const errorMsg = new StatusMsg(
				SeverityTypes.Error,
				'Something went wrong while while merging your files. See the console for more details.',
				error as Error,
			);

			return ['', [errorMsg]];
		}
	}

	// Explicitly release the object URL when we no longer need it
	public removeMergedFile(mergedPdfUrl: string) {
		window.URL.revokeObjectURL(mergedPdfUrl);
	}

	// Calculate the progress percentage of the merge process
	private calculateProgressPercentage(i: number, numOfFiles: number): number {
		const progress = i / numOfFiles;

		console.debug(
			`Merging file ${i} of ${numOfFiles} (${(progress * 100).toFixed(0)}%)`,
		);

		return progress;
	}
}
