import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { ToggleContextInterface } from '../common/types.ts';
import { Icon } from './icon.tsx';

type Props = {
	className?: string;
	label: string;
	context: ToggleContextInterface;
	htmlAttribute: string;
	disabled: [string, IconDefinition];
	enabled: [string, IconDefinition];
};

/**
 * A reskinned checkbox that toggles a context value
 */
export function Toggle({
	className = '',
	label,
	context,
	htmlAttribute,
	disabled,
	enabled,
}: Props) {
	const { isEnabled, toggle } = useContext(context);

	return (
		<div className="tooltip tooltip-primary" data-tip={`Toggle ${label}`}>
			<div className="form-control">
				<label className={`p-4 cursor-pointer label ${className}`}>
					{/* Modify the html data attribute */}
					<Helmet
						htmlAttributes={{
							[htmlAttribute]: isEnabled ? enabled[0] : disabled[0],
						}}
					/>

					<Icon
						icon={isEnabled ? enabled[1] : disabled[1]}
						className="mr-2 !align-middle"
					/>
					<span className="mr-4 text-base font-bold uppercase label-text font-button">
						{label}
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
