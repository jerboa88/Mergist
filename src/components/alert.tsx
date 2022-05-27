import React, { useEffect, useState } from 'react';
import { faTriangleExclamation, faCircleExclamation, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { SeverityTypes } from '../common/types';
import { StatusMsg } from '../common/utilities';
import { Icon } from '../components/icon-components';


const alertTypes = {
	[SeverityTypes.SUCCESS]: {
		class: 'alert-success',
		icon: faSquareCheck
	},
	[SeverityTypes.WARNING]: {
		class: 'alert-warning',
		icon: faTriangleExclamation
	},
	[SeverityTypes.ERROR]: {
		class: 'alert-error',
		icon: faCircleExclamation
	}
}


export default function Alert(props: { statusMsg: StatusMsg; }) {
	const delayMs = 4000;
	const type = props.statusMsg.getSeverity;
	const [visible, setVisible] = useState(true);


	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setVisible(false);
		}, delayMs);

		return () => {
			clearTimeout(timeoutId);
		}
	}, [delayMs]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div layout className={`alert ${alertTypes[type].class} shadow-md`}
					key={props.statusMsg.getId}
					initial={{ opacity: 0, scaleY: 0 }}
					animate={{ opacity: 1, scaleY: 1 }}
					exit={{ opacity: 0, scaleY: 0 }}>
					<div>
						<Icon icon={alertTypes[type].icon} tw="mr-2 fa-lg" />
						<span>{props.statusMsg.getMsg}</span>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
