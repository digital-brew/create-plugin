/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import './editor.scss';
import './style.scss';

const Save = ( props ) => {
	const {
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
		},
	} = props;

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
		borderRadius: useCustomBorderRadius ? `${ customBorderRadius.topLeft }px ${ customBorderRadius.topRight }px ${ customBorderRadius.bottomRight }px ${ customBorderRadius.bottomLeft }px` : null,
		borderWidth: ! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
		boxShadow: useCustomBoxShadow ? `${ customBoxShadow.x }px ${ customBoxShadow.y }px ${ customBoxShadow.blur }px ${ customBoxShadow.spread }px rgba( ${ boxShadowColor }, ${ customBoxShadow.opacity / 100 } )` : null
	};

	/* IMPORTANT - Wrapper classes get added to the outermost wrapper element.  If you use Fragment as wrapper then the wrapper classes don't get added to the block when saving! */

	return (
		<div style={ containerStyle }>
			<div className={ rowClasses } style={ rowStyle }>
				<InnerBlocks.Content />
			</div>
		</div>		
	);
}

export default Save;
