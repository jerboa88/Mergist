/*
	Reusable link components
	------------------------
*/

import type { ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../components/icon-components';

// Exports

// A basic link component used to specify default attributes
export function LinkWrapper(props: {
	className: string;
	to: string;
	isInternal: boolean;
	rel: string;
	children: ReactNode;
}) {
	return (
		<a
			className={`link link-secondary no-underline whitespace-nowrap ${props.className}`}
			href={props.to}
			target={(props.isInternal && '_self') || '_blank'}
			rel={`noopener ${(props.isInternal && '') || 'external'} ${props.rel}`}
		>
			{props.children}
		</a>
	);
}

LinkWrapper.defaultProps = {
	className: '',
	to: undefined,
	rel: '',
	isInternal: false,
};

// A normal link
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

// A button link with icon
export function IconButtonLink(props: {
	to: string;
	icon: IconDefinition;
	isInternal?: boolean;
	rel?: string;
	children: ReactNode;
}) {
	return (
		<LinkWrapper to={props.to} isInternal={props.isInternal} rel={props.rel}>
			<button className="flex-nowrap flex-none gap-2 p-0 btn-ghost text-secondary sm:p-4">
				<Icon icon={props.icon} />
				{props.children}
			</button>
		</LinkWrapper>
	);
}
