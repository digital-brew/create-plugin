# Hot Module Replacement for Blazing Fast Gutenberg Block Development
This is a collection of Hot Module Replacement utilities that make it easier to speed up your Gutenberg Block Development workflow.

## Installation
```
npm i @blockhandbook/block-hot-loader --save-dev
```
_This package assumes that your code will run in an ES2015+ environment._

## How to Use
You can currently use these utitlies for hot-reloading Blocks, Plugins, Filters and Stores for the WordPress Gutenberg editor.

### Blocks
For hot-reloading Blocks you'll want a file structure similar to the one below:
```
src
├── blocks
│   ├── block-1
│   │   └── index.js
│   ├── block-2
│   │   └── index.js
│   └── block-3
│       └── index.js
└── index.js
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
src
├── plugins
│   ├── plugin-1
│   │   └── index.js
│   ├── plugin-2
│   │   └── index.js
│   └── plugin-3
│       └── index.js
└── index.js
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
src
├── filters
│   ├── filter-1
│   │   └── index.js
│   ├── filter-2
│   │   └── index.js
│   └── filter-3
│       └── index.js
└── index.js
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
src
├── stores
│   ├── store-1
│   │   └── index.js
│   ├── store-2
│   │   └── index.js
│   └── store-3
│       └── index.js
└── index.js
```
You'll need to export the store's name and an array of filters from each filter's index.js file so it can be automatically reloaded:
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