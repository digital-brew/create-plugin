
# PostsControls

InspectorControls for creating dynamic blocks:  
![PostsControls in the WordPress block editor sidebar](https://blockhandbook.com/wp-content/uploads/2020/05/PostsControls-Screenshot-1.png)

Add the following attributes to block.json:
**NOTE - the default taxonomy is 'categories', but you can set a custom taxonomy by adding it to the block attributes.  ONLY set this if you're filtering 1 postType as most postType's have unique taxonomies ( working on addressing this ).**
**NOTE - the default postType is 'post', but you can set a custom postType by adding it to the block attributes.**

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
  "taxonomy": {
   "type": "string",
   "default": "custom_taxonomy"
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

You can also show/hide the following controls:
titleToggle, dateToggle, authorToggle, excerptToggle, featuredImageToggle, categorySelector

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
    titleToggle={ false }
    dateToggle={ false }
    authorToggle={ false }
    excerptToggle={ false }
    featuredImageToggle={ false }
    categorySelector={ false }
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
