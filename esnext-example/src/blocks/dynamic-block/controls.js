/**
 * External Dependencies
 */
import { controls } from '@blockhandbook/controls';
const { PostsControls } = controls;

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

function Controls( props ) {
	const {
		setAttributes,
		attributes,
	} = props;

	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls></InspectorControls>
			<PostsControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
}

export default Controls;
