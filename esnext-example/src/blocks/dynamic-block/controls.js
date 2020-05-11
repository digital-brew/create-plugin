/**
 * External Dependencies
 */
import controls from '@blockhandbook/controls';
console.log( controls )
const { PostsControls } = controls;

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from '../../utils/icons';
const pkg = require( '../../../package.json' );
const slug = pkg.config.slug;

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

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
