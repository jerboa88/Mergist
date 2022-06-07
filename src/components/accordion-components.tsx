/*
	Reusable accordion components
	-----------------------------
*/


import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultTransition } from '../common/utilities';


// Exports

// A basic accordion component
export function Accordion(props: { children: ReactNode; isOpen: boolean; }) {
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
					overflow: 'auto'
				}
			},
			closed: {
				height: 0,
				overflow: 'hidden'
			}
		},
		...defaultTransition
	}

	return (
		<AnimatePresence initial={false}>
			{props.isOpen && (
				<motion.div className="bg-base-300 shadow-inner overflow-y-auto rounded-lg" key="content" {...animationProps}>
					<div className="flex-col m-2 p-6">
						{props.children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
