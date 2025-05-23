import type { ReactNode } from 'react';

/**
 * A link wrapper used to specify default attributes
 */
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
