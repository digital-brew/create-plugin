# Data Utility Components for the WordPress block editor plugin

A library of utilities that make it easier to manage state for WordPress plugins built for the block editor.

* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation

```
npm i @blockhandbook/data --save-dev
```

_This package assumes that your code will run in an ES2015+ environment._  
_This package assumes you are using the @wordpress/scripts package._

* [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)

## Setup

Here's a little context. I'm going to assume you have a gutenberg block file structure something like this with your edit function in the edit.js file:

```
plugin-name
├── build
├── src
│    ├── blocks
│    │   ├── block-1
│    │   │   ├── block.json
│    │   │   ├── edit.js
│    │   │   └── index.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```

## Components

### withPosts()

Grabbing post data to create dynamic blocks is kinda complicated.  The withPosts() Higher Order Component (HOC) makes it a breeze to grab WordPress post type data.  

withPosts() bundles the getEntityRecords, getMedia, & getAuthors data store selectors to return an array of post data ( content, title, url, etc. ) as well as post featured media and author data.  
