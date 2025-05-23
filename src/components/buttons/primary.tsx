import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon.tsx';

type Props = {
	icon: IconDefinition;
	fake?: boolean;
	onClick?: () => void;
	children: string;
};

/**
 * A generic button with an icon and text
 */
export function PrimaryButton({
	icon,
	fake = false,
	onClick,
	children,
}: Props) {
	// If fake attribute is specified, render the element as a div instead of a button
	// This is to prevent issues with nested input elements in the same dropzone wrapper component
	const ElementType = (fake && 'div') || 'button';

	return (
		<ElementType
			className="flex-nowrap flex-1 gap-2 whitespace-nowrap btn-primary"
			type={(!fake && 'button') || undefined}
			onClick={onClick}
		>
			<Icon icon={icon} />
			{children}
		</ElementType>
	);
}
