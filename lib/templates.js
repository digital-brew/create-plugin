/**
 * Internal dependencies
 */
const CLIError = require( './cli-error' );
const prompts = require( './prompts' );

const namespace = 'create-plugin';
const dashicon = 'smiley';
const category = 'common';
const author = 'The WordPress Contributors';
const license = 'GPL-2.0-or-later';
const licenseURI = 'https://www.gnu.org/licenses/gpl-2.0.html';
const authorURI = 'https://wordpress.org/';
const authorEmail = 'yourname@yourwebsite.com';
const pluginURI = 'https://wordpress.org/plugins/';
const version = '0.1.0';
const port = 8888;
const testsPort = 8889;

const templates = {
	es5: {
		defaultValues: {
			namespace,
			slug: 'es5-example',
			title: 'ES5 Example',
			description:
				'Example block written with ES5 standard and no JSX – no build step required.',
			dashicon,
			category,
			author,
			license,
			licenseURI,
			authorEmail,
			authorURI,
			pluginURI,
			version,
			port,
			testsPort,
		},
		outputFiles: [
			'.editorconfig',
			'index.js',
			'class-plugin.php',
			'readme.txt',
			'composer.json',
			'wp-env.json',
			'LICENSE'
		],
	},
	esnext: {
		defaultValues: {
			namespace,
			slug: 'esnext-example',
			title: 'ESNext Example',
			description:
				'Example block written with ESNext standard and JSX support – build step required.',
			dashicon,
			category,
			author,
			authorEmail,
			license,
			licenseURI,
			authorURI,
			pluginURI,
			version,
			port,
			testsPort
		},
		outputFiles: [
			'.editorconfig',
			'.gitignore',
			'src/index.js',
			'src/assets/css/tailwind.css',
			'src/assets/img/img.png',
			'src/assets/scss/common.scss',
			'src/blocks/block-1/block.json',
			'src/blocks/block-1/controls.js',
			'src/blocks/block-1/deprecated.js',
			'src/blocks/block-1/edit.js',
			'src/blocks/block-1/editor.scss',
			'src/blocks/block-1/icon.js',
			'src/blocks/block-1/index.js',
			'src/blocks/block-1/save.js',
			'src/blocks/block-1/transforms.js',
			'src/plugins/plugin/index.js',
			'src/filters/filter/index.js',
			'src/stores/store/index.js',
			'src/utils/register-categories.js',
			'src/utils/icons.js',
			'config/bs-config.js',
			'config/postcss.config.js',
			'config/replace.config.js',
			'config/tailwind.config.js',
			'config/webpack.dev.js',
			'config/webpack.prod.js',
			'includes/class-load-translations.php',
			'includes/class-register-blocks.php',	
			'class-plugin.php',
			'readme.txt',
			'composer.json',
			'wp-env.json',
			'LICENSE'
		],
		wpScriptsEnabled: true,
	},
};

const getTemplate = ( templateName ) => {
	if ( ! templates[ templateName ] ) {
		throw new CLIError(
			`Invalid template type name. Allowed values: ${ Object.keys(
				templates
			).join( ', ' ) }.`
		);
	}
	return templates[ templateName ];
};

const getDefaultValues = ( templateName ) => {
	return getTemplate( templateName ).defaultValues;
};

const getOutputFiles = ( templateName ) => {
	return getTemplate( templateName ).outputFiles;
};

const getPrompts = ( templateName ) => {
	const defaultValues = getDefaultValues( templateName );
	return Object.keys( prompts ).map( ( promptName ) => {
		return {
			...prompts[ promptName ],
			default: defaultValues[ promptName ],
		};
	} );
};

const hasWPScriptsEnabled = ( templateName ) => {
	return getTemplate( templateName ).wpScriptsEnabled || false;
};

module.exports = {
	getDefaultValues,
	getOutputFiles,
	getPrompts,
	hasWPScriptsEnabled,
};