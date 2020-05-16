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
		},
	} = props;

	const rowClasses = classnames(
		`p-10 bg-white ${ borderStyle.style } overflow-hidden`,
		{
			[ `${ borderRadius.preset }` ]: borderRadius.usePreset,
			[ `${ borderWidth.preset }` ]: borderWidth.usePreset,
			[ `${ boxShadow.preset }` ]: boxShadow.usePreset,
		}
	);

	const containerStyle = {
		'--tw-box-shadow-color': boxShadow.color,
	}

	const rowStyle = {
		borderColor: borderColor.color,
		borderRadius: 
			! borderRadius.usePreset ? `${ borderRadius.topLeft }px ${ borderRadius.topRight }px ${ borderRadius.bottomRight }px ${ borderRadius.bottomLeft }px` : null,
		borderWidth: 
			! borderWidth.usePreset ? `${ borderWidth.top }px ${ borderWidth.right }px ${ borderWidth.bottom }px ${ borderWidth.left }px` : null,
		boxShadow: 
			! boxShadow.usePreset ? `${ boxShadow.x }px ${ boxShadow.y }px ${ boxShadow.blur }px ${ boxShadow.spread }px rgba( ${ boxShadow.color }, ${ boxShadow.opacity / 100 } )` : null
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
