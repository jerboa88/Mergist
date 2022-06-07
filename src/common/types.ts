/*
	Common types used in the project
	--------------------------------
*/


import { PDFFile } from './utilities';


export interface DaisyUiThemeInterface {
	'accent': string;
	'accent-content': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
	'base-content': string;
	'neutral': string;
	'neutral-content': string;
	'neutral-focus': string;
	'primary': string;
	'primary-content': string;
	'secondary': string;
	'secondary-content': string;
}


// This needs to be a type rather than an interface due to existing TS 'functionality'
// See https://github.com/microsoft/TypeScript/issues/15300 for more details
export type MetadataInterface = {
	shortTitle: string;
	title: string;
	description: string;
	author: string;
	siteUrl: string;
	githubUrl: string;
	homepageDomain: string;
	lightTheme: DaisyUiThemeInterface;
	darkTheme: DaisyUiThemeInterface;
}


export interface PDFFileMapInterface {
	[key: string]: PDFFile
}


export enum SeverityTypes {
	SUCCESS,
	WARNING,
	ERROR
}
