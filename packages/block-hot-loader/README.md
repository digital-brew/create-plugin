# Hot Module Replacement for Blazing Fast Gutenberg Block Development
This is a collection of Hot Module Replacement utilities that make it easier to speed up your Gutenberg Block Development workflow.

## Installation
```
npm i @blockhandbook/block-hot-loader --save-dev
```
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
export const name = `myplugin/block-1`;
export const settings = {
	title: __( 'Block 1', 'myplugin' ),
	description: __( 'Share good things people have to say about your products and services.', 'myplugin' ),
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
