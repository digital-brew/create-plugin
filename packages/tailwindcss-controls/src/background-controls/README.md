
# BackgroundControls

Toolbar & InspectorControls for adding background settings to blocks:
![BackgroundControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/BackgroundControls-Screenshot.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/block-name",
 "attributes": {
  "backgroundImage": {
   "type": "object",
   "default": {
    "id": null,
    "url": null,
    "size": null,
    "customSize": false,
    "attachment": "bg-scroll",
    "repeat": "bg-no-repeat",
    "backgroundSize": "bg-cover",
    "position": "bg-center",
    "opacity": "bg-100",
    "focalPoint":{
     "x": 0.5,
     "y": 0.5
    },
    "toolbar": true,
    "sidebar": true
   }
  },
  "backgroundColor": {
   "type": "object",
   "default": {
    "color":"#ffffff",
    "opacity":"bg-100",
    "sidebar": true
   }
  },
  },
 }
```

How to use it:

```javascript
/**
 * External Dependencies
 */
import classnames from 'classnames';
import { tailwindcssControls } from '@blockhandbook/tailwindcss-controls';
const { BackgroundControls } = tailwindcssControls;

/**
 * Module Constants
 */
const TEMPLATE = [
 [
  'core/heading',
  {
   /* translators: content placeholder */
   placeholder: __( 'Testimonial', 'esnext-example' ),
   /* translators: content placeholder */
   content: __( 'I am obsessed with building blocks!', 'esnext-example' ),
   level: 3,
   className: 'mt-8',
  },
 ],
 [
  'core/paragraph',
  {
   /* translators: content placeholder */
   placeholder: __( 'Author\'s name', 'esnext-example' ),
   /* translators: content placeholder */
   content: __( 'Lee Shadle', 'esnext-example' ),
   fontSize: 'regular',
   className: 'mb-0',
  },
 ],
 [
  'core/paragraph',
  {
   /* translators: content placeholder */
   placeholder: __( 'Author\'s position', 'esnext-example' ),
   /* translators: content placeholder */
   content: __( 'Teacher @ blockhandbook.com', 'esnext-example' ),
   fontSize: 'small',
   customTextColor: '#bbb',
   className: 'mb-0',
  },
 ],
];

export const hexToRGB = ( hex ) => {
 // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
 const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
 hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
  return r + r + g + g + b + b;
 } );

 const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
 return result ? {
  r: parseInt( result[ 1 ], 16 ),
  g: parseInt( result[ 2 ], 16 ),
  b: parseInt( result[ 3 ], 16 ),
 } : null;
};

export const convertToRGB = ( color ) => {
 let rgb = hexToRGB( color );
 rgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;
 return rgb;
};

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
  className,
  attributes: {
   backgroundColor,
   backgroundImage,
  },
 } = props;

 const rowClasses = classnames(
  `relative`,
 );

 const backgroundClasses = classnames(
  `absolute w-full left-0 right-0 top-0 bottom-0 z-0 ${ backgroundImage.repeat } ${ backgroundImage.attachment } ${ backgroundImage.backgroundSize } ${ backgroundImage.position } ${ backgroundImage.opacity }`,
 );

const rowStyle = {
  backgroundColor:
  `rgba( ${ convertToRGB( backgroundColor.color ) }, ${ parseInt( backgroundColor.opacity.replace( 'opacity-', '' ) ) / 100 } )`,
 };

 const backgroundStyle = {
  backgroundSize:
   backgroundImage.customSize ? `${ backgroundImage.size }px` : null,
  backgroundPosition:
   backgroundImage.customSize ? `${ backgroundImage.focalPoint.x * 100 }% ${ backgroundImage.focalPoint.y * 100 }%` : null,
  backgroundImage:
   `url( ${ backgroundImage.url } )`,
 }

 return (
  <div className={ className } style={ containerStyle }>
   <div className={ rowClasses } style={ rowStyle }>
    <div className={ backgroundClasses } style={ backgroundStyle }></div>  
    <BackgroundControls
     className={ className }
     attributes={ attributes }
     setAttributes={ setAttributes }
    />
    <InnerBlocks
     allowedBlocks={ [ 'core/paragraph', 'core/heading' ] }
     template={ TEMPLATE }
     templateLock={ true }
    />
   </div>
  </div>
 );
}

export default Edit;
```

## props available

```text
initialOpen
```

Set background settings panel to initially open in sidebar.  Defaults to false.
