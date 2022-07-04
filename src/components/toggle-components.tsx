/*
	Component to toggle the page theme
	----------------------------------
*/


import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { faHand, faHandshake, faMoon, faSun, faWandMagic, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AllowMotionContext, DarkThemeContext, SendAnalyticsContext } from '../common/utilities';
import { ToggleContextInterface } from '../common/types';
import { Icon } from '../components/icon-components';


// Base components

interface TogglePropsInterface {
	label: string;
	context: ToggleContextInterface;
	htmlAttribute: string;
	disabled: [string, IconDefinition];
	enabled: [string, IconDefinition];
}

// A toggle input element
function Toggle(props: TogglePropsInterface) {
	const { isEnabled, toggle } = useContext(props.context);

	return (
		<div className="tooltip tooltip-primary" data-tip={`Toggle ${props.label}`}>
			<div className="form-control">
				<label className="label p-4 cursor-pointer">
					{/* Modify the html data attribute */}
					<Helmet htmlAttributes={{ [props.htmlAttribute]: isEnabled ? props.enabled[0] : props.disabled[0] }} />

					<Icon icon={isEnabled ? props.enabled[1] : props.disabled[1]} tw="mr-2 !align-middle" />
					<span className="label-text mr-4 text-base font-button font-bold uppercase">{props.label}</span>
					{/* For whatever reason the onChange event is not fired on the first toggle of the input element, so we have to use an onInput listener instead */}
					{/* The readOnly attribute is specified on the input element to suppress warnings about the onChange event listener not being specified */}
					<input type="checkbox" className="toggle toggle-primary align-middle has-motion" checked={isEnabled} onInput={toggle} readOnly />
				</label>
			</div>
		</div>
	);
}


// Exports

// A toggle component used to change the page theme
export function ThemeToggle() {
	return (
		<Toggle label="dark theme" context={DarkThemeContext} htmlAttribute="data-theme" disabled={['light', faSun]} enabled={['dark', faMoon]} />
	);
}

// A toggle component used to change the `motion-allowed` property
export function MotionToggle() {
	return (
		<Toggle label="enabled animations" context={AllowMotionContext} htmlAttribute="data-motion" disabled={['reduce', faWandMagic]} enabled={['allow', faWandMagicSparkles]} />
	);
}

// A toggle component used to change the `analytics-allowed` property
export function AnalyticsToggle() {
	return (
		<Toggle label="send analytics" context={SendAnalyticsContext} htmlAttribute="data-analytics" disabled={['reject', faHand]} enabled={['allow', faHandshake]} />
	);
}
