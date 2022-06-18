/*
	Helper methods for server-side code
	-----------------------------------
*/


// Constants
const config = {
	theme: {
		light: {
			'primary': '#E64A19',					// MD Deep Orange 700
			'primary-focus': '#F4511E',		// MD Deep Orange 600
			'secondary': '#1565C0',				// MD Blue 800
			'secondary-focus': '#1976D2',	// MD Blue 700
			'accent': '#673AB7',					// MD Purple 500
			'neutral': '#424242',					// MD Grey 800
			'info': '#0277BD',						// MD Light Blue 800
			'success': '#558B2F',					// MD Light Green 800
			'warning': '#FF6F00',					// MD Amber 800
			'error': '#C62828',						// MD Red 800
			'base-100': 'hsl(0 0% 100%)',
			'base-200': 'hsl(0 0% 98%)',
			'base-300': 'hsl(0 0% 96%)'
		},
		dark: {
			'primary': '#FFCA28',					// MD Amber 400
			'primary-focus': '#FFCA28',		// MD Amber 400
			'secondary': '#F06292',				// MD Pink 300
			'secondary-focus': '#E91E63',	// MD Pink 500
			'accent': '#26C6DA',					// MD Cyan 400
			'neutral': '#424242',					// MD Grey 800
			'info': '#4FC3F7',						// MD Light Blue 300
			'success': '#AED581',					// MD Light Green 300
			'warning': '#FFD54F',					// MD Amber 300
			'error': '#E57373',						// MD Red 300
			'base-100': 'hsl(220 18% 13%)',
			'base-200': 'hsl(220 16% 11%)',
			'base-300': 'hsl(220 15% 10%)'
		},
	}
};


// Exports

// Class for loading and formatting configuration data
class ConfigManager {
	getTheme(themeName) {
		const theme = config.theme[themeName];

		if (!theme) {
			throw new Error(`Theme ${themeName} not found`);
		}

		const bgColor = theme['base-100'];

		return {
			...theme,
			'primary-content': bgColor,
			'secondary-content': bgColor,
			'accent-content': bgColor,
			'info-content': bgColor,
			'success-content': bgColor,
			'warning-content': bgColor,
			'error-content': bgColor,
		};
	}
};

module.exports = ConfigManager;
