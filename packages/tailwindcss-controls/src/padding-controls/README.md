
# PaddingControls

Toolbar & InspectorControls for adding padding settings to blocks:
![BorderControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/PaddingControls-screenshot.png)

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
 }
```

How to use it:

```javascript
import { tailwindcssControls } from '@blockhandbook/tailwindcss-controls';
const { PaddingControls } = tailwindcssControls;

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  attributes: {
   padding,
  },
 } = props;

 const containerClasses = classnames(
  `bg-white`,
  {
   [ `${ padding.preset }` ]: padding.usePreset,
  }
 );

 const containerStyle = {
  padding:
   ! padding.usePreset ? `${ padding.top }px ${ padding.right }px ${ padding.bottom }px ${ padding.left }px` : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <PaddingControls
    slug={ slug }
    initialOpen={ true }
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'PaddingControls example.',
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
