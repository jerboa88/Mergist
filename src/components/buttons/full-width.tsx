import type { ReactNode } from 'react';

type Props = {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	children: ReactNode;
};

/**
 * A full width button
 */
export function FullWidthButton({
	className = '',
	disabled = false,
	onClick,
	children,
}: Props) {
	return (
		<button
			className={`gap-2 btn-block ${className}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
