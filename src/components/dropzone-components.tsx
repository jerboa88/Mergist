import React, { ChangeEvent, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';


// Enables dropzone functionality for a child component. Accepts a callback function that fires when a file is dropped
export function DropzoneWrapper(props: { className: string; children: ReactNode; onFilesAdded: (files: FileList) => void; }) {
	function handleAddFiles(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		event.stopPropagation();

		const files = event.target.files;

		// The list will be empty if cancel is pressed, so we need to account for this
		// It should never be null but we might as well check it to make the TS compiler happy
		if (files && files.length > 0) {
			props.onFilesAdded(files);
		}
	}

	return (
		<label className={`cursor-pointer ${props.className}`}>
			{props.children}
			<input type="file" className="hidden" onChange={handleAddFiles} multiple />
		</label>
	);
}

DropzoneWrapper.defaultProps = {
	className: ''
};


// A large dropzone component. Accepts a callback function that fires when a file is dropped
export function LargeDropzone(props: { className: string; onFilesAdded: (files: FileList) => void; }) {
	return (
		<DropzoneWrapper className="flex flex-col flex-1" onFilesAdded={props.onFilesAdded}>
			<div className="flex flex-col justify-center flex-1 m-8 p-8 gap-8 text-center z-20 bg-base-100 hover:bg-base-200 border-2 border-dashed rounded-lg transition-color duration-200">
				<FontAwesomeIcon icon={faFileCirclePlus} className="fa-3x" />
				<p className='flex-grow-0'>Drag and drop PDF files here, or click to select files</p>
			</div>
		</DropzoneWrapper>
	);
}

LargeDropzone.defaultProps = {
	className: ''
};
