import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../common/utilities';
import { Icon } from '../components/icon-components';


export default function ThemeToggle() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

	// For whatever reason the onChange event is not fired on the first toggle of the input element, so we have to use an onInput listener instead
	// The readOnly attribute is specified on the input element to suppress warnings about the onChange event listener not being specified
	return (
		<label>
			<Helmet htmlAttributes={{ 'data-theme': isDarkTheme ? 'dark' : 'light' }} />

			<span className="sr-only">Toggle theme</span>
			<Icon icon={isDarkTheme ? faMoon : faSun} tw="fa-lg mr-2 !align-middle" />
			<input type="checkbox" className="toggle toggle-primary align-middle" checked={isDarkTheme} onInput={toggleTheme} readOnly />
		</label>
	);
}
