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
			type="button"
			className="btn-ghost sm:btn-square"
			onClick={props.onClick}
		>
			<Icon icon={props.icon} className="fa-lg" />
		</button>
	);
}
