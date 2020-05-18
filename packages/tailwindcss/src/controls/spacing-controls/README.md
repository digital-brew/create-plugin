
# SpacingControls

Toolbar & InspectorControls for adding spacing settings to blocks:
![SpacingControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/SpacingControls-screenshot.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/block-name",
 "attributes": {
  "padding": {
   "type": "object",
   "default": {
    "top": 10,
    "bottom": 10,
    "left": 10,
    "right": 10,
    "sync": true,
    "usePreset": true,
    "preset": "p-16",
    "toolbar": true,
    "sidebar": true
   }
  },
  "margin": {
   "type": "object",
   "default": {
    "top": 10,
    "bottom": 10,
    "left": 10,
    "right": 10,
    "sync": true,
    "usePreset": true,
    "preset": "m-0",
    "toolbar": true,
    "sidebar": true
   }
  },
 }
```

How to use it:

```javascript
import { tailwindcss } from '@blockhandbook/tailwindcss';
const { SpacingControls } = tailwindcss;

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  attributes: {
   padding,
   margin,
  },
 } = props;

 const containerClasses = classnames(
  `p-10 bg-white`,
  {
   [ `${ padding.preset }` ]: padding.usePreset,
   [ `${ margin.preset }` ]: margin.usePreset,
  }
 );

 const containerStyle = {
  margin:
   ! margin.usePreset ? `${ margin.top }px ${ margin.right }px ${ margin.bottom }px ${ margin.left }px` : null,
  padding:
   ! padding.usePreset ? `${ padding.top }px ${ padding.right }px ${ padding.bottom }px ${ padding.left }px` : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <SpacingControls
    slug={ slug }
    initialOpen={ true }
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'SpacingControls example.',
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

Set spacing settings panel to initially open in sidebar.  Defaults to false.
