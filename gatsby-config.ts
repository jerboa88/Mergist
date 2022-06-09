/*
	Gatsby configuration file
	-------------------------
*/


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
const icons = {
	maskable: [
		{
			path: 'icons/maskable-icon.png',
			size: 512
		}
	],
	svg: [
		{
			path: 'favicon.svg',
			size: 1024
		},
		{
			path: `favicon-32x32.png`,
			size: 32
		},
	],
	appleTouch: [
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
	]
}


const manifestIconEntries = [
	...mapIconListToManifestEntries(icons.appleTouch, 'any'),
	...mapIconListToManifestEntries(icons.maskable, 'maskable')
];

function mapIconListToManifestEntries(iconList: Array<{ path: string; size: number }>, purpose: string) {
	return iconList.map(({ path, size }) => ({
		src: path,
		sizes: `${size}x${size}`,
		type: 'image/png',
		purpose: purpose
	}));
}

const config: GatsbyConfig = {
	siteMetadata: {
		shortTitle: shortTitle,
		title: title,
		description: `${shortTitle} is an online tool to combine multiple PDF files into one. ${shortTitle} has no ads, no file size limits, and your files never leave your device.`,
		author: 'John Goodliff',
		siteUrl: siteUrl,
		githubUrl: `https://github.com/${username}/${shortTitle.toLowerCase()}`,
		homepageDomain: homepageDomain,
		lightTheme: lightTheme,
		darkTheme: darkTheme
	} as MetadataInterface,
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				// Generate sitemaps at the root of the site
				output: '/',
				serialize: ({ path }: { path: string }) => {
					return {
						url: path,
						// Because this is a single page site, we can assume the page is modified on every build
						// Remove this if more pages are added so Google doesn't get upset
						lastmod: Date.now(),
						changefreq: 'monthly',
					}
				},
			}
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				// Link to the sitemap index generated above
				sitemap: `${siteUrl}/sitemap-index.xml`,
				policy: [{ userAgent: '*', allow: '/' }]
			}
		},
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: [
					'G-TYRQSQ9QC3'
				],
				gtagConfig: {
					// Opt-out of personalized advertising features
					anonymize_ip: true,
					allow_google_signals: false,
					allow_ad_personalization_signals: false
				},
				pluginConfig: {
					head: true
				}
			}
		},
		{
			resolve: 'gatsby-plugin-icon-generator',
			options: {
				generate: [
					{
						from: 'images/icon.svg',
						to: [...icons.svg, ...icons.appleTouch]
					},
					{
						from: 'images/maskable-icon.svg',
						to: icons.maskable
					}
				]
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
				icons: manifestIconEntries,
				// Only Apple touch icons and maskable icons are added to the manifest
				// We add traditional favicons to the document head using React Helmet
				include_favicon: false,
				// Theme color is set manually in the Page component according to the current theme
				theme_color_in_head: false
			}
		},
		// This plugin need to be listed after gatsby-plugin-manifest
		'gatsby-plugin-offline',
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
