# withPosts()

Grabbing post data to create dynamic blocks is kinda complicated.  The withPosts() Higher Order Component (HOC) makes it a breeze to grab WordPress post type data.  
  
### Post data + Featured Media data + Author data

withPosts() bundles the getEntityRecords, getMedia, & getAuthors data store selectors to return an array of post data ( content, title, url, etc. ) as well as post featured media and author data.  
  
### Get any post type using attributes  

withPosts() queries the 'posts' post type by default, but you can have it grab 'pages', custom post types, or any other post type you want by setting the postType default value in the attributes in your block.json file:

```
{
 "name": "plugin-name/dynamic-block",
 "attributes": {
  "postType": {
  "type": "string",
  "default": "page"
  }
 }
}
```
  
### How to use

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
