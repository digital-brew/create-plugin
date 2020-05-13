
# BorderControls

Toolbar & InspectorControls for adding border radius settings to blocks:
![BorderControls in the WordPress block editor sidebar](https://blockhandbook.com/wp-content/uploads/2020/05/PostsControls-Screenshot-1.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/dynamic-block",
 "attributes": {
  "borderRadius" : {
   "type": "string",
   "default": "rounded-xl"
  },
  "customBorderRadius": {
   "type": "number",
   "default": null
  },
  "useCustomBorderRadius" : {
   "type": "boolean",
   "default": false
  },
  "borderWidth" : {
   "type": "string",
   "default": "border-0"
  },
  "customBorderWidth": {
   "type": "number",
   "default": null
  },
  "useCustomBorderWidth" : {
   "type": "boolean",
   "default": false
  },
  "borderStyle" : {
   "type": "string",
   "default": "border-solid"
  },
  "borderColor" : {
   "type": "string"
  }
 }
```

How to use it:

```javascript
import { controls } from '@blockhandbook/controls';
const { PostsControls } = controls;

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  attributes: {
   borderColor,
   borderRadius,
   borderStyle,
   borderWidth,
   customBorderRadius,
   customBorderWidth,
   useCustomBorderRadius,
   useCustomBorderWidth,
  },
 } = props;

 const containerClasses = classnames(
  `${ borderStyle } overflow-hidden`,
  {
    [ `${ borderRadius }` ]: ! useCustomBorderRadius,
    [ `${ borderWidth }` ]: ! useCustomBorderWidth,
  } );

 const containerStyle = {
  borderColor,
  borderRadius: useCustomBorderRadius ? customBorderRadius : null,
  borderWidth: useCustomBorderWidth ? customBorderWidth : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <BorderControls
    slug={ slug }
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'BorderControls example.',
     'plugin-name'
    ) }
   </p>
  </div>
 );
}

export default Edit;
```
