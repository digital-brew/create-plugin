/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, __experimentalBlockVariationPicker } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './editor.scss';
import './style.scss';
import { variations } from './variations';

const hexToRgb = ( hex ) => {
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

const convertToRGB = ( color ) => {
	let rgb = hexToRgb( color );
	rgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;
	return rgb;
};

const Edit = ( props ) => {
	const {
		attributes,
		className,
		setAttributes,
		attributes: {
			backgroundColor,
			backgroundImage,
			backgroundOpacity,
			borderColor,
			borderRadius,
			borderStyle,
			borderWidth,
			boxShadow,
			padding,
			margin,
			variationName,
		}
	} = props;

	const variationTemplate = variations.find( ( variation ) => {
		const { name } = variation;
		if( name === variationName ) {
			return variation;
		}
		return false;
	} );

	const rowClasses = classnames(
		`${ backgroundImage.repeat } ${ backgroundImage.attachment } ${ backgroundImage.backgroundSize } ${ borderStyle.style } ${ backgroundImage.position } overflow-hidden`,
		{
			[ `${ borderRadius.preset }` ]: borderRadius.usePreset,
			[ `${ borderWidth.preset }` ]: borderWidth.usePreset,
			[ `${ boxShadow.preset }` ]: boxShadow.usePreset,
			[ `${ padding.preset }` ]: padding.usePreset,
			[ `${ margin.preset }` ]: margin.usePreset,
		}
	);

	const containerStyle = {
		'--tw-box-shadow-color': boxShadow.color,
	}

	const rowStyle = {
		borderColor: borderColor.color,
		margin: 
			! margin.usePreset ? `${ margin.top }px ${ margin.right }px ${ margin.bottom }px ${ margin.left }px` : null,
		padding: 
			! padding.usePreset ? `${ padding.top }px ${ padding.right }px ${ padding.bottom }px ${ padding.left }px` : null,
		backgroundSize: 
			backgroundImage.customSize ? `${ backgroundImage.size }px` : null,
		backgroundPosition: 
			backgroundImage.customSize ? `${ backgroundImage.focalPoint.x * 100 }% ${ backgroundImage.focalPoint.y * 100 }%` : null,
		
		background: 
			`linear-gradient( rgba( ${ convertToRGB( backgroundColor.color ) }, ${ parseInt( backgroundImage.opacity.replace( 'opacity-', '' ) ) / 100 } ), rgba( ${ convertToRGB( backgroundColor.color ) }, ${ parseInt( backgroundImage.opacity.replace( 'opacity-', '' ) ) / 100 } ) ), url( ${ backgroundImage.url } ) ${ backgroundImage.position.replace( 'bg-', '') }/${ backgroundImage.backgroundSize.replace( 'bg-', '') } ${ backgroundImage.repeat.replace( 'bg-', '') } ${ backgroundImage.attachment.replace( 'bg-', '') }`,
		backgroundColor: `rgba( ${ convertToRGB( backgroundColor.color ) }, ${ parseInt( backgroundColor.opacity.replace( 'opacity-', '' ) ) / 100 } )`,
		borderRadius: 
			! borderRadius.usePreset ? `${ borderRadius.topLeft }px ${ borderRadius.topRight }px ${ borderRadius.bottomRight }px ${ borderRadius.bottomLeft }px` : null,
		borderWidth: 
			! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
		boxShadow: 
			! boxShadow.usePreset ? `${ boxShadow.x }px ${ boxShadow.y }px ${ boxShadow.blur }px ${ boxShadow.spread }px rgba( ${ boxShadow.color }, ${ boxShadow.opacity / 100 } )` : null
	};

	const selectVariation = ( variation ) => {
		const { name } = variation;
		let { attributes } = variation;

		attributes = {
			...attributes,
			variationName: name,
		};
		console.log( attributes )
		setAttributes( attributes );
	}

	if( ! variationName ) {
		return(
			<__experimentalBlockVariationPicker
				variations={ variations }
				instructions={ __( 'Select a variation', 'esnext-example' ) }
				onSelect={ ( variation ) => selectVariation( variation ) }
			/>
		);
	}

	return (
		<div className={ className } style={ containerStyle }>			
			<div className={ rowClasses } style={ rowStyle }>
				<Controls
					className={ className }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<InnerBlocks
					allowedBlocks={ [ 'core/paragraph', 'core/heading' ] }
					template={ variationTemplate.innerBlocks }
					templateLock={ true }
				/>
			</div>
		</div>		
	);
}

export default Edit;
