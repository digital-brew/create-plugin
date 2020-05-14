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

/**
 * Module Constants
 */
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading' ];

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
			customBorderRadius,
			customBorderWidth,
			useCustomBorderRadius,
			useCustomBorderWidth,
			variation,
		},
	} = props;

	console.log( variation )

	const containerClasses = classnames(
		`p-10 bg-white ${ borderStyle } overflow-hidden`,
		{
			[ `${ borderRadius }` ]: ! useCustomBorderRadius,
			[ `${ borderWidth }` ]: ! useCustomBorderWidth,
		} );

	const containerStyle = {
	 borderColor,
	 borderRadius: useCustomBorderRadius ? customBorderRadius : null,
	 borderWidth: useCustomBorderWidth ? customBorderWidth : null,
	};

	if( ! variation ) {
		return(
			<__experimentalBlockVariationPicker
				variations={ variations }
				instructions={ __( 'Select a variation', 'esnext-example ' ) }
				onSelect={ ( variation ) => setAttributes( { variation } ) }
			/>
		);
	}

	return (
		<div className={ className }>			
			<div className={ containerClasses } style={ containerStyle }>
				<Controls
					className={ className }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ variations[0].innerBlocks }
					templateLock={ true }
				/>
			</div>
		</div>		
	);
}

export default Edit;
