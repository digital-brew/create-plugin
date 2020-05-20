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
import { convertToRGB } from '../../utils/helpers';

const Edit = ( props ) => {
	const {
		attributes,
		className,
		setAttributes,
		attributes: {
			backgroundColor,
			backgroundImage,
			borderColor,
			borderRadius,
			borderStyle,
			borderWidth,
			boxShadow,
			margin,
			padding,
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

	const backgroundClasses = classnames( 
		`absolute w-full left-0 right-0 top-0 bottom-0 z-0 ${ backgroundImage.repeat } ${ backgroundImage.attachment } ${ backgroundImage.backgroundSize } ${ backgroundImage.position } ${ backgroundImage.opacity }`,
	);

	const rowClasses = classnames(
		`relative overflow-hidden ${ borderStyle.style }`,
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
		borderRadius: 
			! borderRadius.usePreset ? `${ borderRadius.topLeft }px ${ borderRadius.topRight }px ${ borderRadius.bottomRight }px ${ borderRadius.bottomLeft }px` : null,
		borderWidth: 
			! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
		boxShadow: 
			! boxShadow.usePreset ? `${ boxShadow.x }px ${ boxShadow.y }px ${ boxShadow.blur }px ${ boxShadow.spread }px rgba( ${ boxShadow.color }, ${ boxShadow.opacity / 100 } )` : null,	
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

	const selectVariation = ( variation ) => {
		const { name } = variation;
		let { attributes } = variation;

		attributes = {
			...attributes,
			variationName: name,
		};

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
				<div className={ backgroundClasses } style={ backgroundStyle }></div>		
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
