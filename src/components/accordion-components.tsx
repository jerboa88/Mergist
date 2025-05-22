/*
	Reusable accordion components
	-----------------------------
*/

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getDefaultTransition } from '../common/utilities.ts';

// Exports

// A basic accordion component
export function Accordion(props: { children: ReactNode; isOpen: boolean }) {
	const animationProps = {
		initial: 'closed',
		animate: 'open',
		exit: 'closed',
		variants: {
			open: {
				height: 'auto',
				// Wait till the transition is complete before showing the scroll bar
				// This prevents layout shifting when the accordion is opened
				transitionEnd: {
					overflow: 'auto',
				},
			},
			closed: {
				height: 0,
				overflow: 'hidden',
			},
		},
		...getDefaultTransition(),
	};

	return (
		<AnimatePresence initial={false}>
			{props.isOpen && (
				<motion.div
					className="overflow-y-auto rounded-lg shadow-inner bg-base-300"
					key="content"
					{...animationProps}
				>
					<div className="flex-col p-6 m-2">{props.children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
