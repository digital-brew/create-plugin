# Control components for WordPress plugins built for the block editor

A library of components for creating common InspectorControls and BlockControls patterns for WordPress plugins built for the block editor.

* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation

```
npm i @blockhandbook/controls --save-dev
```

_This package assumes that your code will run in an ES2015+ environment._  
_This package assumes you are using the @wordpress/scripts package._

* [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)

## Components

### PostsControls

InspectorControls for creating dynamic blocks:  
![PostsControls in the WordPress block editor sidebar](https://blockhandbook.com/wp-content/uploads/2020/05/Screen-Shot-2020-05-05-at-6.20.05-PM.png)

Add the following attributes to block.json:

```
{
 "name": "plugin-name/dynamic-block",
 "attributes": {
  "categories": {
   "type": "array"
  },
  "postsToShow": {
   "type": "number",
   "default": 10
  },
  "order": {
   "type": "string",
   "default": "desc"
  },
  "orderBy": {
   "type": "string",
   "default": "date"
  },
  "showPostAuthor": {
   "type": "boolean",
   "default": true
  },
  "showPostDate": {
   "type": "boolean",
   "default": true
  },
  "showPostExcerpt": {
   "type": "boolean",
   "default": true
  },
  "showFeaturedImage": {
   "type": "boolean",
   "default": false
  },
  "featuredImageSize": {
   "type": "string",
   "default": "medium_large"
  },
  "showPostTitle": {
   "type": "boolean",
   "default": true
  }
 }
```

How to use it in edit.js:

```
import { PostControls } from '@blockhandbook/controls';

function Edit( props ) {
 const {
  setAttributes,
  attributes,
 } = props;

 return (
  <>
   <PostControls
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'ESNext Example – hello from the editor!',
     'create-plugin'
    ) }
   </p>
  </>
 );
}

export default Edit;
```
