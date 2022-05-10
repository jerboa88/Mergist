import React, { ReactNode } from 'react';
import { faFileCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropzoneWrapper } from './dropzone-components';


export function IconButtonLink(props: { className: string; href: string; icon: IconDefinition; children: ReactNode }) {
	return (
		<a href={props.href} className={`btn btn-ghost text-secondary gap-2 flex-1 ${props.className}`}>
			<FontAwesomeIcon icon={props.icon} />
			{props.children}
		</a>
	);
}

IconButtonLink.defaultProps = {
	className: ''
};


export function AddFilesButton(props: { className: string; onFilesAdded: (files: FileList) => void; }) {
	return (
		<DropzoneWrapper className="btn btn-primary gap-2" onFilesAdded={props.onFilesAdded}>
			<FontAwesomeIcon icon={faFileCirclePlus} />
			Add File
		</DropzoneWrapper>
	);
}

AddFilesButton.defaultProps = {
	className: ''
};
