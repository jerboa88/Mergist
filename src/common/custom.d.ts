/*
	Custom Type Definitions for TypeScript imports
	----------------------------------------------
*/

// Create custom type for SVG files to suppress import warnings
declare module '*.svg' {
	import type { FunctionComponent, SVGProps } from 'react';

	const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;

	// biome-ignore lint/style/noDefaultExport: This needs to be a default export
	export default ReactComponent;
}
