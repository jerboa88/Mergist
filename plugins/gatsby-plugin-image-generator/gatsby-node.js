/*
	Node.js code to generate images of different sizes from source images
	--------------------------------------------------------------------
*/


const fs = require('fs');
const { extname, dirname, join } = require('path');
const sharp = require('sharp');
const { optimize } = require('svgo');
const optionsSchema = require('./options-schema.js');


const pluginName = 'gatsby-plugin-image-generator';
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
	return extname(imgPath).toLowerCase() === '.svg';
}


// Create required output directories if they don't exist
async function createDir(outputImgPath) {
	return new Promise((resolve, reject) => {
		fs.promises.mkdir(dirname(outputImgPath), { recursive: true })
			.then(resolve)
			.catch(err => {
				// Ignore the error if it is because the directory already exists
				if (err.code !== 'EEXIST') {
					reject(err);
				}
			});
	});
}


// Copy an image to the specified location
async function copyImg(inputImgPath, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		fs.promises.copyFile(inputImgPath, outputImgPath)
			.then(resolve)
			.catch(err => {
				reject(err);
			});
	});
}


// Generate an image, resize it, and save the result to the specified location
async function generateRasterImg(inputImg, outputImgWidth, outputImgHeight, outputImgPath) {
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


// Load an SVG image, optimize it with SVGO, and save the result to the specified location
async function generateVectorImg(inputImgPath, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		try {
			const svgInputText = fs.readFileSync(inputImgPath);
			// Optimize with SVGO
			const { data } = optimize(svgInputText, optimizeOptions);

			fs.writeFileSync(outputImgPath, data);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
}


// Validate an input image rule and spawn promises to handle generation of its associated output images
async function processInputImgRule({ from, to: outputImgRules, options }) {
	return new Promise(async (resolve, reject) => {
		const inputImgPath = join(inputFolder, from);

		// Check if the input image exists
		if (!fs.existsSync(inputImgPath)) {
			reporter.error(`Input image ${inputImgPath} does not exist`);
			reject();
		}

		const inputImg = sharp(inputImgPath);
		// Create a promise for each output image rule
		const promiseArray = outputImgRules.map(async outputImgRule => {
			return processOutputImgRule(inputImgPath, inputImg, outputImgRule, options);
		});

		// Wait for all output image generation promises to complete
		await Promise.all(promiseArray).then(values => {
			// Resolve with the number of output images generated
			resolve(values.length);
		}).catch(err => {
			reject(err);
		});
	});
}


// Generate a set of output images from a given input image following the provided rules
async function processOutputImgRule(inputImgPath, inputImg, { path, size }, options) {
	return new Promise(async (resolve, reject) => {
		const outputImgPath = join(outputFolder, path);
		// If only one number was provided for size, assume width and height are the same
		const [outputImgWidth, outputImgHeight] = size.length === 2 ? size : [size[0], size[0]];

		// Create the output folder if it doesn't exist
		createDir(outputImgPath).then(async () => {
			if (isSvg(outputImgPath)) {
				// Throw an error if we try to create an SVG file from an input file with another file type
				if (!isSvg(inputImgPath)) {
					throw new Error(`Cannot convert a raster input image ${inputImgPath} to an SVG`);
				}

				// Optimize the SVG file if specified. Otherwise, just copy the file over
				if (options.optimize) {
					await generateVectorImg(inputImgPath, outputImgPath);
				} else {
					await copyImg(inputImgPath, outputImgPath);
				}
			} else {
				await generateRasterImg(inputImg, outputImgWidth, outputImgHeight, outputImgPath);
			}

			resolve();
		}).catch(err => {
			reject(err);
		});
	});
}


// Returns the plural form of `image` if number is 0 or greater than 1
function pluralize(number) {
	return `image${number === 1 ? '' : 's'}`;
}


// Export the Joi schema for the plugin options
exports.pluginOptionsSchema = optionsSchema.pluginOptionsSchema;


// Run plugin on the `onPostBootstrap` lifecycle event
// The `gatsby-plugin-manifest` plugin fires on the same event
exports.onPostBootstrap = async ({ reporter, parentSpan }, { generate: inputImgRules }) => {
	const activity = reporter.activityTimer('Generate images', { parentSpan });

	activity.start();

	// Create a promise for each input image rule
	const promiseArray = inputImgRules.map(async inputImgRule => {
		return processInputImgRule(inputImgRule);
	});

	// Wait for all input image generation promises to complete
	await Promise.all(promiseArray).then(values => {
		const numOfInputImgs = values.length;
		const numOfOutputImgs = values.reduce((previousValue, currentValue) => previousValue + currentValue);

		reporter.info(`${pluginName} generated ${numOfOutputImgs} output ${pluralize(numOfOutputImgs)} from ${numOfInputImgs} input ${pluralize(numOfInputImgs)}`);
		activity.end();
	}).catch(err => {
		reporter.error('Something went wrong while generating output images:', err);
	});
};
