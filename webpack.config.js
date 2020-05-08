const path = require( 'path' );
const { get, escapeRegExp, compact } = require( 'lodash' );
const { basename, sep } = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { devDependencies } = require( './package' );

const BLOCKHANDBOOK_NAMESPACE = '@blockhandbook/';
const BUNDLED_PACKAGES = [ ];

const blockhandbookPackages = Object.keys( devDependencies )
	.filter(
		( packageName ) =>
			! BUNDLED_PACKAGES.includes( packageName ) &&
			packageName.startsWith( BLOCKHANDBOOK_NAMESPACE )
	)
	.map( ( packageName ) => packageName.replace( BLOCKHANDBOOK_NAMESPACE, '' ) );

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
	entry: blockhandbookPackages.reduce( ( memo, packageName ) => {
		const name = camelCaseDash( packageName );
		memo[ name ] = `./packages/${ packageName }`;
		return memo;
	}, {} ),
	output: {
		devtoolNamespace: 'blockhandbook',
		filename: './packages/[name]/build/index.js',
		path: __dirname,
		library: [ 'blockhandbook' ],
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
