import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MetadataInterface } from '../common/types';
import { doesWindowExist, StorageManager, ThemeContext, useIsMount } from '../common/utilities';
import ogImage from '../images/og-image.png';


// Layout component that provides basic styles and metadata tags for the whole page
export function PageLayout(props: { className: string; metadata: MetadataInterface; children: ReactNode }) {
	const storageManager = new StorageManager();
	const lsKeyName = 'is-dark-theme';
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	const isMount = useIsMount();


	useEffect(() => {
		// Save the user's chosen theme to storage when the isDarkTheme var changes
		// Ignore the first update since this is caused by the component mounting rather than a user action
		if (!isMount) {
			storageManager.set(lsKeyName, isDarkTheme);
		}
	}, [isDarkTheme]);

	// Get the current theme from local storage if it exists, otherwise use the dark theme
	function getIsDarkMode(): boolean {
		let defaultValue = true;

		// Check if the prefers-color-scheme media query is supported
		if (doesWindowExist() && window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
			// If so, use this as the default theme
			defaultValue = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		return storageManager.get(lsKeyName, defaultValue);
	}

	function getPrimaryThemeColor(): string {
		return props.metadata[isDarkTheme ? 'darkTheme' : 'lightTheme'].primary;
	}

	// This method is passed to the ThemeContext component to toggle the theme
	const toggleTheme = useCallback(() => {
		setIsDarkTheme(!isDarkTheme);
	}, [isDarkTheme]);

	// Memoize before passing to the ThemeContext component
	const providerValues = useMemo(() => ({ isDarkTheme, toggleTheme }), [
		isDarkTheme,
		toggleTheme
	]);

	return (
		<ThemeContext.Provider value={providerValues}>
			<Helmet htmlAttributes={{ lang: 'en-US' }}>
				<title>{props.metadata.title}</title>
				<meta name="author" content={props.metadata.author} />
				<meta name="description" content={props.metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

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

				<link rel="icon" href="/favicon-32x32.png" type="image/png" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

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

			<div className={`min-h-screen flex-col justify-between items-center mx-auto gap-8 text-base bg-base-200 text-base-content selection:bg-primary selection:text-primary-content ${props.className}`}>
				{props.children}
			</div>
		</ThemeContext.Provider>
	);
}

PageLayout.defaultProps = {
	className: ''
};


interface SingleColumnLayoutPropsInterface {
	className?: string;
	collapse?: boolean;
	children: ReactNode;
	[propName: string]: any; // Allow injecting props
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
