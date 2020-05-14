const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const defaultPlugins = defaultConfig.plugins;

/* Plugins */

// Compile block frontend and editor scss files into css files.
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const extractStyles = new ExtractTextPlugin( './style.css' );
const extractEditorStyles = new ExtractTextPlugin( './editor.css' );

const config = {
	...defaultConfig,
	mode: 'production',
	devtool: 'source-map',
	entry: {
		index: [ path.resolve( process.cwd(), `src/index.js` ) ],
		frontend: [ path.resolve( process.cwd(), `src/frontend.js` ) ],
		variations: [ path.resolve( process.cwd(), `src/variations.js` ) ],
	},
	output: {
		path: path.resolve( process.cwd(), `./build` ),
		filename: '[name].js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /editor\.(sa|sc|c)ss$/,
				use: extractEditorStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: false,
							},
						},
					],
				} ),
			},
			{
				test: /style\.(sa|sc|c)ss$/,
				use: extractStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: false,
								prependData:
									'@import "./src/assets/scss/common.scss";\n',
							},
						},
					],
				} ),
			},
		],
	},
	plugins: [ ...defaultPlugins, extractStyles, extractEditorStyles ],
};

module.exports = config;
