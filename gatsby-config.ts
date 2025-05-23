/*
	Gatsby configuration file
	-------------------------
*/

import type { GatsbyConfig } from 'gatsby';
import type { MetadataInterface } from './src/common/types.ts';

const ConfigManager = require('./config-manager.js');

const configManager = new ConfigManager();
const metadata = configManager.getMetadata();
const lightTheme = configManager.getTheme('light');
const darkTheme = configManager.getTheme('dark');

const config: GatsbyConfig = {
	siteMetadata: {
		...(metadata as MetadataInterface),
		lightTheme,
		darkTheme,
	},
	// Enable the new JSX transform so that we can use JSX without importing React
	jsxRuntime: 'automatic',
	trailingSlash: 'never',
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
					};
				},
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				// Link to the sitemap index generated above
				sitemap: `${metadata.siteUrl}/sitemap-index.xml`,
				policy: [
					{
						userAgent: '*',
						allow: '/',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-image-generator',
			options: {
				generate: [configManager.getOgImage(), ...configManager.getIcons()],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: metadata.title,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				short_name: metadata.shortTitle,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				start_url: '/',
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				background_color: darkTheme['base-100'],
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				theme_color: darkTheme.primary,
				display: 'standalone',
				icons: configManager.getIconManifestEntries(),
				// Favicon declarations and theme color meta tags are added to the document head manually using React Helmet
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				include_favicon: false,
				// biome-ignore lint/style/useNamingConvention: Naming convention is enforced by the plugin
				theme_color_in_head: false,
			},
		},
		// This plugin need to be listed after gatsby-plugin-manifest
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.svg$/,
				},
			},
		},
	],
};

// biome-ignore lint/style/noDefaultExport: Gatsby config must use default exports
export default config;
