/*
	Custom Type Definitions for TypeScript imports
	----------------------------------------------
*/


// Create custom type for svg files to suppress import warnings
declare module '../images/*.svg' {
	export default React.FunctionComponent<React.SVGAttributes<SVGElement>>();
}

// Create custom type for png images to suppress import warnings
declare module '../images/*.png' {
	export default React.FunctionComponent<React.PNGAttributes<HTMLImageElement>>();
}
