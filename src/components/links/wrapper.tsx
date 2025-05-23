import type { ReactNode } from 'react';

type Props = {
	className: string;
	to: string;
	isInternal: boolean;
	rel: string;
	children: ReactNode;
};

/**
 * A link wrapper used to specify default attributes
 */
export function LinkWrapper({
	className = '',
	to,
	isInternal = false,
	rel = '',
	children,
}: Props) {
	return (
		<a
			className={`no-underline whitespace-nowrap link link-secondary ${className}`}
			href={to}
			target={(isInternal && '_self') || '_blank'}
			rel={`noopener ${isInternal ? '' : 'external'} ${rel}`}
		>
			{children}
		</a>
	);
}
