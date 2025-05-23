import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { ToggleContextInterface } from '../common/types';
import { Icon } from './icon';

interface TogglePropsInterface {
	label: string;
	context: ToggleContextInterface;
	htmlAttribute: string;
	disabled: [string, IconDefinition];
	enabled: [string, IconDefinition];
}

/**
 * A reskinned checkbox that toggles a context value
 */
export function Toggle(props: TogglePropsInterface) {
	const { isEnabled, toggle } = useContext(props.context);

	return (
		<div className="tooltip tooltip-primary" data-tip={`Toggle ${props.label}`}>
			<div className="form-control">
				<label className="p-4 cursor-pointer label">
					{/* Modify the html data attribute */}
					<Helmet
						htmlAttributes={{
							[props.htmlAttribute]: isEnabled
								? props.enabled[0]
								: props.disabled[0],
						}}
					/>

					<Icon
						icon={isEnabled ? props.enabled[1] : props.disabled[1]}
						tw="mr-2 !align-middle"
					/>
					<span className="mr-4 text-base font-bold uppercase label-text font-button">
						{props.label}
					</span>
					{/* For whatever reason the onChange event is not fired on the first toggle of the input element, so we have to use an onInput listener instead */}
					{/* The readOnly attribute is specified on the input element to suppress warnings about the onChange event listener not being specified */}
					<input
						type="checkbox"
						className="align-middle toggle toggle-primary has-motion"
						checked={isEnabled}
						onInput={toggle}
						readOnly
					/>
				</label>
			</div>
		</div>
	);
}
