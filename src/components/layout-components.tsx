import React, { ReactNode, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MetadataInterface } from '../common/types';
import { ThemeContext } from '../common/utilities';
import ogImage from '../images/og-image.png';


// Layout component that provides basic styles and metadata tags for the whole page
export function PageLayout(props: { className: string; metadata: MetadataInterface; children: ReactNode }) {
	const lsKeyName = 'is-dark-theme';
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());


	useEffect(() => {
		doesWindowExist() && localStorage.setItem(lsKeyName, JSON.stringify(isDarkTheme));
	}, [isDarkTheme]);

	// Check if the window exists so that we do not run browser code on the server
	function doesWindowExist(): boolean {
		return typeof window !== 'undefined';
	}

	function getIsDarkMode() {
		const loadedVal = doesWindowExist() && localStorage.getItem(lsKeyName);

		return loadedVal ? JSON.parse(loadedVal) : false;
	}

	function toggleTheme() {
		setIsDarkTheme(!isDarkTheme);
	}

	function getPrimaryThemeColor() {
		return props.metadata[isDarkTheme ? 'darkTheme' : 'lightTheme'].primary;
	}


	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
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

				<script type="application/ld+json">
					{`{
						"@context": "http://schema.org",
						"@type": "WebApplication",
						"name": "${props.metadata.shortTitle}",
						"description": "${props.metadata.description}",
						"url": "${props.metadata.siteUrl}",
						"softwareVersion": "1.0.0",
						"operatingSystem": "All",
						"author": {
							"@type": "Person",
							"name": "${props.metadata.author}",
							"url": "https://${props.metadata.homepageDomain}"
						}
					}`}
				</script>
			</Helmet>

			<div className={`min-h-screen flex flex-col justify-between items-center mx-auto gap-8 bg-base-200 text-base-content ${props.className}`}>
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
	children: ReactNode;
	[propName: string]: any; // Allow injecting props
}

// Inner layout container that limits the width of its content and accepts arbitrary props
export function SingleColumnLayout(props: SingleColumnLayoutPropsInterface) {
	const { className, children, ...injectedProps } = props;

	return (
		<div className={`w-5/6 max-w-4xl h-full flex flex-col mx-auto gap-8 ${className}`} {...injectedProps}>
			{children}
		</div>
	);
}

SingleColumnLayout.defaultProps = {
	className: ''
};


// Wrapper component that applies a single column layout to the main page content
export function Main(props: { className: string; children: ReactNode }) {
	return (
		<main className="w-full h-full flex flex-col flex-1">
			<SingleColumnLayout className="flex-1">
				{props.children}
			</SingleColumnLayout>
		</main>
	);
}

Main.defaultProps = {
	className: ''
};


export function Section(props: { className: string; visible: boolean; children: ReactNode }) {
	return (
		<section className={`flex flex-col justify-center w-full h-full ${props.visible ? '' : 'hidden overflow-hidden '}${props.className}`}>
			{props.children}
		</section>
	);
}

Section.defaultProps = {
	className: '',
	visible: true
};
