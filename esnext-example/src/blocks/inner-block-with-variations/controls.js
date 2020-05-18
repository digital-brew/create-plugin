/**
 * External Dependencies
 */
import { BorderControls, BoxShadowControls, PaddingControls, MarginControls, SpacingControls } from '../../../../packages/tailwindcss/src';
// import { tailwindcss } from '@blockhandbook/tailwindcss';
// const { BorderControls, BoxShadowControls } = tailwindcss;

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from '../../utils/icons';
const pkg = require( '../../../package' );
const slug = pkg.config.slug;

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls></InspectorControls>
			<SpacingControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
			<MarginControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
			<PaddingControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
			<BorderControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
			<BoxShadowControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
		</>
	);
}

export default Controls;
