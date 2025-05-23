import type { ReactNode } from 'react';

/**
 * A section that can be hidden
 */
export function Section(props: {
	className: string;
	visible: boolean;
	children: ReactNode;
}) {
	return (
		<section
			className={`flex-col justify-center w-full h-full ${props.visible ? '' : 'hidden overflow-hidden '}${props.className}`}
		>
			{props.children}
		</section>
	);
}
Section.defaultProps = {
	className: '',
	visible: true,
};
