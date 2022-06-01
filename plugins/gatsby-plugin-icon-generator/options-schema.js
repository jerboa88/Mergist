/*
	A schema for validating options passed to the plugin
	----------------------------------------------------
*/


exports.pluginOptionsSchema = ({ Joi }) => {
	const minImgSize = 1;
	const maxImgSize = 8192;
	const imgFileSchema = Joi.string().required().pattern(/\.(?:jpg|jpeg|png|webp|gif|avif|tif|tiff|svg)$/i).messages({
		'string.pattern.base': `Invalid filename. Only JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG images are supported.`
	});

	return Joi.object({
		generate: Joi.array().required().items(
			Joi.object({
				from: imgFileSchema.description(`The path to the input image. This will be relative to the 'src' folder`),
				to: Joi.array().required().items(Joi.object({
					path: imgFileSchema.description(`The path to the output image. This will be relative to the 'public' folder.`),
					size: Joi.number().required().min(minImgSize).max(maxImgSize)
						.description(`The size of the icon. This must be between ${minImgSize}px and ${maxImgSize}px`)
						.messages({
							'number.min': `Image sizes must be at least ${minImgSize}px`,
							'number.max': `Image sizes must be at most ${maxImgSize}px`
						})
				}))
			})
		)
	});
};
