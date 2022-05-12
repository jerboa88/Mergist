/*
	Global customizations for the browser
	-------------------------------------
*/


import { config } from '@fortawesome/fontawesome-svg-core';
import './src/styles/global.css'


// Prevent Font Awesome from dynamically loading styles as we load them ahead of time in global.css
config.autoAddCss = false
