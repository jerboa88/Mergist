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
		extend: {
			fontFamily: {
				// Default font for the page title
				'heading': ['Luckiest Guy', 'Impact', 'Arial Black', 'Arial', 'sans-serif'],
			}
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
