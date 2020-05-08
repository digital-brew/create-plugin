const pkg = require( '../package.json' );

// Any from Regular expressions that require variables
const projectIdRegexFrom = new RegExp(
	'(Project-Id-Version: ' + pkg.config.pluginName + ' )[0-9.]+',
	'g'
);

// All 'from' regex's
const from = [
	/Plugin Name:(\s*?)["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!])\n)+/m,
	/=== (\s*?)["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]) ===\n)+/m,
	/^(\*\*|)Stable tag:(\*\*|)(\s*?)[a-zA-Z0-9.-]+(\s*?)$/im,
	/Tested up to:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
	projectIdRegexFrom,
	/Version:(\s*?)[0-9\.]+$/m,
	/Contributors:(\s*?)[a-zA-Z0-9\,\s\-\+]+$/m,
	/Tags:(\s*?)[a-zA-Z0-9\,\s\-\+]+$/m,
	/Text Domain:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
	/Author:(\s*?)[a-zA-Z0-9.-]+(\s*?)[a-zA-Z0-9.-]+/m,
	/Author URI:(\s*?)https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/m,
	/Plugin URI:(\s*?)https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/m,
	/Description:(\s*?)["’]?[A-Z][^.?!]+((?![.?!][’"]?\s["’]?[A-Z][^.?!]).)+[.?!’"]+/m,
	/namespace(\s*?)[-a-zA-Z0-9@:%._\+~#=]+/m,
	/@package(\s*?)[-a-zA-Z0-9@:%._\+~#=]+/m,
	/\$this->slug(\s*?)=(\s*?)'[a-zA-Z0-9.-]+'/m,
	/\$this->text_domain(\s*?)=(\s*?)'[a-zA-Z0-9.-]+'/m,
	/\$this->version(\s*?)=(\s*?)'[a-zA-Z0-9.-]+'/m,
	/SLUG:(\s*?)[a-zA-Z0-9\,\s\-\+]+$/m,
];
// All 'to' regex's
// These are sequentially listed and correspond to the same place in the 'from'
const to = [
	() => `Plugin Name: ${ pkg.config.pluginName }\n`,
	() => `=== ${ pkg.config.pluginName } ===\n`,
	() => `Stable tag: ${ pkg.version }`,
	() => `Tested up to: ${ pkg.config.testedUpTo }`,
	() => `Project-Id-Version: ${ pkg.config.pluginName } ${ pkg.version }`,
	() => `Version: ${ pkg.version }`,
	() => `Contributors: ${ pkg.config.contributors }`,
	() => `Tags: ${ pkg.config.tags }`,
	() => `Text Domain: ${ pkg.config.textdomain }`,
	() => `Author: ${ pkg.author }`,
	() => `Author URI: ${ pkg.config.authorUri }`,
	() => `Plugin URI: ${ pkg.config.pluginUri }`,
	() => `Description: ${ pkg.description }`,
	() => `namespace ${ pkg.config.namespace }`,
	() => `@package ${ pkg.config.namespace }`,
	() => `$this->slug           = '${ pkg.config.slug }'`,
	() => `$this->text_domain    = '${ pkg.config.textdomain }'`,
	() => `$this->version        = '${ pkg.version }'`,
	() => `SLUG: ${ pkg.config.slug }`,
];

// Loop through all pkg.config.replace items and add them to the 'from' array
// Simultaneously push the new pkg.config value to the 'to' array
// We can easily do this b/c we used the same key in the pkg.config.from
// To add a value to be changed add a key to pkg.config and then a
// corresponding key to pkg.config.replace
for ( const [ key, value ] of Object.entries( pkg.config.replace ) ) {
	from.push( new RegExp( `${ value }`, 'g' ) );
	to.push( pkg.config[ key ] );
}

// replaces from and to sequentially
const config = {
	files: [
		'./readme.txt',
		`./languages/${ pkg.name }.pot`,
		`./class-plugin.php`,
		`./includes/*.php`,
		`./src/**/*.*`,
		`./config/postcss.config.js`,
		`./composer.json`,
		`./.github/workflows/*.*`,
	],
	from,
	to,
	countMatches: true,
};

module.exports = config;
