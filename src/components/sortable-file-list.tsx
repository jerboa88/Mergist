
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, Reorder } from 'framer-motion';
import prettyBytes from 'pretty-bytes';
import { defaultTransition, ignoreDefault } from '../common/utilities';
import { PDFFileMapInterface } from '../common/types';
import { AddFilesButton, RemoveFilesButton } from '../components/button-components';


// Base components
interface SortableFileListPropsInterface {
	fileIds: string[];
	files: PDFFileMapInterface;
	onReorder: (newFileIds: string[]) => void;
	onFileRemoved: (id: string) => void;
	disabled: boolean;
}

// A reorderable list of PDF files
function SortableFileList(props: SortableFileListPropsInterface) {
	return (
		<Reorder.Group axis="y" values={props.fileIds} onReorder={props.onReorder} className="flex flex-col px-6 py-7 gap-5 bg-base-300 shadow-inner overflow-hidden">
			<AnimatePresence>
				{props.fileIds.map((fileId) => (
					<SortableItem key={fileId} id={fileId} name={props.files[fileId].getName} size={props.files[fileId].getSize} onRemove={props.onFileRemoved} disabled={props.disabled} />
				))}
			</AnimatePresence>
		</Reorder.Group>
	);
}


// A reorderable list item
function SortableItem(props: { id: string; name: string; size: number; onRemove: (fileId: string) => void; disabled: boolean }) {
	const classNames = `bg-base-100 shadow-md flex flex-row justify-between items-center p-2 gap-4 rounded-lg cursor-pointer hover:bg-base-200 ${props.disabled && 'opacity-40' || ''}`;
	const animationProps = {
		initial: {
			scale: 0
		},
		animate: {
			scale: 1
		},
		exit: {
			scale: 0
		},
		...defaultTransition
	}

	return (
		<Reorder.Item key={props.id} value={props.id} className={classNames} {...animationProps}>
			<button className="btn btn-square btn-ghost">
				<FontAwesomeIcon icon={faGripVertical} className="fa-lg" />
			</button>
			<p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{props.name}</p>
			<div className="flex-1" />
			<p className="whitespace-nowrap">({prettyBytes(props.size)})</p>
			<div className="card-actions justify-end">
				<button className="btn btn-square btn-ghost" onClick={() => props.onRemove(props.id)}>
					<FontAwesomeIcon icon={faXmark} className="fa-lg" />
				</button>
			</div>
		</Reorder.Item>
	);
}


// Exports
interface FileManagerPropsInterface extends SortableFileListPropsInterface {
	onFileAdded: (inputFiles: FileList) => void;
	onAllFilesRemoved: () => void;
}

// A component that allows the user to add and remove PDF files from a list
export default function FileManager(props: FileManagerPropsInterface) {
	function getEstimatedFileSize() {
		return prettyBytes(Object.values(props.files).reduce((partialSum, pdfFile) => partialSum + pdfFile.getSize, 0));
	}

	return (
		<div tabIndex={0} className="collapse">
			<div className="flex flex-row justify-between items-center p-6 collapse-title text-lg font-medium">
				<h5 className="pl-4">{props.fileIds.length} file{props.fileIds.length !== 1 && 's'} added ({getEstimatedFileSize()})</h5>
				<div className="flex flex-row gap-2">
					<AddFilesButton onClick={props.onFileAdded} />
					<RemoveFilesButton onClick={props.onAllFilesRemoved} />
				</div>
			</div>

			{/* Wrap the SortableFileList component with a div so that we can selectively prevent propagation of click events to it */}
			<div style={{ pointerEvents: props.disabled && 'none' || 'initial' }} onClick={props.disabled && ignoreDefault || undefined} className="overflow-hidden">
				<SortableFileList fileIds={props.fileIds} files={props.files} onReorder={props.onReorder} onFileRemoved={props.onFileRemoved} disabled={props.disabled} />
			</div>
		</div>
	);
}
