// External deps
import { useState, useCallback } from 'react';

// Local deps
import config from '../../gatsby-config.ts';
import type { PDFFileMapInterface } from '../common/types.ts';
import {
	loadMetadata,
	PDFManager,
	type StatusMsg,
} from '../common/utilities.ts';
import { Main, PageLayout, Section } from '../components/layout-components.tsx';
import {
	FullPageDropzone,
	LargeDropzone,
} from '../components/dropzone-components.tsx';
import Alert from '../components/alert.tsx';
import { ActionButton } from '../components/button-components.tsx';
import Footer from '../components/footer.tsx';
import Header from '../components/header.tsx';
import FileManager from '../components/file-manager.tsx';

// Constants

const METADATA = loadMetadata(config);

// Exports

// Index page component
export default function IndexPage() {
	const [fileIds, setFileIds] = useState<string[]>([]);
	const [files, setFiles] = useState<PDFFileMapInterface>({});
	const [statusMsgs, setStatusMsgs] = useState<StatusMsg[]>([]);
	const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
	const [currentProgress, setCurrentProgress] = useState<number>(0);

	const pdfManager = new PDFManager(METADATA.shortTitle, METADATA.siteUrl);

	// Update the list of files and fileIds, resetting progress and the download URL
	function updateState(
		newFileIds: string[],
		newFiles: PDFFileMapInterface | null = null,
	) {
		pdfManager.removeMergedFile(mergedPdfUrl);

		// Skip updating if the file map hasn't changed
		if (newFiles) {
			setFiles(newFiles);
		}

		setFileIds(newFileIds);
		setCurrentProgress(0);
		setMergedPdfUrl('');
	}

	// Handler for file upload events
	const handleAddFiles = useCallback(
		(inputFiles: FileList) => {
			const [validFileList, statusMsgList] = pdfManager.filterInvalidFiles(
				files,
				Array.from(inputFiles),
			);

			if (validFileList.length > 0) {
				const tempFileMap = files;
				const newFileIds = [] as string[];

				for (const file of validFileList) {
					newFileIds.push(file.id);
					tempFileMap[file.id] = file;
				}

				updateState(fileIds.concat(newFileIds), tempFileMap);
			}

			if (statusMsgList.length > 0) {
				setStatusMsgs(statusMsgList);
			}
		},
		[fileIds, files],
	);

	// Remove a single file from the list given its id
	function handleRemoveFile(id: string) {
		const newFiles = files;
		const newFileIds = fileIds.filter((fileId) => fileId !== id);

		delete newFiles[id];

		updateState(newFileIds, newFiles);
	}

	// Remove all files from the list
	function handleRemoveAllFiles() {
		updateState([], {});
	}

	// Reorder the list of file ids
	function handleReorderFiles(fileIds: string[]) {
		updateState(fileIds);
	}

	// Handle clicks on merge button
	async function handleMerge() {
		const [downloadUrl, statusMsgList] = await pdfManager.createMergedFile(
			files,
			fileIds,
			setCurrentProgress,
		);

		// Reset progress if there were any critical errors
		if (downloadUrl === '') {
			setMergedPdfUrl('');
		}

		setMergedPdfUrl(downloadUrl);
		setStatusMsgs(statusMsgList);
		setCurrentProgress(0);
	}

	return (
		<PageLayout metadata={METADATA}>
			<Header title={METADATA.shortTitle}>{METADATA.description}</Header>

			<Main>
				<FullPageDropzone onFilesAdded={handleAddFiles} />

				<Section visible={statusMsgs.length > 0} className="gap-5">
					{statusMsgs.map((statusMsg) => (
						<Alert key={statusMsg.getId} statusMsg={statusMsg} />
					))}
				</Section>

				<Section
					visible={fileIds.length === 0}
					tabIndex={0}
					className="flex-1 rounded-none border bg-base-100 border-base-300 sm:rounded-box"
				>
					<LargeDropzone onFilesAdded={handleAddFiles} />
				</Section>

				<Section
					visible={fileIds.length > 0}
					tabIndex={0}
					className="rounded-none border bg-base-100 border-base-300 sm:rounded-box"
				>
					<FileManager
						fileIds={fileIds}
						files={files}
						onReorder={handleReorderFiles}
						onFileAdded={handleAddFiles}
						onFileRemoved={handleRemoveFile}
						onAllFilesRemoved={handleRemoveAllFiles}
						disabled={currentProgress > 0}
					/>
				</Section>

				<Section visible={fileIds.length > 0} className="px-6 sm:px-0">
					<ActionButton
						numOfFiles={fileIds.length}
						progress={currentProgress}
						downloadUrl={mergedPdfUrl}
						onClick={handleMerge}
					/>
				</Section>
			</Main>

			<Footer
				author={METADATA.author}
				githubUrl={METADATA.githubUrl}
				homepageDomain={METADATA.homepageDomain}
			/>
		</PageLayout>
	);
}
