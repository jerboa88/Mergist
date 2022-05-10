import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';


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


export default function MergeButton(props: { className: string; numOfFiles: number; progress: number; downloadUrl: string; onClick: () => void; }) {
	return (() => {
		if (props.numOfFiles < 2) {
			return null;
		}

		if (!props.downloadUrl) {
			if (props.progress > 0) {
				const isSaving = props.progress >= 1;
				const percentString = `${(props.progress * 100).toFixed(0)}%`;
				// Show progress bar button
				return (
					<div className="flex flex-col gap-2 w-full text-center">
						<button className={`btn btn-block btn-primary flex flex-col justify-between p-0 pt-4 border-0 overflow-hidden ${isSaving ? 'loading' : ''}`}>
							{!isSaving && percentString}
							<ProgressBar progress={percentString} />
						</button>
					</div>
				)
			} else {
				// Show merge button
				return (
					<div className="flex flex-col gap-2 w-full text-center">
						<button className="btn btn-block btn-primary gap-2" onClick={props.onClick}>
							<FontAwesomeIcon icon={faLayerGroup} />
							Merge Files
						</button>
					</div>
				)
			}
		}

		return (
			// Show download button
			<a href={props.downloadUrl} target="_blank" rel="noopener noreferrer" download="merged.pdf" className="w-full">
				<button className="btn btn-block btn-accent gap-2">
					<FontAwesomeIcon icon={faFileArrowDown} />
					Download
				</button>
			</a>
		)
	}
	)();
}

MergeButton.defaultProps = {
	className: ''
};
