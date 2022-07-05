/*
	Header component
	----------------
*/


import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getIsMotionAllowed, getDefaultTransition } from '../common/utilities';
import { SingleColumnLayout } from '../components/layout-components';
import LogoIcon from '../images/icon.svg';


// Exports

// A basic header component
export default function Header(props: { className: string; title: string; children: ReactNode; }) {
	// Drop shadow styles based on those from from Tailwind CSS
	// We need to apply the raw styles so that we can transition between them with Framer Motion
	let animationProps = {
		initial: {
			filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))'
		},
		...getDefaultTransition(),
	}

	// Only add hover animations if the user has allowed motion
	if (getIsMotionAllowed()) {
		animationProps['whileHover'] = {
			scale: 1.1,
			filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
		}
	}

	return (
		<header className={`w-full footer footer-center p-8 bg-base-300 ${props.className}`}>
			<SingleColumnLayout className="justify-center">
				<a href="/" >
					<motion.h1 className='text-5xl font-heading font-black uppercase text-secondary-header' {...animationProps}>
						<LogoIcon className="svg-inline--fa mr-4 fa-sm !align-baseline" />
						{props.title}
					</motion.h1>
				</a>
				<p className="text-center">
					{props.children}
				</p>
			</SingleColumnLayout>
		</header>
	);
}

Header.defaultProps = {
	className: ''
};
