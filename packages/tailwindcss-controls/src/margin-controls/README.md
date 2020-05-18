
# MarginControls

Toolbar & InspectorControls for adding margin settings to blocks:
![MarginControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/MarginControls-Screenshot.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/block-name",
 "attributes": {
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
const { MarginControls } = tailwindcss;

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  attributes: {
   margin,
  },
 } = props;

 const containerClasses = classnames(
  `p-10 bg-white`,
  {
   [ `${ margin.preset }` ]: margin.usePreset,
  }
 );

 const containerStyle = {
  margin:
   ! margin.usePreset ? `${ margin.top }px ${ margin.right }px ${ margin.bottom }px ${ margin.left }px` : null,
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
   <MarginControls
    slug={ slug }
    initialOpen={ true }
    attributes={ attributes }
    setAttributes={ setAttributes }
   />
   <p className={ className }>
    { __(
     'MarginControls example.',
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
