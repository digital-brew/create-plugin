# Easily add Tailwindcss to a WordPress block editor plugin

This is a collection of utilities that make it easy to add Tailwindcss to your WordPress block editor plugin.

* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation

```bash
npm i @blockhandbook/tailwindcss --save-dev
```

_This package assumes that your code will run in an ES2015+ environment._

## Setup

Add postcss.config.js, tailwind.config.js, & a package.json file to your root directory:

```bash
touch postcss.config.js && touch tailwind.config.js && npm init
```

Add an assets directory in src, a css directory in assets, and create a tailwind.css file:

```none
plugin-name
├── build
├── src
│    ├── assets
│    |   └── css
│    |       └── tailwind.css
│    └── blocks
│        └── block
│            └── index.js
├── plugin-name.php
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

Add the following to the tailwind.css file ( I leave the @tailwind base styles out but you can uncomment those if you want them ):

```css
/*
 tailwindcss styles and custom components
*/
/* @tailwind base; */

@tailwind components;

@tailwind utilities;
```

Set your postcss configurations in postcss.config.js.  Add your plugin slug in the postcssPrependSelector selector key.  This will allow you to use ANY tailwindcss classes scoped to your custom build gutenberg blocks without them leaking to the rest of the page.  Also, if you put your tailwind.config.js file in a different directory, you'll want to update that here too:

```javascript
const tailwindcss = require( 'tailwindcss' );
const autoprefixer = require( 'autoprefixer' );

const postcssPrependSelector = require( 'postcss-prepend-selector' )( {
 selector: '[class*="plugin-slug"] ',
} );

module.exports = {
 plugins: [
  tailwindcss( './tailwind.config.js' ),
  postcssPrependSelector,
  autoprefixer,
 ],
};
```

Add tailwindcss configurations in the tailwind.config.js file.  Change the purge > content array if you're using a different file structure:

```javascript
const nodeEnv = process.env.NODE_ENV;

const config = {
 theme: {},
 variants: {},
 purge: {
  enabled: nodeEnv === 'production' ? true : false,
  content: [
   './src/**/*.js',
  ],
 },
 plugins: [
  require( 'tailwindcss' ),
  require( 'autoprefixer' )
 ],
};

module.exports = config;

```

Finally, add a build and start script to your package.json.  I'm going to assume you're using @wordpress/scripts for starting/building your plugin:

```json
{
 "name": "plugin-name",
 "scripts": {
   "start": "wp-scripts start & npm run tailwind:watch",
   "build": "wp-scripts build && npm run tailwind:build",
   "tailwind:watch":"cross-env NODE_ENV=development postcss --config ./postcss.config.js ./src/assets/css/tailwind.css -o ./build/tailwind.css -w",
   "tailwind:build":"cross-env NODE_ENV=production postcss --config ./postcss.config.js ./src/assets/css/tailwind.css -o ./build/tailwind.css"
 }
}
```

The [classnames](https://www.npmjs.com/package/classnames) package is baked in so you can conditionally include/exclude tailwindcss classes.  I particularly love using it for providing preset stylings for properties such as boxShadow, borderRadius, borderWidth, etc.:

```javascript
const rowClasses = classnames(
  `p-10 bg-white ${ borderStyle.style } overflow-hidden`,
  {
   [ `${ borderRadius.preset }` ]: borderRadius.usePreset,
   [ `${ borderWidth.preset }` ]: borderWidth.usePreset,
   [ `${ boxShadow.preset }` ]: boxShadow.usePreset,
  }
 );
```

## Usage

To use in development run:

```bash
npm run start
```

To use in production run:

```bash
npm run build
```

## Controls

A handful of common controls are bundled in this package:

### BoxShadowControls

Toolbar & InspectorControls for adding box shadow settings to blocks:
![BoxShadowControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/BoxShadowControls-screenshot.png)
[Documentation](https://github.com/blockhandbook/create-plugin/tree/master/packages/tailwindcss/src/controls/box-shadow-controls)

### BorderControls

Toolbar & InspectorControls for adding border settings to blocks:
![BorderControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/Copy-of-BorderControls-Screenshot.png)
[Documentation](https://github.com/blockhandbook/create-plugin/tree/master/packages/tailwindcss/src/controls/border-controls)

### MarginControls

Toolbar & InspectorControls for adding margin settings to blocks:
![MarginControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/MarginControls-Screenshot.png)
[Documentation](https://github.com/blockhandbook/create-plugin/tree/master/packages/tailwindcss/src/controls/margin-controls)

### PaddingControls

Toolbar & InspectorControls for adding padding settings to blocks:
![BorderControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/PaddingControls-screenshot.png)
[Documentation](https://github.com/blockhandbook/create-plugin/tree/master/packages/tailwindcss/src/controls/padding-controls)

### SpacingControls

Toolbar & InspectorControls for adding spacing settings to blocks:
![SpacingControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/SpacingControls-screenshot.png)
[Documentation](https://github.com/blockhandbook/create-plugin/tree/master/packages/tailwindcss/src/controls/spacing-controls)
