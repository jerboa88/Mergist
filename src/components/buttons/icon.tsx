/**
 * A generic button component with an icon only
 */

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon-components.tsx';

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
