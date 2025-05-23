import { useEffect, useState } from 'react';
import {
	faTriangleExclamation,
	faCircleExclamation,
	faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { SeverityTypes } from '../common/types.ts';
import { getDefaultTransition, type StatusMsg } from '../common/utilities.ts';
import { Icon } from './icon.tsx';

const alertTypes = {
	[SeverityTypes.Success]: {
		class: 'alert-success',
		icon: faSquareCheck,
	},
	[SeverityTypes.Warning]: {
		class: 'alert-warning',
		icon: faTriangleExclamation,
	},
	[SeverityTypes.Error]: {
		class: 'alert-error',
		icon: faCircleExclamation,
	},
};

/**
 * An alert for displaying status messages
 */
export function Alert(props: { statusMsg: StatusMsg }) {
	const delayMs = 5000;
	const type = props.statusMsg.getSeverity;
	const [visible, setVisible] = useState(true);
	const animationProps = {
		initial: 'hidden',
		animate: 'visible',
		exit: 'hidden',
		variants: {
			visible: {
				opacity: 1,
				scaleY: 1,
			},
			hidden: {
				opacity: 0,
				scaleY: 0,
			},
		},
		...getDefaultTransition(),
	};

	// Hide the alert after a delay
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setVisible(false);
		}, delayMs);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					layout
					className={`alert shadow ${alertTypes[type].class}`}
					key={props.statusMsg.getId}
					{...animationProps}
				>
					<Icon icon={alertTypes[type].icon} className="mr-2 fa-lg" />
					<span>{props.statusMsg.getMsg}</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
