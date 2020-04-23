/**
 * External dependencies
 */
const { command } = require( 'execa' );
const { isEmpty, omitBy } = require( 'lodash' );
const { join } = require( 'path' );
const writePkg = require( 'write-pkg' );

/**
 * Internal dependencies
 */
const { info } = require( './log' );

module.exports = async function( {
	namespace,
	namespaceSnakeCase,
	phpClassName,
	slug,
	slugSnakeCase,
	title,
	description,
	dashicon,
	category,
	version,
	author,
	authorEmail,
	license,
	licenseURI,
	authorURI,
	pluginURI,
	textdomain,
} ) {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info( 'Creating a "package.json" file.' );
	await writePkg(
		cwd,
		omitBy(
			{
				name: slug,
				version,
				description,
				author,
				license,
				main: './src/index.js',
				"config": {
					"author_uri": authorURI,
					"plugin_uri": pluginURI,
					"plugin_name": title,
					"contributors": author,
					"tags": "blockhandbook, block handbook",
					slug,
					"namespace": phpClassName,
					"text_domain": textdomain,
					"tested_up_to": "5.4",
					"language": "eo",
					"replace": {
						"slug": slug,
						"plugin_name": phpClassName,
						"text_domain": textdomain,
						"namespace": namespace
					}
				},
				"scripts": {
					"setup": "composer install && npm run generate-autoloader && npm install && npm run build && npm run server:start && npm run permalinks",
					"start": "npm run browser-sync & npm run tailwind:watch",
					"build": "wp-scripts build --config ./config/webpack.prod.js && npm run tailwind:build && cd ./build && rm *.map",
					"clean": "npx wp-env clean && npm run server:stop && rm -rf node_modules wordpress vendor",
					"config:update": "replace-in-file --configFile=./config/replace.config.js --regEx --verbose",
					"server:start": "npx wp-env start && npm run permalinks && npm run install:gutenberg",
					"server:stop": "npx wp-env stop",
					"tailwind:build": "cross-env NODE_ENV=production postcss --config ./config/postcss.config.js ./src/assets/css/tailwind.css -o ./build/tailwind.css",
					"browser-sync": "cross-env WRITE_TO_DISK=true browser-sync start --config ./config/bs-config.js",
					"generate-autoloader": "composer dump-autoload -o",
					"install:gutenberg": "npx wp-env run cli wp plugin install gutenberg && npx wp-env run cli wp plugin activate gutenberg",
					"lint:css": "wp-scripts lint-style",
					"lint:js": "wp-scripts lint-js",
					"lint:pkg-json": "wp-scripts lint-pkg-json",
					"make:pot": `wp i18n make-pot ./ ./languages/$npm_package_config_text_domain.pot --headers='{\"Last-Translator\":\"${ author } <${ authorEmail }>\",\"Language-Team\":\"${ author } <${ authorEmail }>\"}' --exclude=src && cp ./languages/$npm_package_config_text_domain.pot ./languages/$npm_package_config_text_domain-$npm_package_config_language.po`,
					"make:json": `wp i18n make-json ./languages/ && rename 's/(${ slug }-[a-zA-Z_]+-)[^\\.]*(\\.json)/$1${ slug }-block-editor-script$2/' ./languages/*`,
					"make:mo": "cd languages && find . -name \\*.po -execdir sh -c 'msgfmt \"$0\" -o `basename $0 .po`.mo' '{}' \\;",
					"packages-update": "wp-scripts packages-update",
					"permalinks": "wp-env run cli wp rewrite structure /%postname%/ --hard",
					"old-permalinks": "npm run env cli rewrite structure /%postname%/",
					"svn:make": "svn co https://plugins.svn.wordpress.org/$npm_package_config_slug svn",
					"svn:add": "cd svn && svn add trunk/* && svn add assets/* && svn add branches && svn add tags/*",
					"svn:tag": "cd svn && svn cp trunk tags/$npm_package_version",
					"svn:update": "cd svn && svn up",
					"test:e2e": "wp-scripts test-e2e",
					"test:unit": "wp-scripts test-unit-js",
					"tailwind:watch": "cross-env NODE_ENV=development postcss --config ./config/postcss.config.js ./src/assets/css/tailwind.css -o ./build/tailwind.css -w",
					"wp": "wp-env run cli wp",
					"zip": "bestzip ./$npm_package_config_slug.zip ./src ./class-plugin.php ./readme.txt ./LICENSE [ ./build ./languages ./includes ./vendor ]"
				},
				"devDependencies": {
					"@blockhandbook/block-hot-loader": "^1.2.0",
					"@fullhuman/postcss-purgecss": "^1.3.0",
					"@wordpress/env": "^1.0.1",
					"@wordpress/scripts": "^7.1.2",
					"bestzip": "^2.1.5",
					"cross-env": "^7.0.2",
					"postcss-cli": "^7.1.0",
					"postcss-prepend-selector": "^0.3.1",
					"replace-in-file": "^5.0.2"
				},
				"dependencies": {
					"classnames": "^2.2.6",
					"tailwindcss": "^1.2.0"
				}
			},
			isEmpty
		)
	);

	info( '' );
	info( 'Installing packages. It might take a couple of minutes.' );
	await command( 'npm install', {
		cwd,
	} );

	info( '' );
	info( 'Formatting JavaScript files.' );
	await command( 'npm run format:js', {
		cwd,
	} );

	info( '' );
	info( 'Compiling block.' );
	await command( 'npm run build', {
		cwd,
	} );
};