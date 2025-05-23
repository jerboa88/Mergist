import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon-components.tsx';

/**
 * A generic button with an icon and text
 */
export function PrimaryButton(props: {
	icon: IconDefinition;
	fake: boolean;
	children: string;
	onClick?: () => void;
}) {
	// If fake attribute is specified, render the element as a div instead of a button
	// This is to prevent issues with nested input elements in the same dropzone wrapper component
	const ElementType = (props.fake && 'div') || 'button';

	return (
		<ElementType
			className="flex-nowrap flex-1 gap-2 whitespace-nowrap btn-primary"
			type={(!props.fake && 'button') || undefined}
			onClick={props.onClick}
		>
			<Icon icon={props.icon} />
			{props.children}
		</ElementType>
	);
}
PrimaryButton.defaultProps = {
	fake: false,
};
