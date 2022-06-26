/*
	A custom SVGO plugin to minify nested styles
	--------------------------------------------
*/


exports.minifyNestedStyles = {
	name: 'minifyNestedStyles',
	type: 'perItem',
	fn: rootAst => {
		function minifyCss(cssText) {
			return cssText
				.replace(/\s{2,}/g, '')			// Remove consecutive whitespace
				.replace(/\s(\(|{)/g, '$1')	// Remove whitespace before tokens
				.replace(/(:|,)\s/g, '$1')	// Remove whitespace after tokens
				.replace(/;}/g, '}');				// Remove semicolons before closing curly braces
		}

		function exploreChildren(ast) {
			if ('children' in ast) {
				for (let i = 0; i < ast.children.length; ++i) {
					if (ast.children[i].type === 'text') {
						ast.children[i].value = minifyCss(ast.children[i].value);
					} else if (ast.children[i].name === 'style') {
						exploreChildren(ast.children[i]);
					}
				}
			}
		}

		exploreChildren(rootAst);
	}
};
