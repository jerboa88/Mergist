import type { GatsbyConfig } from 'gatsby';
import { DaisyUiThemeInterface, MetadataInterface } from './src/common/types';

const tailwindConfig = require('./tailwind.config.js');
const lightTheme = tailwindConfig.daisyui.themes[0].light as DaisyUiThemeInterface;
const darkTheme = tailwindConfig.daisyui.themes[1].dark as DaisyUiThemeInterface;

const shortTitle = 'Mergist';
const title = `${shortTitle} - Online PDF Merger`;
const username = 'jerboa88';
const homepageDomain = 'johng.io';
const siteUrl = `https://${shortTitle.toLowerCase()}.${homepageDomain}`;

const config: GatsbyConfig = {
	siteMetadata: {
		shortTitle: shortTitle,
		title: title,
		description: `${shortTitle} is an online tool to combine multiple PDF files into one. ${shortTitle} has no ads, no file size limits, and your files never leave your device.`,
		author: 'John Goodliff',
		siteUrl: siteUrl,
		githubUrl: `https://github.com/${username}/${shortTitle.toLowerCase()}`,
		homepageUrl: `https://${homepageDomain}/projects/${shortTitle.toLowerCase()}`,
		homepageDomain: homepageDomain,
		lightTheme: lightTheme,
		darkTheme: darkTheme
	} as MetadataInterface,
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-postcss',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				'trackingId': 'TODO_REPLACE_THIS_LATER'
			}
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: title,
				short_name: shortTitle,
				start_url: '/',
				background_color: darkTheme['base-100'],
				theme_color: darkTheme.primary,
				display: 'standalone',
				icon: 'src/images/favicon.svg',
				include_favicon: true,
				// Theme color is set manually in the Page component according to the current theme
				theme_color_in_head: false
			}
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.svg$/
				}
			}
		}
	]
};

export default config;