// Common methods used in the project
import { createContext, SyntheticEvent, useEffect, useRef } from 'react';
import { GatsbyConfig } from 'gatsby';
import { PDFDocument } from 'pdf-lib';
import { MetadataInterface, PDFFileMapInterface, SeverityTypes } from './types';


// Create context for updating the site theme
export const ThemeContext = createContext({
	isDarkTheme: true,
	toggleTheme: (() => { console.debug('this should never be called'); })
});


// Default transition settings for scaling animations
export const defaultTransition = {
	transition: {
		duration: .25,
		scale: {
			type: 'spring',
			duration: .25,
			bounce: .25,
		}
	}
}


export function doesWindowExist(): boolean {
	return typeof window !== 'undefined';
}


// Load site metadata from gatsby-config.js
export function loadMetadata(config: GatsbyConfig): MetadataInterface {
	// Cast to match expected return type. siteMetadata type is enforced in gatsby-config.js
	return config.siteMetadata as MetadataInterface;
}


// Stop default behavior for mouse events
export function ignoreDefault(event: SyntheticEvent<HTMLElement>): void {
	event.preventDefault();
	event.stopPropagation();
}


// Generate unique hashes from input parameters
// This is used to ensure that React component keys and PDF files are unique
// Adapted from a StackOverflow answer by esmiralha (https://stackoverflow.com/users/495174/esmiralha)
// Source: https://stackoverflow.com/a/7616484/1378560
function generateHash(...args: any[]): string {
	const inputString = args.join('');
	let hash = 0, chr;

	if (inputString.length === 0) {
		return hash.toString();
	}

	for (let i = 0; i < inputString.length; ++i) {
		chr = inputString.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return hash.toString();
}


export class StatusMsg {
	public id: string;
	private static prefixMap = {
		[SeverityTypes.SUCCESS]: 'Success',
		[SeverityTypes.WARNING]: 'Warning',
		[SeverityTypes.ERROR]: 'Error'
	}
	private static logFuncMap = {
		[SeverityTypes.SUCCESS]: (msg: string) => console.log(msg),
		[SeverityTypes.WARNING]: (msg: string) => console.warn(msg),
		[SeverityTypes.ERROR]: (msg: string) => console.error(msg),
	}

	constructor(public severity: SeverityTypes, public msg: string, private exception: Error | null = null) {
		this.id = generateHash(this.severity, this.msg, Date.now());
		this.severity = severity;
		this.msg = `${StatusMsg.prefixMap[severity]}: ${msg}`;
		this.exception = exception

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


export class PDFFile {
	public id: string;

	constructor(private fileObj: File) {
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


export class PDFManager {
	private pdfCreator: string;

	constructor(private pageTitle: string, private pageUrl: string) {
		this.pdfCreator = `${this.pageTitle} (${this.pageUrl})`;
	}

	// Filter out invalid input files. Returns a list of valid files and a list of warning messages
	public filterInvalidFiles(existingFileMap: PDFFileMapInterface, inputFiles: File[]): [PDFFile[], StatusMsg[]] {
		const fileList = [];
		const statusMsgList = [];

		for (const inputFile of inputFiles) {
			// Skip and show a warning if the file is not a pdf
			if (inputFile.type !== 'application/pdf') {
				statusMsgList.push(new StatusMsg(SeverityTypes.WARNING, `${inputFile.name} is not a PDF file`));
				continue;
			}

			const pdfFile = new PDFFile(inputFile);

			// Skip and show a warning if the file has already been added
			if (pdfFile.getId in existingFileMap) {
				statusMsgList.push(new StatusMsg(SeverityTypes.WARNING, `${pdfFile.getName} is already in the list`));
				continue;
			}

			fileList.push(pdfFile);
		}

		return [fileList, statusMsgList];
	}


	// Combine multiple PDF files into a single one using PDF-LIB
	// Adapted from a StackOverflow answer by Nicholas Barrow (https://stackoverflow.com/users/14717625/nicholas-barrow)
	// Source: https://stackoverflow.com/a/65555135/1378560
	public async createMergedFile(existingFileMap: PDFFileMapInterface, fileIds: string[], onProgress: (progress: number) => void): Promise<[string, StatusMsg[]]> {
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

				const keywords = donorPdfDoc.getKeywords();

				if (keywords) {
					keywords.split(/(?:, ?)/).forEach(keyword => keywordsSet.add(keyword));
				}

				subjectsSet.add(donorPdfDoc.getSubject());

				for (let j = 0; j < docLength; ++j) {
					const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [j]);

					pdfDoc.addPage(donorPage);
				}

				onProgress(this.calculateProgressPercentage(i + 1, numOfFiles));
			}

			pdfDoc.setTitle('Merged PDF')
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
			const errorMsg = new StatusMsg(SeverityTypes.ERROR, 'Something went wrong while while merging your files. See the console for more details.', error as Error);

			return ['', [errorMsg]];
		}
	}

	// Explicitly release the object URL when we no longer need it
	public async removeMergedFile(mergedPdfUrl: string) {
		window.URL.revokeObjectURL(mergedPdfUrl);
	}

	private calculateProgressPercentage(i: number, numOfFiles: number): number {
		const progress = i / numOfFiles;

		console.debug(`Merging file ${i} of ${numOfFiles} (${(progress * 100).toFixed(0)}%)`);

		return progress;
	}
}


export class StorageManager {
	private storage: Storage | null;

	constructor() {
		// Check if the window exists so that we do not run browser code on the server
		if (doesWindowExist()) {
			this.storage = window.localStorage;
		} else {
			this.storage = null;

			console.warn('StorageManager was instantiated server-side');
		}
	}

	public get(key: string, defaultValue: boolean): boolean {
		if (!this.storage) {
			return defaultValue;
		}

		const loadedValue = this.storage.getItem(key);

		// If there is no stored value, return the default value
		return loadedValue === null ? defaultValue : JSON.parse(loadedValue);
	}

	public set(key: string, value: boolean): void {
		this.storage && this.storage.setItem(key, JSON.stringify(value));
	}

	public remove(key: string): void {
		this.storage && this.storage.removeItem(key);
	}
}


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
