/**
 * External dependencies
 */
const { dirname, join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );
const { startCase, snakeCase } = require( 'lodash' );

/**
 * Internal dependencies
 */
const initWPScripts = require( './init-wp-scripts' );
const { animate, code, info, success } = require( './log' );
const { hasWPScriptsEnabled, getOutputFiles } = require( './templates' );

module.exports = async function(
	templateName,
	{
		namespace,
		slug,
		slug_,
		title,
		description,
		dashicon,
		category,
		author,
		authorEmail,
		authorURI,
		pluginURI,
		license,
		licenseURI,
		version,
		port,
	}
) {
	slug = slug.toLowerCase();
	namespace = namespace.toLowerCase();
	let phpClassName = startCase( namespace.replace( '-', ' ' ) ).replace( ' ', '' );

	info( '' );
	code( `Creating a new WordPress plugin in "${ slug }" folder.` );

	const view = {
		namespace,
		namespaceSnakeCase: snakeCase( namespace ),
		phpClassName,
		slug,
		slugSnakeCase: snakeCase( slug ),
		title,
		description,
		dashicon,
		category,
		version,
		author,
		authorEmail,
		authorURI,
		pluginURI,
		license,
		licenseURI,
		textdomain: namespace,
		port,
		testsPort: parseInt( port ) + 1,
	};
	await Promise.all(
		getOutputFiles( templateName ).map( async ( file ) => {
			const template = await readFile(
				join(
					__dirname,
					`templates/${ templateName }/${ file }.mustache`
				),
				'utf8'
			);
			// Output files can have names that depend on the slug provided.
			const outputFilePath = `${ slug }/${ file.replace(
				/\$slug/g,
				slug
			) }`;
			await makeDir( dirname( outputFilePath ) );
			writeFile( outputFilePath, render( template, view ) );
		} )
	);

	if ( hasWPScriptsEnabled( templateName ) ) {
		await initWPScripts( view );
	}

	info( '' );
	success(
		`Done: plugin "${ title }" bootstrapped in the "${ slug }" folder.`
	);
	if ( hasWPScriptsEnabled( templateName ) ) {
		info( '' );
		info( 'Inside that directory, you can run a bunch of commands:' );
		info( '' );
		code( '  $ npm run start' );
		info( '    Starts the build for development.' );
		info( '' );
		code( '  $ npm run build' );
		info( '    Builds the code for production.' );
		info( '' );
		code( '  $ npm run format:js' );
		info( '    Formats JavaScript files.' );
		info( '' );
		code( '  $ npm run lint:css' );
		info( '    Lints CSS files.' );
		info( '' );
		code( '  $ npm run lint:js' );
		info( '    Lints JavaScript files.' );
		info( '' );
		code( '  $ npm run packages-update' );
		info( '    Updates WordPress packages to the latest version.' );
		info( '' );
	}
	info( '' );
	info( `Server launched with your plugin installed!` );
	code( `  Go to localhost:${ port }` );
	info( '' );
	info( `Login at localhost:${ port }/wp-admin` );
	code( `  username: admin` );
	code( `  password: password` );
	info( '' );
	info( `Ready to start building?` );
	code( 'You can start by typing:' );
	code( `  $ cd ${ slug }` );
	code( `  $ npm run start` );
};