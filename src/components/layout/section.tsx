import type { ReactNode } from 'react';

type Props = {
	className: string;
	visible: boolean;
	children: ReactNode;
};

/**
 * A section that can be hidden
 */
export function Section({ className = '', visible = true, children }: Props) {
	return (
		<section
			className={`flex-col justify-center w-full h-full ${visible ? '' : 'hidden overflow-hidden '}${className}`}
		>
			{children}
		</section>
	);
}
