/*
	Node.js code to generate icons from input images
	------------------------------------------------
*/


const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const optionsSchema = require('./options-schema.js');


const inputFolder = 'src';
const outputFolder = 'public';
const resizeOptions = {
	fit: sharp.fit.contain,
	background: { r: 0, g: 0, b: 0, alpha: 0 }
};


// Check if a given image is an svg
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
async function generateIcon(inputImg, size, outputImgPath) {
	return new Promise(async (resolve, reject) => {
		try {
			await inputImg.clone()
				.resize(size, size, resizeOptions)
				.toFile(outputImgPath, { compressionLevel: 9 });
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

	for (const { from: inputImgName, to: outputImgObjs } of imgGenerationRules) {
		const inputImgPath = path.join(inputFolder, inputImgName);

		if (!fs.existsSync(inputImgPath)) {
			reporter.error(`Input image ${inputImgPath} does not exist`);
			continue;
		}

		const inputImg = sharp(inputImgPath);

		for (const { path: outputImgName, size: outputImgSize } of outputImgObjs) {
			const outputImgPath = path.join(outputFolder, outputImgName);

			createDir(outputImgPath).then(() => {
				// If file extension is .svg, copy the file over instead of trying to resize it
				if (isSvg(outputImgPath)) {
					// Throw an error if we try to create an SVG file from an input file with another file type
					if (!isSvg(inputImgPath)) {
						throw new Error(`Cannot convert input image ${inputImgPath} to an SVG`);
					}

					copyIcon(inputImgPath, outputImgPath);
				} else {
					generateIcon(inputImg, outputImgSize, outputImgPath);
				}
			}).catch(err => {
				reporter.error(err);
			});
		}
	}

	activity.end();
};
