import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import LogoIcon from '../../images/icon.svg';
import { SingleColumnLayout } from './single-column-layout.tsx';
import {
	getDefaultTransition,
	getIsMotionAllowed,
} from '../../common/utilities.ts';

type Props = {
	className: string;
	title: string;
	children: ReactNode;
};

/**
 * Page header
 */
export function Header({ className = '', title, children }: Props) {
	// Drop shadow styles based on those from from Tailwind CSS
	// We need to apply the raw styles so that we can transition between them with Framer Motion
	const animationProps = {
		initial: {
			filter:
				'drop-shadow(0 1px 1px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
		},
		...getDefaultTransition(),
	};

	// Only add hover animations if the user has allowed motion
	if (getIsMotionAllowed()) {
		animationProps['whileHover'] = {
			scale: 1.1,
			filter:
				'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
		};
	}

	return (
		<header
			className={`p-8 w-full footer footer-center bg-base-300 ${className}`}
		>
			<SingleColumnLayout className="justify-center">
				<a href="/">
					<motion.h1
						className="text-5xl font-black uppercase font-heading text-secondary-header"
						{...animationProps}
					>
						<LogoIcon
							className="svg-inline--fa mr-4 fa-sm !align-baseline"
							width={55.19}
							height={42}
						/>
						{title}
					</motion.h1>
				</a>
				<p className="text-center">{children}</p>
			</SingleColumnLayout>
		</header>
	);
}
