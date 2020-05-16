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

const Edit = ( props ) => {
	const {
		attributes,
		className,
		setAttributes,
		attributes: {
			borderColor,
			borderRadius,
			borderStyle,
			borderWidth,
			boxShadow,
			boxShadowColor,
			customBorderRadius,
			customBorderWidth,
			customBoxShadow,
			useCustomBorderRadius,
			useCustomBorderWidth,
			useCustomBoxShadow,
			variationName,
		}
	} = props;

	console.log( boxShadowColor, useCustomBoxShadow, customBoxShadow)

	const template = variations.find( ( variation ) => {
		const { name } = variation;
		if( name === variationName ) {
			return variation;
		}
		return false;
	} );

	const rowClasses = classnames(
		`p-10 bg-white ${ borderStyle } overflow-hidden`,
		{
			[ `${ borderRadius }` ]: ! useCustomBorderRadius,
			[ `${ borderWidth }` ]: ! useCustomBorderWidth,
			[ `${ boxShadow }` ]: ! useCustomBoxShadow,
		} 
	);

	const containerStyle = {
		'--tw-box-shadow-color': boxShadowColor,
	}

	const rowStyle = {
		borderColor,
		borderRadius: useCustomBorderRadius ? `${ customBorderRadius.topLeft }px ${ customBorderRadius.topRight }px ${ customBorderRadius.bottomRight }px ${ customBorderRadius.bottomLeft }px` : null,
		borderWidth: useCustomBorderWidth ? `${ customBorderWidth.top }px ${ customBorderWidth.right }px ${ customBorderWidth.bottom }px ${ customBorderWidth.left }px` : null,
		boxShadow: useCustomBoxShadow ? `${ customBoxShadow.x }px ${ customBoxShadow.y }px ${ customBoxShadow.blur }px ${ customBoxShadow.spread }px rgba( ${ boxShadowColor }, ${ customBoxShadow.opacity / 100 } )` : null
	};

	const selectVariation = ( variation ) => {
		const { name } = variation;
		let { attributes } = variation;
		attributes = { ...attributes, variationName: name };
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
					template={ template.innerBlocks }
					templateLock={ true }
				/>
			</div>
		</div>		
	);
}

export default Edit;
