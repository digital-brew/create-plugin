/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from '../../utils/icons';
const pkg = require( '../../../package.json' );
const slug = pkg.config.slug;

function Controls( props ) {
	const {
		setAttributes,
		className,
		style,
		attributes: {},
	} = props;

	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls></InspectorControls>
		</>
	);
}

export default Controls;
