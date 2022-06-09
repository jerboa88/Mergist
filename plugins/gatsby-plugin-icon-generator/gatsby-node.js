/*
	Node.js code to generate icons of different sizes from source images
	--------------------------------------------------------------------
*/


const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { optimize } = require('svgo');
const optionsSchema = require('./options-schema.js');


const inputFolder = 'src';
const outputFolder = 'public';
const resizeOptions = {
	fit: sharp.fit.contain,
	background: {
		r: 0,
		g: 0,
		b: 0,
		alpha: 0
	}
};
const outputOptions = {
	compressionLevel: 9
};
const optimizeOptions = {
	plugins: [
		// Enable default plugins
		{
			name: 'preset-default',
			params: {
				overrides: {
					// Disable the inline styles plugin
					inlineStyles: false
				}
			}
		},
		// Custom plugin to remove unnecessary whitespace in styles since the built-in minifyStyles plugin doesn't work with nested styles
		{
			name: 'minifyNestedStyles',
			type: 'perItem',
			fn: ast => {
				if ('children' in ast) {
					for (let i = 0; i < ast.children.length; ++i) {
						if (ast.children[i].type === 'text') {
							const minifiedCss = ast.children[i].value
								.replace(/\n\s{0, 64}/g, '')	// Remove whitespace at the beginning of lines
								.replace(/\s{1,64}{/g, '{')		// Remove whitespace before opening curly braces
								.replace(/:\s{1,64}/g, ':')		// Remove whitespace after colons
								.replace(/,\s{1,64}/g, ',')		// Remove whitespace after commas
								.replace(/;}/g, '}');					// Remove trailing semicolons before closing curly braces

							ast.children[i].value = minifiedCss;
						}
					}
				}
			}
		}
	]
};


// Check if a given image is an SVG
function isSvg(imgPath) {
	return path.extname(imgPath).toLowerCase() === '.svg';
}


// Create required output directories if they don't exist
async function createDir(outputImgPath) {
	return new Promise((resolve, reject) => {
		fs.promises.mkdir(path.dirname(outputImgPath), { recursive: true })
			.then(resolve)
			.catch(err => {
				if (err.code !== 'EEXIST') {
					reject(err);
				}
			});
	});
}


// Copy an icon to the specified location
async function copyIcon(inputImgPath, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		fs.promises.copyFile(inputImgPath, outputImgPath)
			.then(resolve)
			.catch(err => {
				reject(err);
			});
	});
}


// Generate an icon, resize it, and save the result to the specified location
async function generateRasterIcon(inputImg, outputImgWidth, outputImgHeight, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		try {
			await inputImg.clone()
				.resize(outputImgWidth, outputImgHeight, resizeOptions)
				.toFile(outputImgPath, outputOptions);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
}


// Load an SVG icon, optimize it with SVGO, and save the result to the specified location
async function generateVectorIcon(inputImgPath, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		try {
			const svgInputText = fs.readFileSync(inputImgPath);
			const { data: svgOutputText } = optimize(svgInputText, optimizeOptions);

			fs.writeFileSync(outputImgPath, svgOutputText);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
}


// Export the Joi schema for the plugin options
exports.pluginOptionsSchema = optionsSchema.pluginOptionsSchema;


// Run plugin on the 'onPostBootstrap' lifecycle event
// The gatsby-plugin-manifest plugin also fires on this event
exports.onPostBootstrap = async ({ reporter, parentSpan }, pluginOptions) => {
	const activity = reporter.activityTimer('Generate icons', { parentSpan });

	activity.start();

	const imgGenerationRules = pluginOptions.generate;

	for (const { from: inputImgName, to: outputImgObjs, options } of imgGenerationRules) {
		const inputImgPath = path.join(inputFolder, inputImgName);

		if (!fs.existsSync(inputImgPath)) {
			reporter.error(`Input image ${inputImgPath} does not exist`);
			continue;
		}

		const inputImg = sharp(inputImgPath);

		for (const { path: outputImgName, size } of outputImgObjs) {
			const outputImgPath = path.join(outputFolder, outputImgName);
			const [outputImgWidth, outputImgHeight] = size.length === 2 ? size : [size[0], size[0]];

			createDir(outputImgPath).then(() => {
				// If file extension is .svg, copy the file over instead of trying to resize it
				if (isSvg(outputImgPath)) {
					// Throw an error if we try to create an SVG file from an input file with another file type
					if (!isSvg(inputImgPath)) {
						throw new Error(`Cannot convert a raster input image ${inputImgPath} to an SVG`);
					}

					if (options.optimize) {
						generateVectorIcon(inputImgPath, outputImgPath);
					} else {
						copyIcon(inputImgPath, outputImgPath);
					}
				} else {
					generateRasterIcon(inputImg, outputImgWidth, outputImgHeight, outputImgPath);
				}
			}).catch(err => {
				reporter.error(err);
			});
		}
	}

	activity.end();
};
