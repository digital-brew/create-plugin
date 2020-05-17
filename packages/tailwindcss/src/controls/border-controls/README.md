
# BorderControls

Toolbar & InspectorControls for adding border settings to blocks:
![BorderControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/Copy-of-BorderControls-Screenshot.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/block-name",
 "attributes": {
  "borderRadius": {
   "type": "object",
   "default": {
    "topLeft": 10,
    "bottomLeft": 10,
    "topRight": 10,
    "bottomRight": 10,
    "sync": true,
    "usePreset": true,
    "preset": "rounded-lg",
    "toolbar": true,
    "sidebar": true
   }
  },
  "borderWidth": {
   "type": "object",
   "default": {
    "top": 10,
    "bottom": 10,
    "left": 10,
    "right": 10,
    "sync": true,
    "usePreset": true,
    "preset": "border-0",
    "toolbar": true,
    "sidebar": true
   }
  },
  "borderStyle": {
   "type": "object",
   "default": {
    "style": "border-solid",
    "sidebar": true
   }
  },
  "borderColor": {
   "type": "object",
   "default": {
    "color": "#000000",
    "sidebar": true
   }
  },
 }
```

How to use it:

```javascript
import { tailwindcss } from '@blockhandbook/tailwindcss';
const { BorderControls } = tailwindcss;

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  attributes: {
   borderColor,
   borderRadius,
   borderStyle,
   borderWidth,
  },
 } = props;

 const containerClasses = classnames(
  `p-10 bg-white ${ borderStyle.style } overflow-hidden`,
  {
   [ `${ borderRadius.preset }` ]: borderRadius.usePreset,
   [ `${ borderWidth.preset }` ]: borderWidth.usePreset,
  }
 );

 const containerStyle = {
  borderColor: borderColor.color,
  borderRadius:
   ! borderRadius.usePreset ? `${ borderRadius.topLeft }px ${ borderRadius.topRight }px ${ borderRadius.bottomRight }px ${ borderRadius.bottomLeft }px` : null,
  borderWidth:
   ! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <BorderControls
    slug={ slug }
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

```text
initialOpen
```

Set border settings panel to initially open in sidebar.  Defaults to false.
