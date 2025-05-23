import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { ReactNode } from 'react';
import { Icon } from '../icon.tsx';
import { LinkWrapper } from './wrapper.tsx';

/**
 * An icon button link
 */
export function IconButtonLink(props: {
	to: string;
	icon: IconDefinition;
	isInternal?: boolean;
	rel?: string;
	children: ReactNode;
}) {
	return (
		<LinkWrapper to={props.to} isInternal={props.isInternal} rel={props.rel}>
			<div className="flex-nowrap flex-none gap-2 p-0 btn-ghost text-secondary sm:p-4">
				<Icon icon={props.icon} />
				{props.children}
			</div>
		</LinkWrapper>
	);
}
