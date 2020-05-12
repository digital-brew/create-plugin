const tailwindcss = require( 'tailwindcss' );
const autoprefixer = require( 'autoprefixer' );

const postcssPrependSelector = require( 'postcss-prepend-selector' )( {
	selector: '[class*="esnext-example"] ',
} );

module.exports = {
	plugins: [
		tailwindcss( './tailwind.config.js' ),
		postcssPrependSelector,
		autoprefixer
	],
};
