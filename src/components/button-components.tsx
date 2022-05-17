/*
	Reusable button components
	--------------------------
*/


import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faTrash, faLayerGroup, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { DropzoneWrapper } from '../components/dropzone-components';
import { motion } from 'framer-motion';


// Base components
function ProgressBar(props: { progress: string; }) {
	return (
		<div className="w-full h-1">
			<motion.div role="progressbar" className="h-full bg-primary-content rounded-full" initial={{ width: 0 }} animate={{ width: props.progress }} transition={{
				type: 'inertia',
				power: 1,
				timeConstant: 1000,
				velocity: 100
			}} />
		</div>
	);
}


function FullWidthButton(props: { className: string; children: ReactNode; disabled: boolean; onClick: () => void; }) {
	return (
		<button className={`btn btn-block gap-2 ${props.className}`} disabled={props.disabled} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

FullWidthButton.defaultProps = {
	className: '',
	disabled: false,
	onClick: () => { }
}


function DownloadActionButton(props: { downloadUrl: string }) {
	return (
		<a href={props.downloadUrl} target="_blank" rel="noopener noreferrer" download="merged.pdf" className="w-full">
			<FullWidthButton className="btn-accent">
				<FontAwesomeIcon icon={faFileArrowDown} />
				Download
			</FullWidthButton>
		</a>
	);
}


function ProgressActionButton(props: { progress: number }) {
	const isSaving = props.progress >= 1;
	const percentString = `${(props.progress * 100).toFixed(0)}%`;

	return (
		<div className="flex flex-col gap-2 w-full text-center">
			<FullWidthButton className={`btn-primary flex flex-col justify-between p-0 pt-4 border-0 overflow-hidden ${isSaving ? 'loading' : ''}`} disabled={true}>
				{!isSaving && percentString}
				<ProgressBar progress={percentString} />
			</FullWidthButton>
		</div>
	)
}


function MergeActionButton(props: { onClick: () => void; disabled: boolean }) {
	const mergeButton = (
		<FullWidthButton className="btn-primary" disabled={props.disabled} onClick={props.onClick}>
			<FontAwesomeIcon icon={faLayerGroup} />
			Merge Files
		</FullWidthButton>
	);

	return (
		<div className="flex flex-col gap-2 w-full text-center">
			{/* Wrap merge button with a tooltip if it is disabled */}
			{props.disabled && <div className="tooltip tooltip-warning" data-tip="Please add more files to merge">
				{mergeButton}
			</div> || mergeButton}
		</div>
	);
}


// Exports
export function AddFilesButton(props: { onClick: (files: FileList) => void; }) {
	return (
		// DropzoneWrapper isn't technically needed here but it lets us reuse the same event handling logic
		<DropzoneWrapper className="btn btn-primary gap-2" onFilesAdded={props.onClick}>
			<FontAwesomeIcon icon={faFileCirclePlus} />
			Add File
		</DropzoneWrapper>
	);
}


export function RemoveFilesButton(props: { onClick: () => void; }) {
	return (
		<button className="btn btn-primary gap-2" onClick={props.onClick}>
			<FontAwesomeIcon icon={faTrash} />
			Remove All
		</button>
	);
}


// Action button that changes based on the current state
export function ActionButton(props: { numOfFiles: number; progress: number; downloadUrl: string; onClick: () => void; }) {
	return (() => {
		if (props.downloadUrl) {
			return <DownloadActionButton downloadUrl={props.downloadUrl} />;
		}

		if (props.progress > 0) {
			return <ProgressActionButton progress={props.progress} />
		}

		return <MergeActionButton onClick={props.onClick} disabled={props.numOfFiles < 2} />
	})();
}
