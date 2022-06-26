/*
	Tailwind CSS configuration file
	-------------------------------
*/


const ConfigManager = require('./config-manager');


const configManager = new ConfigManager();


module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Roboto Flex', 'Roboto', 'Tahoma', 'Arial', 'Helvetica', 'sans-serif'],
		},
		extend: {
			fontFamily: {
				heading: ['Luckiest Guy', 'Impact', 'Franklin Gothic Medium', 'Candara', 'Calibri', 'sans-serif'],
				button: ['Roboto Condensed', 'Arial Narrow', 'Calibri', 'Candara', 'Impact', 'sans-serif'],
			},
			colors: {
				'primary-header': 'var(--ph)',
				'secondary-header': 'var(--sh)',
			},
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{ light: configManager.getTheme('light') },
			{ dark: configManager.getTheme('dark') },
		],
		darkTheme: 'dark'
	},
};
