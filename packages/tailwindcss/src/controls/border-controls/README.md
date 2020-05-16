
# BorderControls

Toolbar & InspectorControls for adding border settings to blocks:
![BorderControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/Copy-of-BorderControls-Screenshot.png)

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
  "customBorderRadius": {
   "type": "object",
   "default": {
    "topLeft": 10,
    "bottomLeft": 10,
    "topRight": 10,
    "bottomRight": 10,
    "sync": true
   }
  },
  "borderWidth" : {
   "type": "string",
   "default": "border-0"
  },
  "customBorderWidth": {
   "type": "object",
   "default": {
    "top": 10,
    "bottom": 10,
    "left": 10,
    "right": 10,
    "sync": true
   }
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
import { BorderControls } from '@blockhandbook/tailwindcss';

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
  borderRadius: useCustomBorderRadius ? `${ customBorderRadius.topLeft }px ${ customBorderRadius.topRight }px ${ customBorderRadius.bottomRight }px ${ customBorderRadius.bottomLeft }px` : null,
  borderWidth: useCustomBorderWidth ? `${ customBorderWidth.top }px ${ customBorderWidth.right }px ${ customBorderWidth.bottom }px ${ customBorderWidth.left }px` : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <BorderControls
    slug={ slug }
    borderRadiusToolbar={ false }
    borderWidthTooblar={ false }
    initialOpen={ true }
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

## props available

```
borderRadiusToolbar
```

Show borderRadius settings in the toolbar.  Defaults to true.

```
borderWidthToolbar
```

Show borderWidth settings in the toolbar.  Defaults to true.

```
initialOpen
```

Set border settings panel to initially open in sidebar.  Defaults to false.
