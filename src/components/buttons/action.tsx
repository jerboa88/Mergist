import {
	faFileArrowDown,
	faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FullWidthButton } from './full-width.tsx';
import { motion } from 'framer-motion';
import { Icon } from '../icon-components.tsx';

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
				className="h-full rounded-full bg-primary-content"
				{...animationProps}
			/>
		</div>
	);
}

// A button component that triggers the merge action
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

// A full-width download button component
export function DownloadActionButton(props: { downloadUrl: string }) {
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

/**
 * An action button that is used to start the merge process and changes based on the current state
 */
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
