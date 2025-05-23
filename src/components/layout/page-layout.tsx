import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MotionConfig } from 'framer-motion';
import type { MetadataInterface } from '../../common/types.ts';
import {
	StorageManager,
	DarkThemeContext,
	AllowMotionContext,
	useIsMount,
	mediaFeatureMatches,
} from '../../common/utilities.ts';

type Props = {
	className: string;
	metadata: MetadataInterface;
	children: ReactNode;
};

/**
 * Layout that provides basic styles and metadata tags for the whole page
 */
export function PageLayout({ className = '', metadata, children }: Props) {
	const lsKeyForTheme = 'is-dark-theme';
	const lsKeyForMotion = 'is-motion-allowed';
	const ogImageUrl = `${metadata.siteUrl}${metadata.ogImageUrl}`;

	// Whether the component is currently being mounted or not
	// We can use this to ignore initial state changes of the component
	const isMount = useIsMount();
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	const [isMotionAllowed, setIsMotionAllowed] = useState<boolean>(
		getIsMotionAllowed(),
	);

	// Save the user's preferences to local storage when its state changes
	useEffect(() => {
		StorageManager.setIf(!isMount, lsKeyForTheme, isDarkTheme);
	}, [isDarkTheme]);

	useEffect(() => {
		StorageManager.setIf(!isMount, lsKeyForMotion, isMotionAllowed);
	}, [isMotionAllowed]);

	// Get the user's preference from storage if it exists
	// Otherwise, use the system preference if it is set or fall back to the default value
	function getIsDarkMode(): boolean {
		return StorageManager.get(
			lsKeyForTheme,
			mediaFeatureMatches('prefers-color-scheme', 'dark', true),
		);
	}

	function getIsMotionAllowed(): boolean {
		return StorageManager.get(
			lsKeyForMotion,
			!mediaFeatureMatches('prefers-reduced-motion', 'reduce', false),
		);
	}

	// Get the primary theme color from DaisyUI config
	function getPrimaryThemeColor(): string {
		return metadata[isDarkTheme ? 'darkTheme' : 'lightTheme'].primary;
	}

	// Define toggle functions and memoize before passing to the relevant context provider
	const providerValuesForTheme = useMemo(
		() => ({
			isEnabled: isDarkTheme,
			toggle: () => {
				setIsDarkTheme(!isDarkTheme);
			},
		}),
		[isDarkTheme],
	);

	const providerValuesForMotion = useMemo(
		() => ({
			isEnabled: isMotionAllowed,
			toggle: () => {
				setIsMotionAllowed(!isMotionAllowed);
			},
		}),
		[isMotionAllowed],
	);

	return (
		<DarkThemeContext.Provider value={providerValuesForTheme}>
			<AllowMotionContext.Provider value={providerValuesForMotion}>
				{/* Page head */}
				<Helmet htmlAttributes={{ lang: 'en-US' }}>
					<title>{metadata.title}</title>
					<meta name="author" content={metadata.author} />
					<meta name="description" content={metadata.description} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>

					{/* OpenGraph meta tags */}
					<meta property="og:title" content={metadata.title} />
					<meta property="og:description" content={metadata.description} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={metadata.siteUrl} />
					<meta property="og:image" content={ogImageUrl} />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta property="og:image:alt" content={metadata.ogImageAltText} />

					{/* Twitter meta tags */}
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content={metadata.title} />
					<meta name="twitter:creator" content={metadata.authorUsername} />
					<meta name="twitter:description" content={metadata.description} />
					<meta name="twitter:image" content={ogImageUrl} />
					<meta name="twitter:image:alt" content={metadata.ogImageAltText} />

					<meta name="google" content="nositelinkssearchbox" />
					<meta content={getPrimaryThemeColor()} name="theme-color" />

					<link rel="canonical" href={metadata.siteUrl} />

					{/* These icons are were not added to the head with gatsby-plugin-manifest so we need to add them manually here */}
					<link rel="icon" href="/favicon-32x32.png" type="image/png" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

					{/* Structured data */}
					<script type="application/ld+json">
						{`{
							"@context": "http://schema.org",
							"@type": "WebApplication",
							"name": "${metadata.shortTitle}",
							"description": "${metadata.description}",
							"url": "${metadata.siteUrl}",
							"softwareVersion": "1.0.0",
							"operatingSystem": "All",
							"applicationCategory": "UtilitiesApplication",
							"applicationSubCategory": "PDF Merger",
							"offers": {
								"@type": "Offer",
								"price": "0"
							},
							"author": {
								"@type": "Person",
								"name": "${metadata.author}",
								"url": "https://${metadata.homepageDomain}"
							}
						}`}
					</script>
				</Helmet>

				{/* Page body */}
				<MotionConfig reducedMotion="user">
					<div
						className={`flex-col gap-8 justify-between items-center mx-auto min-h-screen text-base bg-base-200 text-base-content selection:bg-primary selection:text-primary-content ${className}`}
					>
						{children}
					</div>
				</MotionConfig>
			</AllowMotionContext.Provider>
		</DarkThemeContext.Provider>
	);
}
