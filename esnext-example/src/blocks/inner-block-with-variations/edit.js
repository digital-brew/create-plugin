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
			padding,
			variationName,
		}
	} = props;

	console.log( padding )

	const variationTemplate = variations.find( ( variation ) => {
		const { name } = variation;
		if( name === variationName ) {
			return variation;
		}
		return false;
	} );

	const rowClasses = classnames(
		`bg-white ${ borderStyle.style } overflow-hidden`,
		{
			[ `${ borderRadius.preset }` ]: borderRadius.usePreset,
			[ `${ borderWidth.preset }` ]: borderWidth.usePreset,
			[ `${ boxShadow.preset }` ]: boxShadow.usePreset,
			[ `${ padding.preset }` ]: padding.usePreset,
		}
	);

	const containerStyle = {
		'--tw-box-shadow-color': boxShadow.color,
	}

	const rowStyle = {
		borderColor: borderColor.color,
		padding: 
			! padding.usePreset ? `${ padding.top }px ${ padding.right }px ${ padding.bottom }px ${ padding.left }px` : null,
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
