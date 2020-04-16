# Hot Module Replacement for Blazing Fast Gutenberg Block Development
This is a collection of Hot Module Replacement utilities that make it easier to speed up your Gutenberg Block Development workflow.

The @blockhandbook/block-hot-loader npm package is coupled with browsersync and some webpack middleware to give you live reloading for php files and Hot Module Replacement for JS and CSS files.

Don't want to read or think through all this documentation?  We'll walk you through this entire setup in our FREE 6-Lesson Blazing Fast Block Development video course:
* [Take our FREE course](https://blockhandbook.com)
* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation
```
npm i @blockhandbook/block-hot-loader --save-dev
```
_This package assumes that your code will run in an ES2015+ environment._

## Setup
In order to get this working you're going to need a few things:

### Server + WordPress 
You'll need a local server setup up with WordPress installed.  Something like MAMP or Docker will do.

### Block Plugin
You'll need a Block Plugin with a file structure something like this:
```
plugin-name
├── build
├── src
│    ├── blocks
│    │   ├── block-1
│    │   │   └── index.js
│    │   ├── block-2
│    │   │   └── index.js
│    │   └── block-3
│    │       └── index.js
│    ├── plugins
│    ├── filters
│    ├── stores
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```

### package.json
I'm currently using this with the @wordpress/scripts package for block building scripts and the @wordpress/env package for a Docker block plugin development environment.  So here is an example package.json file.  

```
{
  "name": "block-handbook",
  "author": "Lee Shadle",
  "license": "ISC",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "npm run browser-sync",
    "browser-sync": "browser-sync start --config bs-config.js",
  },
  "devDependencies": {
    "@blockhandbook/block-hot-loader": "^1.2.2",
    "@wordpress/env": "^1.0.1",
    "@wordpress/scripts": "^7.1.2"    
  }
}
```

### webpack.config.js
You'll also need a webpack.config.js file. 

The important things to note are making sure you include the webpack.HotModuleReplacementPlugin as well as the output > publicPath to your build directory.  The HotModuleReplacementPlugin will also be installed by the @blockhandbook/block-hot-loader package.  

You can adjust HMR settings by adding them to the query string in the entry:
```
entry: {
	index: [
		path.resolve( process.cwd(), `src/index.js` ),
		*'webpack-hot-middleware/client?name=index&timeout=20000&reload=true&overlay=true'*
	],
	frontend: [
		path.resolve( process.cwd(), `src/frontend.js` ),
		*'webpack-hot-middleware/client?name=frontend&timeout=20000&reload=true&overlay=true'*
	],
},
```

I'm also going to assume you're using the @wordpress/scripts package.  This example webpack.config.js file takes that into account by importing the default WordPress webpack.config.js settings.

I've also included an entrypoint for any frontend rendered blocks, in case you want to use HMR to build and render blocks on the frontend. 

This example is also showing how to use the baked in SASS dependencies to compile SASS into editor.css & style.css build files.
```
const path = require( 'path' );
const webpack = require( 'webpack' );
const nodeEnv = process.env.NODE_ENV || 'development';
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Plugins

// Hot Module Replacement
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

// Compile block frontend and editor scss files into css files.
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const extractStyles = new ExtractTextPlugin( './style.css' );
const extractEditorStyles = new ExtractTextPlugin( './editor.css' );

// Remove LiveReloadPlugin if in development mode
const defaultPlugins = defaultConfig.plugins.map( ( plugin ) => {
	if ( plugin.constructor.name.includes( 'LiveReloadPlugin' ) ) {
		return false;
	}
	return plugin;
} ).filter( plugin => plugin );

const config = {
	...defaultConfig,
	mode: nodeEnv,
	devtool: 'source-map',
	entry: {
		index: [
			path.resolve( process.cwd(), `src/index.js` ),
			'webpack-hot-middleware/client?name=index&timeout=20000&reload=true&overlay=true'
		],
		frontend: [
			path.resolve( process.cwd(), `src/frontend.js` ),
			'webpack-hot-middleware/client?name=frontend&timeout=20000&reload=true&overlay=true'
		],
	},
	output: {
		publicPath: `/build/`,
		path: path.resolve( __dirname, `./build` ),
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
								sourceMap: true,								
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
								sourceMap: true,
							},
						},
					],
				} ),
			},			
		],
	},
	plugins: [
    ...defaultPlugins,
    extractStyles,
    extractEditorStyles,
    hotModuleReplacementPlugin
	],
};

module.exports = config;
```

### bs-config.js
We're almost there, this is kinda complicated if you didn't notice...

It's not too late to jump over and take our FREE 6-Lesson Blazing Fast Block Development video course:
* [Visit the BlockHandbook website](https://blockhandbook.com)
* [Follow us on Twitter](https://twitter.com/blockhandbook)

You'll also need to add a bs-config.js file.  This is just a browsersync config file that allows webpack and browsersync to work together.  You can just run this command in your root directory to generate a bs-config.js file:
```
browser-sync init
```

A lot of this is boilerplate bs-config.js stuff.

One of the important configurations of note is the ignore array where you can tell browsersync what directories to watch and what to ignore.  Since we're using webpack to write the build files and we're using HMR we'll want browsersync to ignore both the /build and /src directories.  This is the MAGIC of HMR.  However, browsersync will watch any php files for updates and any other files you're not ignoring and auto-reload the browser if for instance you update your php files.

You'll also want to make sure you're using the right proxy, so you may be using localhost:8888, make sure you change the proxy to localhost:8888.

The middleware config is where browsersync integrates with webpack.  Just take note of this, you shouldn't need to change anything but if that piece is missing no HMR for you.

Finally, when you kick off your HMR with 'npm run start' you'll be able to view everything at localhost:3000.  If you change this make sure you also change the port in the webpack.config.js file.

```
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );
const config = require( './webpack.config.js' );
const compiler = webpack( config );

module.exports = {
	ui: {
		port: 3001,
	},
	files: '**/*',
	watchEvents: [
		'change',
	],
	watch: true,
	ignore: [
    `./src`,
    `./build/index.js`,
    `./build/index.asset.php`,
    `./build/frontend.js`,
    `./build/frontend.asset.php`,
    './node_modules',
	],
	single: false,
	watchOptions: {
		ignoreInitial: true,
	},
	server: false,
	proxy: 'localhost:8888',
	port: 3000,
	middleware: [
		webpackDevMiddleware( compiler, {
			publicPath: config.output.publicPath,
			path: config.output.path,
			writeToDisk: ( ( filePath ) => {
				return /^(?!.*(hot)).*/.test( filePath );
			} ),
			stats: {
				colors: true,
			},
		} ),
		webpackHotMiddleware( compiler ),
	],
	serveStatic: [],
	ghostMode: {
		clicks: true,
		scroll: true,
		location: true,
		forms: {
			submit: true,
			inputs: true,
			toggles: true,
		},
	},
	logLevel: 'info',
	logPrefix: 'Browsersync',
	logConnections: false,
	logFileChanges: true,
	logSnippet: true,
	rewriteRules: [],
	open: 'local',
	browser: 'default',
	cors: false,
	xip: false,
	hostnameSuffix: false,
	reloadOnRestart: false,
	notify: false,
	scrollProportionally: true,
	scrollThrottle: 0,
	scrollRestoreTechnique: 'window.name',
	scrollElements: [],
	scrollElementMapping: [],
	reloadDelay: 0,
	reloadDebounce: 500,
	reloadThrottle: 0,
	plugins: [],
	injectChanges: true,
	startPath: null,
	minify: true,
	host: null,
	localOnly: false,
	codeSync: true,
	timestamps: true,
	clientEvents: [
		'scroll',
		'scroll:element',
		'input:text',
		'input:toggles',
		'form:submit',
		'form:reset',
		'click',
	],
	socket: {
		socketIoOptions: {
			log: false,
		},
		socketIoClientConfig: {
			reconnectionAttempts: 50,
		},
		path: '/browser-sync/socket.io',
		clientPath: '/browser-sync',
		namespace: '/browser-sync',
		clients: {
			heartbeatTimeout: 5000,
		},
	},
	tagNames: {
		less: 'link',
		scss: 'link',
		css: 'link',
		jpg: 'img',
		jpeg: 'img',
		png: 'img',
		svg: 'img',
		gif: 'img',
		js: 'script',
	},
	injectNotification: false,
};
```

## How to Use
Phew... After all that you can use these utilities for hot-reloading Blocks, Plugins, Filters and Stores for the WordPress Gutenberg editor.

### Blocks
For hot-reloading Blocks you'll want a file structure similar to the one below:
```
plugin-name
├── build
├── src
│    ├── blocks
│    │   ├── block-1
│    │   │   └── index.js
│    │   ├── block-2
│    │   │   └── index.js
│    │   └── block-3
│    │       └── index.js
│    ├── plugins
│    ├── filters
│    ├── stores
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the block's name and settings from each block's index.js file so it can be automatically reloaded:
```
const name = `plugin-name/block-1`;
const settings = {
	title: __( 'Block 1', 'plugin-name' ),
	description: __( 'Share good things people have to say about your products and services.', 'plugin-name' ),
	icon,
	category: slug,
	attributes,
	supports: {
		align: false,
	},
	// etc.
}

export { name, settings };
```
Finally, you'll add the hotBlockLoader function to your root ./src/index.js file.

You can use a different directory name by changing './blocks' to whatever directory name you used.  We've also included a registerBlocks function for non-HMR use ( production ):
```
import { hotBlockLoader, registerBlocks } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotBlockLoader( {
		getContext: () => require.context( './blocks', true, /index\.js$/ ),
		module,
	} );
} else {
	registerBlocks( {
		getContext: () => require.context( './blocks', true, /index\.js$/ ),
		module,
	} );
}
```
### Plugins
For hot-reloading Plugins you'll want a file structure similar to the one below:
```
plugin-name
├── build
├── src
│    ├── blocks
│    ├── plugins
│    │   ├── plugin-1
│    │   │   └── index.js
│    │   ├── plugin-2
│    │   │   └── index.js
│    │   └── plugin-3
│    │       └── index.js
│    ├── filters
│    ├── stores
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the plugins's name and settings from each plugin's index.js file so it can be automatically reloaded:
```
const name = 'plugin-name';
const settings = {
	icon: 'smiley',
	render: Plugin,
};
	// etc.
export { name, settings };
}
```
Finally, you'll add the hotPluginLoader function to your root ./src/index.js file.

You can use a different directory name by changing './plugins' to whatever directory name you used.  We've also included a registerBlocks function for non-HMR use ( production ):
```
import { hotPluginLoader, registerPlugins } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotPluginLoader( {
		getContext: () => require.context( './plugins', true, /index\.js$/ ),
		module,
	} );
} else {
	registerPlugins( {
		getContext: () => require.context( './plugins', true, /index\.js$/ ),
		module,
	} );
}
```
### Filters
For hot-reloading Filters you'll want a file structure similar to the one below:
```
plugin-name
├── build
├── src
│    ├── blocks
│    ├── plugins
│    ├── filters
│    │   ├── filter-1
│    │   │   └── index.js
│    │   ├── filter-2
│    │   │   └── index.js
│    │   └── filter-3
│    │       └── index.js
│    ├── stores
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the filter's name and an array of filters from each filter's index.js file so it can be automatically reloaded.  

Below is an example using the blocks.getBlockDefaultClassName filter:
```
const name = 'filter-default-class-name';
const filters = [
	{
		hookName: 'blocks.getBlockDefaultClassName',
		namespace: 'plugin-name/filter-default-class-name',
		functionName: filterDefaultClassName,
	},
];

export { name, filters };
```

Below is another example using the editor.BlockEditorSettings filter:
```
const name = 'filter-editor-settings';
const filters = [
	{
		hookName: 'editor.BlockEditorSettings',
		namespace: 'plugin-name/filter-editor-settings',
		functionName: filterEditorSettings,
	},
];

export { name, filters };
```

Finally, you'll add the hotFilterLoader function to your root ./src/index.js file.

You can use a different directory name by changing './plugins' to whatever directory name you used.  We've also included a registerFilters function for non-HMR use ( production ):
```
import { hotFilterLoader, registerFilters } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotFilterLoader( {
		getContext: () => require.context( './filters', true, /index\.js$/ ),
		module,
	} );
} else {
	registerFilters( {
		getContext: () => require.context( './filters', true, /index\.js$/ ),
		module,
	} );
}
```

### Stores
For hot-reloading Stores you'll want a file structure similar to the one below:
```
plugin-name
├── build
├── src
│    ├── blocks
│    ├── plugins
│    ├── filters
│    ├── stores
│    │   ├── store-1
│    │   │   └── index.js
│    │   ├── store-2
│    │   │   └── index.js
│    │   └── store-3
│    │       └── index.js
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the store's name and settings from each stores's index.js file so it can be automatically reloaded:
```
const name = 'store-name';
const settings = {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_PRICE':
				return {
					...state,
					prices: {
						...state.prices,
						[ action.item ]: action.price,
					},
				};

			case 'START_SALE':
				return {
					...state,
					discountPercent: action.discountPercent,
				};
		}

		return state;
	},
	actions,
	selectors,
	controls,
	resolvers,
};

export { name, settings };
```

Finally, you'll add the hotStoreLoader function to your root ./src/index.js file.

You can use a different directory name by changing './stores' to whatever directory name you used.  We've also included a registerStores function for non-HMR use ( production ):
```
import { hotStoreLoader, registerStores } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotStoreLoader( {
		getContext: () => require.context( './stores', true, /index\.js$/ ),
		module,
	} );
} else {
	registerStores( {
		getContext: () => require.context( './stores', true, /index\.js$/ ),
		module,
	} );
}
```

### Frontend
For hot-reloading frontend rendered Blocks.  Use this script if you want to use react to render blocks on the frontend.  STOKED about this... For hot-reloading frontend rendered blocks you'll want a file structure similar to the one below:

```
plugin-name
├── build
├── src
│    ├── blocks
│    │   ├── block-1
│    │   │   └── index.js
|    |   |   └── frontend.js
│    │   ├── block-2
│    │   │   └── index.js
|    |   |   └── frontend.js
│    │   └── block-3
│    │       └── index.js
│    ├── plugins
│    ├── filters
│    ├── stores
│    ├── index.js
│    └── frontend.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json

```
You'll need to export the block's name, an array of the block's frontend components, and the containers you want the block rendered in, in each block's frontend.js file so it can be automatically reloaded:

```
const name = `plugin-name/block-1`;
const blockContainers = document.querySelectorAll( '.blockContainer' );

const BlockComponent = ( props ) => {
	const {
		attributes: {
			title,
		}
	} = props;

	return(
		<h1>{ title }</h1>
	);
};

// you may have multiple blocks rendered on the same page,
// so you'll want to loop over all blockContainers and export
// the array of blocks and any of their associated attributes
let blocks = [];
blockContainers.forEach( ( blockContainer ) => {
	// in this example I'm passing all of the block's attributes
	// to the frontend as an html data attribute and then parsing
	// it to use the attribute data on the frontend
	const attributes = JSON.parse( blockContainer.dataset.attributes );

	blocks.push( <BlockComponent attributes={ attributes } /> )
} );

export { name, blocks, blockContainers };
```

You'd simply use the 'wp_enqueue_scripts' hook to enqueue the ./src/frontend.js file only on the frontend in your php.  I highly recommend using the wp-scripts package too, so then you can have the frontend WordPress dependencies automatically included as well by doing something like this in your php:

```
function enqueue_frontend_scripts() {
  // Register frontend scripts.
  // Dynamically load dependencies using frontend.asset.php generated by
  // @wordpress/dependency-extraction-webpack-plugin.
  $script_asset = require "$plugin_dir_path/build/frontend.asset.php";
  
  wp_enqueue_script(
  	$slug . '-script',
  	$plugin_dir_url . 'build/frontend.js',
  	$script_asset['dependencies'],
  	$script_asset['version'],
  	true
  );
}
add_action( 'wp_enqueue_scripts', 'enqueue_frontend_scripts' );
```

Finally, you'll add the hotFrontendLoader function to your root ./src/frontend.js file.  I didn't include this in the root index.js file b/c we're going to want to only enqueue this script on the frontend with php.

You can use a different directory name by changing './blocks' to whatever directory name you used.  We've also included a registerFrontend function for non-HMR use ( production ).  Here's what your src/frontend.js file would look like to add HMR for development and to autoload all frontend scripts in production:

```
import { hotFrontendLoader, registerFrontend } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotFrontendLoader( {
		getContext: () => require.context( './blocks', true, /frontend\.js$/ ),
		module,
	} );
} else {
	registerFrontend( {
		getContext: () => require.context( './blocks', true, /frontend\.js$/ ),
		module,
	} );
}
```