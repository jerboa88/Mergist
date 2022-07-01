/*
	Reusable layout components
	--------------------------
*/


import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MotionConfig } from 'framer-motion';
import { MetadataInterface } from '../common/types';
import { StorageManager, DarkThemeContext, AllowMotionContext, useIsMount, mediaFeatureMatches } from '../common/utilities';
import ogImage from '../images/og-image.png';


// Exports

// Layout component that provides basic styles and metadata tags for the whole page
export function PageLayout(props: { className: string; metadata: MetadataInterface; children: ReactNode }) {
	const storageManager = new StorageManager();
	const lsKeyForTheme = 'is-dark-theme';
	const lsKeyForMotion = 'is-motion-allowed';
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	const [isMotionAllowed, setIsMotionAllowed] = useState<boolean>(getIsMotionAllowed());
	// Whether the component is currently being mounted or not
	// We can use this to ignore initial state changes of the component
	const isMount = useIsMount();

	// Save the user's chosen theme to storage when isDarkTheme changes
	useEffect(() => {
		if (!isMount) {
			storageManager.set(lsKeyForTheme, isDarkTheme);
		}
	}, [isDarkTheme]);

	// Save the user's chosen `motion-allowed` preference to storage when isMotionAllowed changes
	useEffect(() => {
		if (!isMount) {
			storageManager.set(lsKeyForMotion, isMotionAllowed);
		}
	}, [isMotionAllowed]);

	// Get the current theme from local storage if it exists, otherwise use the dark theme
	function getIsDarkMode(): boolean {
		// Use system preference if it is set
		const defaultValue = mediaFeatureMatches('prefers-color-scheme', 'dark', true);

		return storageManager.get(lsKeyForTheme, defaultValue);
	}

	// Get the current `motion-allowed` preference from local storage if it exists, otherwise allow motion
	function getIsMotionAllowed(): boolean {
		// Use system preference if it is set
		const defaultValue = mediaFeatureMatches('prefers-reduced-motion', 'reduce', false);

		return storageManager.get(lsKeyForMotion, defaultValue);
	}

	// Get the primary theme color from DaisyUI config
	function getPrimaryThemeColor(): string {
		return props.metadata[isDarkTheme ? 'darkTheme' : 'lightTheme'].primary;
	}

	// This method is passed to the DarkThemeContext component to toggle the theme
	const toggleTheme = useCallback(() => {
		setIsDarkTheme(!isDarkTheme);
	}, [isDarkTheme]);

	// This method is passed to the AllowMotionContext component to toggle the `motion-allowed` preference
	const toggleMotionAllowed = useCallback(() => {
		setIsMotionAllowed(!isMotionAllowed);
	}, [isMotionAllowed]);

	// Memoize before passing to the DarkThemeContext component
	const providerValuesForTheme = useMemo(() => ({
		isEnabled: isDarkTheme,
		toggle: toggleTheme
	}), [isDarkTheme, toggleTheme]);

	// Memoize before passing to the AllowMotionContext component
	const providerValuesForMotion = useMemo(() => ({
		isEnabled: isMotionAllowed,
		toggle: toggleMotionAllowed
	}), [isMotionAllowed, toggleMotionAllowed]);

	return (
		<DarkThemeContext.Provider value={providerValuesForTheme}>
			<AllowMotionContext.Provider value={providerValuesForMotion}>
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
