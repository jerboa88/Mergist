/*
	Reusable icon components
	------------------------
*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';


// Exports

// A basic icon component
export function Icon(props: { tw?: string; icon: IconDefinition; }) {
	return (
		<FontAwesomeIcon icon={props.icon} className={props.tw} />
	);
}


// An icon component that can rotate 180 degrees based on a boolean prop
export function ToggleIcon(props: { tw: string; icon: IconDefinition; isToggled: boolean; }) {
	return (
		<FontAwesomeIcon icon={props.icon} className={`transition-transform motion-reduce:transition-none ${props.isToggled ? 'rotate-180' : 'rotate-0'} ${props.tw}`} />
	);
}
