<!-- Project Header -->
<div align="center">
  <img class="projectLogo" src="src/images/og-image.png" alt="Project logo" title="Project logo" width="256">
	<h1 class="projectName">
    <a href="https://mergist.johng.io">
      Mergist - Online PDF Merger
    </a>
  </h1>

  <p class="projectBadges">
    <img src="https://img.shields.io/badge/type-Web_App-ff5722.svg" alt="Project type" title="Project type">
    <img src="https://img.shields.io/github/languages/top/jerboa88/Mergist.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/Mergist.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/Mergist.svg" alt="Project license" title="Project license"/>
    </a>
  </p>

  <p class="projectDesc">
    Mergist is an online tool to combine multiple PDF files into one. Mergist has no ads, no file size limits, and your files never leave your device.
  </p>

  <br/>
</div>


## Installation
1. Install Node.js and NPM if they are not already set up on your system. See [nodejs.org](https://nodejs.org/) for more details.
2. Clone the repo and enter the project root with `cd Mergist`.
3. Use `npm install` to install the app and all of it's dependencies.


## Usage
Mergist is a static site built using the Gatsby framework. The Gatsby CLI should already be installed after running the install command above.

You can either run the app in development mode with `gatsby develop` or use `gatsby serve` to preview the production build. After the build completes, the site should be accessible at `http://localhost:8000/`.


## Contributing
Please feel free to create an issue or pull request if you encounter any issues. By contributing you agree to release your work under the same license as this project.

**More implementation details:**
- Typescript only
- DaisyUI component classes are used to style most components, with Tailwind CSS (via PostCSS) used for additional styling
- Deployment is done using a custom GitHub Actions workflow which builds the app using Gatsby and commits it to the `gh-pages` branch where it is published by GitHub


## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. This project includes various resources which carry their own copyright notices and license terms. See [LICENSE-THIRD-PARTY.md](LICENSE-THIRD-PARTY.md) for more details.