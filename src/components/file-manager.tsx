/*
	Component for displaying a list of files and associated action buttons
	----------------------------------------------------------------------
*/

import {
	faFileCirclePlus,
	faGripVertical,
	faTrash,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, Reorder } from 'framer-motion';
import prettyBytes from 'pretty-bytes';
import { getDefaultTransition, ignoreDefault } from '../common/utilities';
import type { PDFFileMapInterface } from '../common/types';
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
			<div className="overflow-hidden flex-row gap-0 items-center sm:gap-2">
				<IconButton icon={faGripVertical} />
				<p className="overflow-hidden font-bold whitespace-nowrap text-ellipsis">
					{props.name}
				</p>
			</div>

			<div className="overflow-hidden flex-row flex-none gap-0 items-center sm:gap-2">
				<p className="whitespace-nowrap">
					({prettyBytes(props.size, { maximumFractionDigits: 0 })})
				</p>
				<div className="justify-end card-actions">
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
			className="overflow-hidden flex-col gap-5 px-6 py-7 shadow-inner bg-base-300"
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
			<div className="flex-col gap-4 justify-between items-center p-6 text-lg font-medium sm:flex-row sm:pl-10 collapse-title">
				<h2>
					{props.fileIds.length} file{props.fileIds.length !== 1 && 's'} added (
					{getEstimatedFileSize()})
				</h2>
				<div className="flex-row flex-1 gap-2 sm:flex-none">
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
