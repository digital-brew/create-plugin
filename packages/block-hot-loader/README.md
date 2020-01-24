# Hot Module Replacement for Blazing Fast Gutenberg Block Development
This is a collection of Hot Module Replacement utilities that make it easier to speed up your Gutenberg Block Development workflow.

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
│    └── index.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```

### package.json
I've currently got this working with browsersync, so here is an example package.json file.  The main things you'll need are the @blockhandbook/block-hot-loader, browser-sync, webpack, webpack-cli, webpack-dev-middleware, webpack-hot-middleware packages.  I've also left the babel and react stuff in there b/c I'm assuming you're going to need those as well:
```
{
  "name": "block-handbook",
  "author": "Lee Shadle",
  "license": "ISC",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "npm-run-all --parallel browser-sync",
    "browser-sync": "cross-env WRITE_TO_DISK=true PLUGIN_NAME=$npm_package_name browser-sync start --config bs-config.js",
  },
  "devDependencies": {
    "@babel/core": "^7.8.3",
    "@babel/plugin-proposal-object-rest-spread": "^7.8.3",
    "@babel/plugin-transform-react-jsx": "^7.8.3",
    "@babel/preset-env": "^7.8.3",
    "@babel/preset-react": "^7.8.3",
    "@blockhandbook/block-hot-loader": "^1.0.3",
    "babel-eslint": "^10.0.3",
    "babel-loader": "^8.0.6",
    "browser-sync": "^2.26.7",
    "cross-env": "^5.2.1",
    "css-loader": "^2.1.1",
    "npm-run-all": "^4.1.5",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-middleware": "^3.7.2",
    "webpack-hot-middleware": "^2.25.0"
  },
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-transform-react-jsx"
    ]
  }
}
```

### webpack.config.js
You'll also need a webpack.config.js file. 

The important things to note are making sure you include the webpack.HotModuleReplacementPlugin as well as the output > publicPath to your build directory.  You can adjust HMR settings by adding them to the query string in the entry > 'webpack-hot-middleware/...' item:
```
const path = require( 'path' );
const webpack = require( 'webpack' );
const nodeEnv = process.env.NODE_ENV || 'development';
const slug = process.env.PLUGIN_NAME;

// Plugins
// Hot Module Replacement
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

const config = {
	mode: nodeEnv,
	devtool: 'source-map',
	entry: [
		path.resolve( __dirname, `./src/index.js` ),
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true',
	],
	output: {
		publicPath: `/build/`,
		path: path.resolve( __dirname, `./build` ),
		filename: 'index.build.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [ /node_modules/ ],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							{
								plugins: [
									'@babel/plugin-transform-react-jsx',
								],
							},
						],
					},
				},
			},			
		],
	},
	plugins: [
		hotModuleReplacementPlugin,
	],
};

module.exports = config;
```

### bs-config.js
We're almost there, this is kinda complicated if you didn't notice.  You'll also need to add a bs-config.js file.  This is just a browsersync file that allows webpack and browsersync to work together.  Maybe I'll rollout a web-dev-server version someday...

A lot of this is boilerplate bs-config.js stuff.  You'll notice there's a WRITE_TO_DISK flag that allows you to write to disk or memory.  In theory it should run faster writing to memory.

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
// need to convert passed variable to boolean
const WRITE_TO_DISK = ( process.env.WRITE_TO_DISK === 'true' );
// if we need to write to disk then let's check for hot module updates and not write those
const writeToDisk = WRITE_TO_DISK ? ( ( filePath ) => {
	return /^(?!.*(hot)).*/.test( filePath );
} ) :
	false;

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
		`./build`,
		'./node_modules',
	],
	single: false,
	watchOptions: {
		ignoreInitial: true,
	},
	server: false,
	proxy: 'localhost:8000',
	port: 3000,
	middleware: [
		webpackDevMiddleware( compiler, {
			publicPath: config.output.publicPath,
			path: config.output.path,
			writeToDisk,
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
│    └── index.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the block's name and settings from each block's index.js file so it can be automatically reloaded:
```
export const name = `plugin-name/block-1`;
export const settings = {
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
│    └── index.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the plugins's name and settings from each plugin's index.js file so it can be automatically reloaded:
```
export const name = 'plugin-name';
export const settings = {
	icon: 'smiley',
	render: Plugin,
};
	// etc.
}
```
Finally, you'll add the hotPluginLoader function to your root ./src/index.js file.

You can use a different directory name by changing './plugins' to whatever directory name you used.  We've also included a registerBlocks function for non-HMR use ( production ):
```
import { hotBlockLoader, registerBlocks } from '@blockhandbook/block-hot-loader';

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
│    └── index.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the filter's name and an array of filters from each filter's index.js file so it can be automatically reloaded.  

Below is an example using the blocks.getBlockDefaultClassName filter:
```
export const name = 'filter-default-class-name';
export const filters = [
	{
		hookName: 'blocks.getBlockDefaultClassName',
		namespace: 'plugin-name/filter-default-class-name',
		functionName: filterDefaultClassName,
	},
];
```

Below is another example using the editor.BlockEditorSettings filter:
```
export const name = 'filter-editor-settings';
export const filters = [
	{
		hookName: 'editor.BlockEditorSettings',
		namespace: 'plugin-name/filter-editor-settings',
		functionName: filterEditorSettings,
	},
];
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
│    └── index.js
├── bs-config.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```
You'll need to export the store's name and settings from each stores's index.js file so it can be automatically reloaded:
```
export const name = 'store-name';
export const settings = {
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
```

Finally, you'll add the hotStoreLoader function to your root ./src/index.js file.

You can use a different directory name by changing './stores' to whatever directory name you used.  We've also included a registerPluginStores function for non-HMR use ( production ):
```
import { hotStoreLoader, registerPluginStores } from '@blockhandbook/block-hot-loader';

if ( module.hot ) {
	hotStoreLoader( {
		getContext: () => require.context( './stores', true, /index\.js$/ ),
		module,
	} );
} else {
	registerPluginStores( {
		getContext: () => require.context( './stores', true, /index\.js$/ ),
		module,
	} );
}
```