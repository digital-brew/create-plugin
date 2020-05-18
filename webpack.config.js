const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { devDependencies } = require( './package' );
const { basename, sep } = require( 'path' );
const { get, escapeRegExp, compact } = require( 'lodash' );

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
const defaultPlugins = defaultConfig.plugins;
const CustomTemplatedPathPlugin = require( '@wordpress/custom-templated-path-webpack-plugin' );
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
	entry: blockhandbookPackages.reduce( ( memo, packageName ) => {
		// const name = camelCaseDash( packageName );
		const name = packageName;
		memo[ name ] = `./packages/${ packageName }`;
		return memo;
	}, {} ),
	output: ( ( ) => {

		return {
			filename: './packages/[name]/build/index.js',
			path: __dirname,
			library: '[basename]',
			libraryTarget: 'this',
		}
	} )( ),
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

				// FYI - I added this so that we get a camelCased
				// basename with tailwindcss packages - i.e. - tailwindcssControls
				if ( rawRequest ) {
					return basename( camelCaseDash( rawRequest ) );
				}

				return path;
			},
		} ),
	],
};

module.exports = config;
