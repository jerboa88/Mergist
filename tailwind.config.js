/*
	Tailwind CSS configuration file
	-------------------------------
*/


const defaultThemes = require('daisyui/src/colors/themes');
const defaultLightTheme = defaultThemes['[data-theme=light]'];
const defaultDarkTheme = defaultThemes['[data-theme=dark]'];


module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				// Default font for headings (ie. page title)
				'heading': ['Luckiest Guy', 'Impact', 'Arial Black', 'Arial', 'sans-serif'],
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...defaultLightTheme,
					'primary': '#FF5722',
					'secondary': '#E91E63'
				},
			},
			{
				dark: {
					...defaultDarkTheme,
					'primary': '#FFC107',
					'secondary': '#E91E63',
					'primary-content': defaultDarkTheme['base-100']
				},
			},
		],
		darkTheme: 'dark'
	},
};
