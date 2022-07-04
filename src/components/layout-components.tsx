/*
	Reusable layout components
	--------------------------
*/


import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MotionConfig } from 'framer-motion';
import { MetadataInterface } from '../common/types';
import { StorageManager, DarkThemeContext, AllowMotionContext, useIsMount, mediaFeatureMatches, SendAnalyticsContext } from '../common/utilities';
import ogImage from '../images/og-image.png';


// Exports

// Layout component that provides basic styles and metadata tags for the whole page
export function PageLayout(props: { className: string; metadata: MetadataInterface; children: ReactNode }) {
	const storageManager = new StorageManager();
	const lsKeyForTheme = 'is-dark-theme';
	const lsKeyForMotion = 'is-motion-allowed';
	const lsKeyForAnalytics = 'are-analytics-allowed';
	// Whether the component is currently being mounted or not
	// We can use this to ignore initial state changes of the component
	const isMount = useIsMount();
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	const [isMotionAllowed, setIsMotionAllowed] = useState<boolean>(getIsMotionAllowed());
	const [areAnalyticsAllowed, setAreAnalyticsAllowed] = useState<boolean>(getAreAnalyticsAllowed());

	// Save the user's preferences to local storage when its state changes
	useEffect(() => {
		storageManager.setIf(!isMount, lsKeyForTheme, isDarkTheme);
	}, [isDarkTheme]);

	useEffect(() => {
		storageManager.setIf(!isMount, lsKeyForMotion, isMotionAllowed);
	}, [isMotionAllowed]);

	useEffect(() => {
		// Store cookie for 2 years
		const maxAge = areAnalyticsAllowed ? 0 : 63072000;

		document.cookie = `ga-disable-${props.metadata.trackingId}=true;max-age=${maxAge};path=/`;

		storageManager.setIf(!isMount, lsKeyForAnalytics, areAnalyticsAllowed);
	}, [areAnalyticsAllowed]);

	// Get the user's preference from storage if it exists
	// Otherwise, use the system preference if it is set or fall back to the default value
	function getIsDarkMode(): boolean {
		return storageManager.get(lsKeyForTheme, mediaFeatureMatches('prefers-color-scheme', 'dark', true));
	}

	function getIsMotionAllowed(): boolean {
		return storageManager.get(lsKeyForMotion, !mediaFeatureMatches('prefers-reduced-motion', 'reduce', false));
	}

	function getAreAnalyticsAllowed(): boolean {
		return storageManager.get(lsKeyForAnalytics, true);
	}

	// Get the primary theme color from DaisyUI config
	function getPrimaryThemeColor(): string {
		return props.metadata[isDarkTheme ? 'darkTheme' : 'lightTheme'].primary;
	}

	// Define toggle functions and memoize before passing to the relevant context provider
	const providerValuesForTheme = useMemo(() => ({
		isEnabled: isDarkTheme,
		toggle: () => {
			setIsDarkTheme(!isDarkTheme);
		}
	}), [isDarkTheme]);

	const providerValuesForMotion = useMemo(() => ({
		isEnabled: isMotionAllowed,
		toggle: () => {
			setIsMotionAllowed(!isMotionAllowed);
		}
	}), [isMotionAllowed]);

	const providerValuesForAnalytics = useMemo(() => ({
		isEnabled: areAnalyticsAllowed,
		toggle: () => {
			setAreAnalyticsAllowed(!areAnalyticsAllowed);
		}
	}), [areAnalyticsAllowed]);

	return (
		<DarkThemeContext.Provider value={providerValuesForTheme}>
			<AllowMotionContext.Provider value={providerValuesForMotion}>
				<SendAnalyticsContext.Provider value={providerValuesForAnalytics}>
					{/* Page head */}
					<Helmet htmlAttributes={{ lang: 'en-US' }}>
						<title>{props.metadata.title}</title>
						<meta name="author" content={props.metadata.author} />
						<meta name="description" content={props.metadata.description} />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />

						{/* OpenGraph tags */}
						<meta property="og:title" content={props.metadata.title} />
						<meta property="og:description" content={props.metadata.description} />
						<meta property="og:image" content={`${props.metadata.siteUrl}${ogImage}`} />
						<meta property="og:image:type" content="image/png" />
						<meta property="og:image:width" content="1200" />
						<meta property="og:image:height" content="630" />
						<meta property="og:type" content="website" />
						<meta name="twitter:title" content={props.metadata.title} />
						<meta name="google" content="nositelinkssearchbox" />
						<meta content={getPrimaryThemeColor()} name="theme-color" />

						<link rel="canonical" href={props.metadata.siteUrl} />

						{/* These icons are were not added to the head with gatsby-plugin-manifest so we need to add them manually here */}
						<link rel="icon" href="/favicon-32x32.png" type="image/png" />
						<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

						{/* Structured metadata */}
						<script type="application/ld+json">
							{`{
							"@context": "http://schema.org",
							"@type": "WebApplication",
							"name": "${props.metadata.shortTitle}",
							"description": "${props.metadata.description}",
							"url": "${props.metadata.siteUrl}",
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
								"name": "${props.metadata.author}",
								"url": "https://${props.metadata.homepageDomain}"
							}
						}`}
						</script>
					</Helmet>

					{/* Page body */}
					<MotionConfig reducedMotion="user">
						<div className={`min-h-screen flex-col justify-between items-center mx-auto gap-8 text-base bg-base-200 text-base-content selection:bg-primary selection:text-primary-content ${props.className}`}>
							{props.children}
						</div>
					</MotionConfig>
				</SendAnalyticsContext.Provider>
			</AllowMotionContext.Provider>
		</DarkThemeContext.Provider>
	);
}

PageLayout.defaultProps = {
	className: ''
};


// Create an interface for SingleColumnLayout props since there are a lot of types to define
interface SingleColumnLayoutPropsInterface {
	className?: string;
	collapse?: boolean;
	children: ReactNode;
	// Allow prop injection
	[propName: string]: any;
}

// Inner layout container that limits the width of its content and accepts arbitrary props
export function SingleColumnLayout(props: SingleColumnLayoutPropsInterface) {
	const { className, collapse, children, ...injectedProps } = props;

	return (
		<div className={`max-w-4xl h-full flex-col mx-auto gap-8 ${collapse && 'w-full' || 'w-5/6'} ${className}`} {...injectedProps}>
			{children}
		</div>
	);
}

SingleColumnLayout.defaultProps = {
	className: ''
};


// Wrapper component that applies a single column layout to the main page content
export function Main(props: { children: ReactNode }) {
	return (
		<main className="w-full h-full flex-col flex-1">
			<SingleColumnLayout className="flex-1 sm:w-5/6" collapse>
				{props.children}
			</SingleColumnLayout>
		</main>
	);
}


// A wrapper component that can be hidden
export function Section(props: { className: string; visible: boolean; children: ReactNode }) {
	return (
		<section className={`flex-col justify-center w-full h-full ${props.visible ? '' : 'hidden overflow-hidden '}${props.className}`}>
			{props.children}
		</section>
	);
}

Section.defaultProps = {
	className: '',
	visible: true
};
