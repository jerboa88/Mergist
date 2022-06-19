/*
	Helper methods for managing config server-side
	----------------------------------------------
*/


// Constants
const config = {
	metadata: {
		shortTitle: 'Mergist',
		title: 'Mergist - Online PDF Merger',
		shortDescription: 'Mergist is an online tool to combine multiple PDF files into one',
		description: 'Mergist is an online tool to combine multiple PDF files into one. Mergist has no ads, no file size limits, and your files never leave your device.',
		author: 'John Goodliff',
		siteUrl: 'https://mergist.johng.io',
		githubUrl: 'https://github.com/jerboa88/mergist',
		homepageDomain: 'johng.io',
	},
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
	},
	// Icon generation config to pass to gatsby-plugin-image-generator
	// We can also generate the webmanifest config from this
	icons: [
		{
			from: 'images/maskable-icon.svg',
			to: [
				{
					path: 'icons/maskable-icon.png',
					size: 512
				}
			],
			options: {
				optimize: true
			}
		},
		{
			from: 'images/icon.svg',
			to: [
				{
					path: 'favicon.svg',
					size: 1024
				},
				{
					path: 'favicon-32x32.png',
					size: 32
				},
				{
					path: 'icons/icon-48x48.png',
					size: 48
				},
				{
					path: 'icons/icon-72x72.png',
					size: 72
				},
				{
					path: 'icons/icon-96x96.png',
					size: 96
				},
				{
					path: 'icons/icon-144x144.png',
					size: 144
				},
				{
					path: 'icons/icon-192x192.png',
					size: 192
				},
				{
					path: 'icons/icon-256x256.png',
					size: 256
				},
				{
					path: 'icons/icon-384x384.png',
					size: 384
				},
				{
					path: 'icons/icon-512x512.png',
					size: 512
				}
			],
			options: {
				optimize: true
			}
		},
	],
};


// Exports

// Class for loading and formatting configuration data
class ConfigManager {
	// Return metadata for the site
	getMetadata() {
		return config.metadata;
	}

	// Return a a daisyUI theme given its name
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

	// Returns the icon generation config
	getIcons() {
		return config.icons;
	}

	// Generate icon entries for the site's webmanifest using the provided icon generation config
	getIconManifestEntries() {
		// Flatten after mapping as we do not need to keep any info about how the icons are generated
		return config.icons.flatMap(inputRule => {
			return inputRule.to.map(outputRule => {
				return {
					src: outputRule.path,
					sizes: `${outputRule.size}x${outputRule.size}`,
					type: this.getMimeTypeFromPath(outputRule.path),
					// If the icon name contains `maskable`, set the purpose property to `maskable`
					purpose: outputRule.path.match(/maskable/) ? 'maskable' : 'any'
				};
			});
		});
	}

	// Returns the mime type for the provided image path
	getMimeTypeFromPath(path) {
		if (path.endsWith('.svg')) {
			return 'image/svg+xml';
		} else {
			const match = path.match(/\.(jpg|jpeg|png|webp|gif|avif|tif|tiff)$/i);

			if (!match || match.length < 2) {
				throw new Error(`Could not determine mime type for image path ${path}`);
			}

			return `image/${match[1]}`;
		}
	}
};

module.exports = ConfigManager;
