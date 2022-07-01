/*
	Component to toggle the page theme
	----------------------------------
*/


import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { faMoon, faSun, faWandMagic, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AllowMotionContext, DarkThemeContext } from '../common/utilities';
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
		<label className="p-4">
			{/* Modify the html data attribute */}
			<Helmet htmlAttributes={{ [props.htmlAttribute]: isEnabled ? props.enabled[0] : props.disabled[0] }} />

			<span className="sr-only">{props.label}</span>
			<Icon icon={isEnabled ? props.enabled[1] : props.disabled[1]} tw="fa-lg mr-2 !align-middle" />
			{/* For whatever reason the onChange event is not fired on the first toggle of the input element, so we have to use an onInput listener instead */}
			{/* The readOnly attribute is specified on the input element to suppress warnings about the onChange event listener not being specified */}
			<input type="checkbox" className="toggle toggle-primary align-middle has-motion" checked={isEnabled} onInput={toggle} readOnly />
		</label>
	);
}


// Exports

// A toggle component used to change the page theme
export function ThemeToggle() {
	return (
		<Toggle label="Toggle theme" context={DarkThemeContext} htmlAttribute="data-theme" disabled={['light', faSun]} enabled={['dark', faMoon]} />
	);
}

// A toggle component used to change the `motion-allowed` property
export function MotionToggle() {
	return (
		<Toggle label="Toggle motion" context={AllowMotionContext} htmlAttribute="data-motion" disabled={['reduce', faWandMagic]} enabled={['allow', faWandMagicSparkles]} />
	);
}
