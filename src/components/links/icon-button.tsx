import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { ReactNode } from 'react';
import { Icon } from '../icon.tsx';
import { LinkWrapper } from './wrapper.tsx';

type Props = {
	to: string;
	icon: IconDefinition;
	isInternal?: boolean;
	rel?: string;
	children: ReactNode;
};

/**
 * An icon button link
 */
export function IconButtonLink({ to, icon, isInternal, rel, children }: Props) {
	return (
		<LinkWrapper to={to} isInternal={isInternal} rel={rel}>
			<div className="flex-nowrap flex-none gap-2 p-0 btn-ghost text-secondary sm:p-4">
				<Icon icon={icon} />
				{children}
			</div>
		</LinkWrapper>
	);
}
