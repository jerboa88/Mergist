import React, { ChangeEvent, ReactNode, useRef, useState, MouseEvent, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ignoreDefault } from '../common/utilities';


// Enables dropzone functionality for a child component. Accepts a callback function that fires when a file is dropped
export function DropzoneWrapper(props: { className: string; children: ReactNode; onFilesAdded: (files: FileList) => void; }) {
	function handleAddFiles(event: ChangeEvent<HTMLInputElement>) {
		ignoreDefault(event);

		const files = event.target.files;

		// The list will be empty if cancel is pressed, so we need to account for this
		// It should never be null but we might as well check it to make the TS compiler happy
		if (files && files.length > 0) {
			props.onFilesAdded(files);
		}
	}

	return (
		<label className={`cursor-pointer ${props.className}`}>
			<input className="hidden" type="file" accept="application/pdf" onChange={handleAddFiles} multiple />
			{props.children}
		</label>
	);
}

DropzoneWrapper.defaultProps = {
	className: ''
};


// A large dropzone component. Accepts a callback function that fires when a file is dropped
export function LargeDropzone(props: { onFilesAdded: (files: FileList) => void; }) {
	return (
		<DropzoneWrapper className="flex flex-col flex-1" onFilesAdded={props.onFilesAdded}>
			<div className="flex flex-col justify-center flex-1 m-8 p-8 gap-8 text-center z-20 bg-base-100 hover:bg-base-200 border-2 border-dashed rounded-lg transition-color duration-200">
				<FontAwesomeIcon icon={faFileCirclePlus} className="fa-3x" />
				<p className='flex-grow-0'>Drag and drop PDF files here, or click to select files</p>
			</div>
		</DropzoneWrapper>
	);
}


// A full screen dropzone component. Accepts a callback function that fires when a file is dropped
// https://github.com/react-dropzone/react-dropzone/issues/753#issuecomment-774782919
export function FullPageDropzone(props: { onFilesAdded: (files: FileList) => void; }) {
	const [isDragging, setIsDragging] = useState(false);

	const dragCounter = useRef(0);


	// Prevent propagation of default events
	function blockDefaultEvent(event: MouseEvent<HTMLDivElement, MouseEvent>) {
		event.preventDefault();
		event.stopPropagation();
	}

	const handleDrag = useCallback((event) => {
		blockDefaultEvent(event);
	}, []);

	const handleDragIn = useCallback((event) => {
		blockDefaultEvent(event);

		dragCounter.current++;

		if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragOut = useCallback((event) => {
		blockDefaultEvent(event);

		dragCounter.current--;

		if (dragCounter.current > 0) {
			return;
		}

		setIsDragging(false);
	}, []);

	const handleDrop = useCallback((event) => {
		blockDefaultEvent(event);
		setIsDragging(false);

		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			dragCounter.current = 0;

			props.onFilesAdded(event.dataTransfer.files);
			event.dataTransfer.clearData();
		}
	}, [props.onFilesAdded]);


	useEffect(() => {
		window.addEventListener('dragenter', handleDragIn);
		window.addEventListener('dragleave', handleDragOut);
		window.addEventListener('dragover', handleDrag);
		window.addEventListener('drop', handleDrop);

		return () => {
			window.removeEventListener('dragenter', handleDragIn);
			window.removeEventListener('dragleave', handleDragOut);
			window.removeEventListener('dragover', handleDrag);
			window.removeEventListener('drop', handleDrop);
		};
	});


	return (
		<div className={`fixed inset-0 flex flex-col justify-center items-center p-16 bg-base-100/50 z-10 ${isDragging ? '' : 'hidden'}`} />
	);
}
