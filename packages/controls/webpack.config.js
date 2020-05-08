const path = require( 'path' );
const { basename, sep } = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { dependencies } = require( './package' );

/* Plugins */
const CustomTemplatedPathPlugin = require( '@wordpress/custom-templated-path-webpack-plugin' );
const LibraryExportDefaultPlugin = require( '@wordpress/library-export-default-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const defaultPlugins = defaultConfig.plugins;
const {
	camelCaseDash,
} = require( '@wordpress/dependency-extraction-webpack-plugin/util' );

const config = {
	...defaultConfig,
	optimization: {
		// Only concatenate modules in production, when not analyzing bundles.
		concatenateModules: true,
	},
	mode: 'production',
	devtool: 'source-map',
	entry: {
		index: [ path.resolve( process.cwd(), `src/index.js` ) ],
	},
	output: {
		devtoolNamespace: 'blockhandbook',
		path: path.resolve( process.cwd(), `./build` ),
		filename: '[name].js',
		library: [ 'blockhandbook', '[name]' ],
		libraryTarget: 'this',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
		],
	},
	plugins: [ 
		...defaultPlugins,
		new CustomTemplatedPathPlugin( {
			basename( path, data ) {
				let rawRequest;

				const entryModule = get( data, [ 'chunk', 'entryModule' ], {} );
				switch ( entryModule.type ) {
					case 'javascript/auto':
						rawRequest = entryModule.rawRequest;
						break;

					case 'javascript/esm':
						rawRequest = entryModule.rootModule.rawRequest;
						break;
				}

				if ( rawRequest ) {
					return basename( rawRequest );
				}

				return path;
			},
		} ),
		new LibraryExportDefaultPlugin(
			[
				'api-fetch',
				'deprecated',
				'dom-ready',
				'redux-routine',
				'token-list',
				'server-side-render',
				'shortcode',
				'warning',
			].map( camelCaseDash )
		),
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
	],
};

module.exports = config;
