import type { ReactNode } from 'react';
import { LinkWrapper } from './wrapper.tsx';

/**
 * A normal link
 */
export function InlineLink(props: {
	to?: string;
	isInternal?: boolean;
	rel?: string;
	children: ReactNode;
}) {
	return (
		<LinkWrapper
			to={props.to}
			isInternal={props.isInternal}
			rel={props.rel}
			className="border-b-[1px] border-transparent transition-colors hover:border-current"
		>
			{props.children}
		</LinkWrapper>
	);
}
