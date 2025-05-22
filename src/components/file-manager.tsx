/*
	Component for displaying a list of files and associated action buttons
	----------------------------------------------------------------------
*/

import React from 'react';
import {
	faFileCirclePlus,
	faGripVertical,
	faTrash,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, Reorder } from 'framer-motion';
import prettyBytes from 'pretty-bytes';
import { getDefaultTransition, ignoreDefault } from '../common/utilities';
import { PDFFileMapInterface } from '../common/types';
import { IconButton, PrimaryButton } from '../components/button-components';
import { DropzoneWrapper } from '../components/dropzone-components';

// Base components

// A reorderable list item
function SortableItem(props: {
	id: string;
	name: string;
	size: number;
	onRemove: (fileId: string) => void;
	disabled: boolean;
}) {
	const classNames = `bg-base-100 shadow-md flex-row justify-between p-2 gap-4 rounded-lg cursor-pointer overflow-hidden hover:bg-base-200 ${(props.disabled && 'opacity-40') || ''}`;
	const animationProps = {
		initial: {
			scale: 0,
		},
		animate: {
			scale: 1,
		},
		exit: {
			scale: 0,
		},
		...getDefaultTransition(),
	};

	return (
		<Reorder.Item
			key={props.id}
			value={props.id}
			className={classNames}
			{...animationProps}
		>
			<div className="flex-row items-center overflow-hidden gap-0 sm:gap-2">
				<IconButton icon={faGripVertical} />
				<p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
					{props.name}
				</p>
			</div>

			<div className="flex-row flex-none items-center overflow-hidden gap-0 sm:gap-2">
				<p className="whitespace-nowrap">
					({prettyBytes(props.size, { maximumFractionDigits: 0 })})
				</p>
				<div className="card-actions justify-end">
					<IconButton icon={faXmark} onClick={() => props.onRemove(props.id)} />
				</div>
			</div>
		</Reorder.Item>
	);
}

// Create an interface for SortableFileList props since there are a lot of types to define
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
		<Reorder.Group
			axis="y"
			values={props.fileIds}
			onReorder={props.onReorder}
			className="flex-col px-6 py-7 gap-5 bg-base-300 shadow-inner overflow-hidden"
		>
			<AnimatePresence>
				{props.fileIds.map((fileId) => (
					<SortableItem
						key={fileId}
						id={fileId}
						name={props.files[fileId].getName}
						size={props.files[fileId].getSize}
						onRemove={props.onFileRemoved}
						disabled={props.disabled}
					/>
				))}
			</AnimatePresence>
		</Reorder.Group>
	);
}

// Exports

// Create an interface for FileManager props since there are a lot of types to define
interface FileManagerPropsInterface extends SortableFileListPropsInterface {
	onFileAdded: (inputFiles: FileList) => void;
	onAllFilesRemoved: () => void;
}

// A component that allows the user to add and remove PDF files from a list
export default function FileManager(props: FileManagerPropsInterface) {
	// Calculate the combined size of all files using a reduction
	function getEstimatedFileSize() {
		return prettyBytes(
			Object.values(props.files).reduce(
				(partialSum, pdfFile) => partialSum + pdfFile.getSize,
				0,
			),
		);
	}

	return (
		<div tabIndex={0} className="collapse">
			<div className="flex-col sm:flex-row justify-between items-center p-6 sm:pl-10 gap-4 collapse-title text-lg font-medium">
				<h2>
					{props.fileIds.length} file{props.fileIds.length !== 1 && 's'} added (
					{getEstimatedFileSize()})
				</h2>
				<div className="flex-row gap-2 flex-1 sm:flex-none">
					<DropzoneWrapper onFilesAdded={props.onFileAdded}>
						<PrimaryButton icon={faFileCirclePlus} fake>
							Add File
						</PrimaryButton>
					</DropzoneWrapper>

					<PrimaryButton icon={faTrash} onClick={props.onAllFilesRemoved}>
						Remove All
					</PrimaryButton>
				</div>
			</div>

			{/* Wrap the SortableFileList component with a div so that we can selectively prevent propagation of click events to it */}
			<div
				style={{ pointerEvents: (props.disabled && 'none') || 'initial' }}
				onClick={(props.disabled && ignoreDefault) || undefined}
				className="overflow-hidden"
			>
				<SortableFileList
					fileIds={props.fileIds}
					files={props.files}
					onReorder={props.onReorder}
					onFileRemoved={props.onFileRemoved}
					disabled={props.disabled}
				/>
			</div>
		</div>
	);
}
