/*
	A schema for validating options passed to the plugin
	----------------------------------------------------
*/

exports.pluginOptionsSchema = ({ Joi }) => {
	// Constants
	const minImgSize = 1;
	const maxImgSize = 8192;
	const msg = {
		desc: {
			from: `The path to the input image. This will be relative to the 'src' folder.`,
			path: `The path to the output image. This will be relative to the 'public' folder.`,
			size: `The size of the output image. This can be a single number or an array of two numbers for width and height.`,
			optimize: `Whether to optimize the output image or simply copy it to the output directory (default: false).`,
		},
		err: {
			from: {
				invalid: {
					'string.pattern.base': `Invalid input filename. Only JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG images are supported.`,
				},
			},
			path: {
				invalid: {
					'string.pattern.base': `Invalid output filename. Only JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG images are supported.`,
				},
				noSvgFromRaster: {
					'string.pattern.base': `Invalid output filename. Only JPEG, PNG, WebP, GIF, AVIF, and TIFF images are supported. Raster images cannot be converted to SVG.`,
				},
			},
			size: {
				invalid: {
					'number.min': `Image width/height must be at least ${minImgSize}px`,
					'number.max': `Image width/height must be at most ${maxImgSize}px`,
				},
			},
			optimize: {
				invalid: {
					'boolean.base': `Invalid value for 'optimize'. Must be a boolean.`,
				},
			},
		},
	};

	// Schemas
	const svgFileSchema = Joi.string()
		.required()
		.pattern(/\.svg$/i);
	const rasterFileSchema = Joi.string()
		.required()
		.pattern(/\.(?:jpg|jpeg|png|webp|gif|avif|tif|tiff)$/i);
	const sizeSchema = Joi.array()
		.required()
		.single()
		.min(1)
		.max(2)
		.items(
			Joi.number()
				.required()
				.min(minImgSize)
				.max(maxImgSize)
				.description(msg.desc.size)
				.messages(msg.err.size.invalid),
		);

	return Joi.object({
		generate: Joi.array()
			.required()
			.items(
				Joi.alternatives().try(
					// If SVG input image
					Joi.object({
						from: svgFileSchema
							.description(msg.desc.from)
							.messages(msg.err.from.invalid),
						to: Joi.array()
							.required()
							.items(
								Joi.object({
									path: Joi.alternatives().try(
										svgFileSchema
											.description(msg.desc.path)
											.messages(msg.err.path.invalid),
										rasterFileSchema
											.description(msg.desc.path)
											.messages(msg.err.path.invalid),
									),
									size: sizeSchema,
								}),
							),
						options: Joi.object({
							optimize: Joi.boolean()
								.description(msg.desc.optimize)
								.default(false)
								.messages(msg.err.optimize.invalid),
						})
							.optional()
							.default({}),
					}),

					// If raster input image
					Joi.object({
						from: rasterFileSchema
							.description(msg.desc.from)
							.messages(msg.err.from.invalid),
						to: Joi.array()
							.required()
							.items(
								Joi.object({
									path: rasterFileSchema
										.description(msg.desc.path)
										.messages(msg.err.path.noSvgFromRaster),
									size: sizeSchema,
								}),
							),
						// options: Joi.object().optional().default({})
					}),
				),
			),
	});
};
