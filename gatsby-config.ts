/*
	Gatsby configuration file
	-------------------------
*/


import type { GatsbyConfig } from 'gatsby';
import { MetadataInterface } from './src/common/types';

const ConfigManager = require('./config-manager');


const configManager = new ConfigManager();
const metadata = configManager.getMetadata();
const lightTheme = configManager.getTheme('light');
const darkTheme = configManager.getTheme('dark');


const config: GatsbyConfig = {
	siteMetadata: {
		...metadata as MetadataInterface,
		lightTheme,
		darkTheme
	},
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
						changefreq: 'monthly'
					}
				},
			}
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				// Link to the sitemap index generated above
				sitemap: `${metadata.siteUrl}/sitemap-index.xml`,
				policy: [
					{
						userAgent: '*',
						allow: '/'
					}
				]
			}
		},
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: [
					metadata.trackingId
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
			resolve: 'gatsby-plugin-image-generator',
			options: {
				generate: configManager.getIcons()
			}
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: metadata.title,
				short_name: metadata.shortTitle,
				start_url: '/',
				background_color: darkTheme['base-100'],
				theme_color: darkTheme['primary'],
				display: 'standalone',
				icons: configManager.getIconManifestEntries(),
				// Favicon declarations and theme color meta tags are added to the document head manually using React Helmet
				include_favicon: false,
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
