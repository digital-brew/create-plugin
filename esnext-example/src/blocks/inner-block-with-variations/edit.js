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
			customBoxShadow,
			useCustomBorderRadius,
			useCustomBoxShadow,
			variationName,
		}
	} = props;

	console.log( attributes )

	const variationTemplate = variations.find( ( variation ) => {
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
			[ `${ borderWidth.preset }` ]: borderWidth.usePreset,
			[ `${ boxShadow }` ]: ! useCustomBoxShadow,
		} 
	);

	const containerStyle = {
		'--tw-box-shadow-color': boxShadowColor,
	}

	const rowStyle = {
		borderColor,
		borderRadius: 
			useCustomBorderRadius ? `${ customBorderRadius.topLeft }px ${ customBorderRadius.topRight }px ${ customBorderRadius.bottomRight }px ${ customBorderRadius.bottomLeft }px` : null,
		borderWidth: 
			! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
		boxShadow: 
			useCustomBoxShadow ? `${ customBoxShadow.x }px ${ customBoxShadow.y }px ${ customBoxShadow.blur }px ${ customBoxShadow.spread }px rgba( ${ boxShadowColor }, ${ customBoxShadow.opacity / 100 } )` : null
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
