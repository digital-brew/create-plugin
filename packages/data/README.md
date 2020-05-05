# Data Utility Components for the WordPress block editor plugin

Utilities that make it easier to manage state for WordPress plugins built for the block editor.

* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation

```
npm i @blockhandbook/data --save-dev
```

_This package assumes that your code will run in an ES2015+ environment._

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

### withPosts

Grabbing post data to create dynamic blocks is kinda complicated.  The withPosts Higher Order Component makes it a breeze to grab WordPress post data.

All you need to do is import the withPosts HOC and then export your Edit component using the withPosts() HOC and you'll have access to the posts data in the props:

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
