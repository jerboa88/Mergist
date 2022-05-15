# Contributing

## Process

This a personal project but feel free to create an issue if you encounter any problems with the site. If you'd like to create a pull request to fix a problem yourself, please create an issue to discuss it first.

As this is a small project, I don't have any specific requirements beyond what is laid out here. By contributing you agree to release your work under the same license as this project.


## Project Details
Here are some details about how the project is made for anyone who is looking to contribute or use this project as reference:
- The site is written with the [React] library and built with [Gatsby]
- All components and pages are written in [TypeScript], with config files written with JavaScript as required
- All components are written as functions and use hooks for additional React features
- [DaisyUI] component classes are used to style most components, with [Tailwind CSS] (via [PostCSS]) used for additional styling
- [PDF-LIB] is used to actually merge the input PDF documents in the browser
- Deployment is done using a custom GitHub Actions workflow which builds the app using Gatsby and commits it to the `gh-pages` branch where it is published by GitHub. It is based on the [GitHub Pages Action] plugin by Shohei Ueda. See [main.yml](.github/workflows/main.yml) for more details

[Gatsby]: https://www.gatsbyjs.com/
[React]: https://reactjs.org/
[TypeScript]: https://www.typescriptlang.org/
[DaisyUI]: https://daisyui.com/
[Tailwind CSS]: https://tailwindcss.com/
[PostCSS]: https://postcss.org/
[PDF-LIB]: https://pdf-lib.js.org/
[Github Pages Action]: https://github.com/peaceiris/actions-gh-pages
