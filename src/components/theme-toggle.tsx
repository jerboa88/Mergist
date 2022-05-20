import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../common/utilities';


export default function ThemeToggle() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

	return (
		<label>
			<Helmet htmlAttributes={{ 'data-theme': isDarkTheme ? 'dark' : 'light' }} />

			<span className="sr-only">Toggle theme</span>
			<FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} className="fa-lg mr-2 !align-middle" />
			<input type="checkbox" className="toggle toggle-primary align-middle" checked={isDarkTheme} onChange={toggleTheme} />
		</label>
	);
}
