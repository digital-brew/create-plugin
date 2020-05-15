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
			customBorderRadius,
			customBorderWidth,
			useCustomBorderRadius,
			useCustomBorderWidth,
		},
	} = props;

	const containerClasses = classnames(
		`p-10 bg-white ${ borderStyle } overflow-hidden`,
		{
			[ `${ borderRadius }` ]: ! useCustomBorderRadius,
			[ `${ borderWidth }` ]: ! useCustomBorderWidth,
		} );

		const containerStyle = {
			borderColor,
			borderRadius: useCustomBorderRadius ? `${ customBorderRadius.topLeft }px ${ customBorderRadius.topRight }px ${ customBorderRadius.bottomRight }px ${ customBorderRadius.bottomLeft }px` : null,
			borderWidth: useCustomBorderWidth ? `${ customBorderWidth.top }px ${ customBorderWidth.right }px ${ customBorderWidth.bottom }px ${ customBorderWidth.left }px` : null,
		};

	/* IMPORTANT - Wrapper classes get added to the outermost wrapper element.  If you use Fragment as wrapper then the wrapper classes don't get added to the block when saving! */

	return (
		<div>
			<div className={ containerClasses } style={ containerStyle }>
				<InnerBlocks.Content />
			</div>
		</div>		
	);
}

export default Save;
