/*
	Reusable dropzone components
	----------------------------
*/

import {
	type ChangeEvent,
	type ReactNode,
	useRef,
	useState,
	useCallback,
	useEffect,
	type DragEvent,
} from 'react';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ignoreDefault } from '../common/utilities';
import { Icon } from '../components/icon-components';

// Enables dropzone functionality for a child component. Accepts a callback function that fires when a file is dropped
export function DropzoneWrapper(props: {
	className: string;
	children: ReactNode;
	onFilesAdded: (files: FileList) => void;
}) {
	function handleAddFiles(event: ChangeEvent<HTMLInputElement>) {
		ignoreDefault(event);

		const files = event.target.files;

		// The list will be empty if cancel is pressed, so we need to account for this
		// It should never be null but we might as well check to make the TS compiler happy
		if (files && files.length > 0) {
			props.onFilesAdded(files);
		}
	}

	return (
		<label className={`cursor-pointer ${props.className}`}>
			<input
				className="hidden"
				type="file"
				accept="application/pdf"
				onChange={handleAddFiles}
				multiple
			/>
			{props.children}
		</label>
	);
}

DropzoneWrapper.defaultProps = {
	className: '',
};

// A large dropzone component. Accepts a callback function that fires when a file is dropped
export function LargeDropzone(props: {
	onFilesAdded: (files: FileList) => void;
}) {
	return (
		<DropzoneWrapper
			className="flex-col flex-1"
			onFilesAdded={props.onFilesAdded}
		>
			<div className="z-20 flex-col flex-1 gap-8 justify-center p-8 m-8 text-center rounded-lg border-2 border-dashed bg-base-100 hover:bg-base-200">
				<Icon icon={faFileCirclePlus} tw="fa-3x" />
				<p className="flex-grow-0">
					Drag and drop PDF files here, or click to select files
				</p>
			</div>
		</DropzoneWrapper>
	);
}

// A full screen dropzone component. Accepts a callback function that fires when a file is dropped
// Adapted from a GitHub comment by jlarmstrongiv (https://github.com/jlarmstrongiv)
// Source: https://github.com/react-dropzone/react-dropzone/issues/753#issuecomment-774782919
export function FullPageDropzone(props: {
	onFilesAdded: (files: FileList) => void;
}) {
	const [isDragging, setIsDragging] = useState(false);
	const dragCounter = useRef(0);

	const handleDrag = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);
	}, []);

	const handleDragIn = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);

		dragCounter.current++;

		if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragOut = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);

		dragCounter.current--;

		if (dragCounter.current > 0) {
			return;
		}

		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(event: DragEvent<HTMLElement>) => {
			ignoreDefault(event);
			setIsDragging(false);

			if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
				dragCounter.current = 0;

				props.onFilesAdded(event.dataTransfer.files);
				event.dataTransfer.clearData();
			}
		},
		[props.onFilesAdded],
	);

	useEffect(() => {
		// Force cast event parameter from the placeholder globalThis type to a proper React event type
		type DragEventHandler = (event: unknown | globalThis.DragEvent) => void;

		window.addEventListener('dragenter', handleDragIn as DragEventHandler);
		window.addEventListener('dragleave', handleDragOut as DragEventHandler);
		window.addEventListener('dragover', handleDrag as DragEventHandler);
		window.addEventListener('drop', handleDrop as DragEventHandler);

		return () => {
			window.removeEventListener('dragenter', handleDragIn as DragEventHandler);
			window.removeEventListener(
				'dragleave',
				handleDragOut as DragEventHandler,
			);
			window.removeEventListener('dragover', handleDrag as DragEventHandler);
			window.removeEventListener('drop', handleDrop as DragEventHandler);
		};
	});

	return (
		<div
			className={`fixed inset-0 flex-col justify-center items-center p-16 bg-base-100/50 z-10 ${isDragging ? '' : 'hidden'}`}
		/>
	);
}
