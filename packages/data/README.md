# Data Utility Components for the WordPress block editor plugin

Utilities that make it easier to manage state for WordPress plugins built for the block editor.

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

**Get Post core data + Featured Media data + Author data**
withPosts() bundles the getEntityRecords, getMedia, & getAuthors data store selectors to return an array of post data ( content, title, url, etc. ) as well as post featured media and author data.

**Add attributes to get ANY post type**
withPosts() queries the 'posts' post type by default, but you can have it grab 'pages', custom post types, or any other post type you want by setting the postType default value in the attributes in your block.json file:

```
{
 "name": "plugin-name/dynamic-block",
 "attributes": {
  "postType": {
   "type": "string",
   "default": "page"
  },
 }
```

**How to use withPosts()**
All you need to do is import the withPosts HOC and then export your Edit component using the withPosts() HOC and you'll have access to the posts data in your edit.js function's props:

```
import { withPosts } from '@blockhandbook/data';

function Edit( props ) {
 const { posts } = props;

 return (
  <ul>
  {
   posts.map( ( post, i ) => (
    <li key={ i }>{ post.title.rendered }</li>
   ) )
  }
  </ul>
 );
}

export default withPosts( Edit );
```
