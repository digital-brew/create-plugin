
# PostsControls

InspectorControls for creating dynamic blocks:  
![PostsControls in the WordPress block editor sidebar](https://blockhandbook.com/wp-content/uploads/2020/05/PostsControls-Screenshot-1.png)

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
import { controls } from '@blockhandbook/controls';
const { PostsControls } = controls;

function Edit( props ) {
 const {
  setAttributes,
  attributes,
 } = props;

 return (
  <>
   <PostsControls
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
