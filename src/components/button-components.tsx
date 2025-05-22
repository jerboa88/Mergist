/*
	Reusable button components
	--------------------------
*/

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
	faLayerGroup,
	faFileArrowDown,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../components/icon-components';

// Base components

// A simple progress bar component for the progress action button
function ProgressBar(props: { progress: string }) {
	const animationProps = {
		initial: {
			width: 0,
		},
		animate: {
			width: props.progress,
		},
		transition: {
			type: 'inertia',
			power: 1,
			timeConstant: 1000,
			velocity: 100,
		},
	};

	return (
		<div className="w-full h-1">
			<motion.div
				role="progressbar"
				className="h-full bg-primary-content rounded-full"
				{...animationProps}
			/>
		</div>
	);
}

// A full width button component
function FullWidthButton(props: {
	className: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className={`btn-block gap-2 ${props.className}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

FullWidthButton.defaultProps = {
	className: '',
	disabled: false,
	onClick: undefined,
};

// A full-width download button component
function DownloadActionButton(props: { downloadUrl: string }) {
	return (
		<a
			href={props.downloadUrl}
			target="_blank"
			rel="noopener noreferrer"
			download="merged.pdf"
			className="w-full"
		>
			<FullWidthButton className="btn-accent">
				<Icon icon={faFileArrowDown} />
				Download
			</FullWidthButton>
		</a>
	);
}

// A disabled full-width button component that shows the current progress percentage
function ProgressActionButton(props: { progress: number }) {
	const isSaving = props.progress >= 1;
	const percentString = `${(props.progress * 100).toFixed(0)}%`;

	return (
		<div className="flex-col gap-2 w-full text-center">
			<FullWidthButton
				className={`btn-primary flex-col justify-end p-0 border-0 overflow-hidden ${isSaving ? 'loading' : ''}`}
				disabled={true}
			>
				{!isSaving && percentString}
				<ProgressBar progress={percentString} />
			</FullWidthButton>
		</div>
	);
}

function MergeActionButton(props: { onClick: () => void; disabled: boolean }) {
	const mergeButton = (
		<FullWidthButton
			className="btn-primary"
			disabled={props.disabled}
			onClick={props.onClick}
		>
			<Icon icon={faLayerGroup} />
			Merge Files
		</FullWidthButton>
	);

	return (
		<div className="flex-col gap-2 w-full text-center">
			{/* Wrap merge button with a tooltip if it is disabled */}
			{(props.disabled && (
				<div
					className="tooltip tooltip-warning"
					data-tip="Please add more files to merge"
				>
					{mergeButton}
				</div>
			)) ||
				mergeButton}
		</div>
	);
}

// Exports

// A generic button component with an icon and text
export function PrimaryButton(props: {
	icon: IconDefinition;
	fake: boolean;
	children: string;
	onClick?: () => void;
}) {
	// If fake attribute is specified, render the element as a div instead of a button
	// This is to prevent issues with nested input elements in the same dropzone wrapper component
	const ElementType = (props.fake && 'div') || 'button';

	return (
		<ElementType
			className="btn-primary flex-1 flex-nowrap whitespace-nowrap gap-2"
			type={(!props.fake && 'button') || undefined}
			onClick={props.onClick}
		>
			<Icon icon={props.icon} />
			{props.children}
		</ElementType>
	);
}

PrimaryButton.defaultProps = {
	fake: false,
};

// A generic button component with an icon only
export function IconButton(props: {
	icon: IconDefinition;
	onClick?: () => void;
}) {
	return (
		<button
			className="btn-ghost sm:btn-square"
			type="button"
			onClick={props.onClick}
		>
			<Icon icon={props.icon} tw="fa-lg" />
		</button>
	);
}

// Action button that changes based on the current state
export function ActionButton(props: {
	numOfFiles: number;
	progress: number;
	downloadUrl: string;
	onClick: () => void;
}) {
	return (() => {
		if (props.downloadUrl) {
			return <DownloadActionButton downloadUrl={props.downloadUrl} />;
		}

		if (props.progress > 0) {
			return <ProgressActionButton progress={props.progress} />;
		}

		return (
			<MergeActionButton
				onClick={props.onClick}
				disabled={props.numOfFiles < 2}
			/>
		);
	})();
}
