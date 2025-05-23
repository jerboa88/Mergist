import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon.tsx';

/**
 * A generic button with an icon only
 */
export function IconButton(props: {
	icon: IconDefinition;
	onClick?: () => void;
}) {
	return (
		<button
			className="btn-ghost sm:btn-square"
			type="button"
			onClick={props.onClick}
		>
			<Icon icon={props.icon} tw="fa-lg" />
		</button>
	);
}
