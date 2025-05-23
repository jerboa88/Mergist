import type { ReactNode } from 'react';

/**
 * A full width button
 */
export function FullWidthButton(props: {
	className: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className={`btn-block gap-2 ${props.className}`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
FullWidthButton.defaultProps = {
	className: '',
	disabled: false,
	onClick: undefined,
};
