/*
	Component to toggle the page theme
	----------------------------------
*/


import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../common/utilities';
import { Icon } from '../components/icon-components';


// Exports

// A toggle component to used to change the page theme
export default function ThemeToggle() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

	return (
		<label>
			{/* Modify the html data-theme attribute to change the theme */}
			<Helmet htmlAttributes={{ 'data-theme': isDarkTheme ? 'dark' : 'light' }} />

			<span className="sr-only">Toggle theme</span>
			<Icon icon={isDarkTheme ? faMoon : faSun} tw="fa-lg mr-2 !align-middle" />
			{/* For whatever reason the onChange event is not fired on the first toggle of the input element, so we have to use an onInput listener instead */}
			{/* The readOnly attribute is specified on the input element to suppress warnings about the onChange event listener not being specified */}
			<input type="checkbox" className="toggle toggle-primary align-middle motion-reduce:transition-none" checked={isDarkTheme} onInput={toggleTheme} readOnly />
		</label>
	);
}
