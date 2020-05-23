
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
  "postType": {
   "type": "string",
   "default": "post"
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

How to use it in edit.js.
If you want to give users the ability to select the postType to render, just pass an array of the postType's name & slug.  Keep in mind some postTypes have different data available, so you'll have to deal with that in your block.

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
    postTypes={ [
     { name: 'Custom Post Type', slug: 'custom_post_type_slug' },
     { name: 'Page', slug: 'page' },
     { name: 'Post', slug: 'post' }
    ] }
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'Hello from the editor!',
     'plugin-name'
    ) }
   </p>
  </>
 );
}

export default Edit;
```
