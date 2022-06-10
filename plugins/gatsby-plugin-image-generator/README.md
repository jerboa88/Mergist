<!-- Project Header -->
<div align="center">
	<h1 class="projectName">
    Gatsby Plugin Image Generator
  </h1>

  <p class="projectBadges">
    <img src="https://img.shields.io/badge/type-Node.js_Module-4caf50.svg" alt="Project type" title="Project type">
  </p>

  <p class="projectDesc">
    A Gatsby plugin for generating images of different sizes from source images
  </p>

  <br/>
</div>


## Why?
I was looking for an icon generation plugin that supported multiple source images and support for both raster image formats and SVGs, but could not find anything suitable.

The official [gatsby-plugin-manifest](https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest) plugin can be used to generate icons, but it only supports a single input image which makes it impossible to generate both traditional favicons and a separate maskable icon for PWA support, for example.

I designed this plugin in order to offload the icon generation responsibility from gatsby-plugin-manifest, but it doesn't depend on gatsby-plugin-manifest and you don't necessarily need to be converting icons either. For example, you can use this to:
- move images from `src` to `public`
- convert between image formats
- generate raster images from SVGs
- optimize SVGs


## Installation
> TODO


## Usage
> TODO


## Contributing
> TODO


## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
