/**
 * External Dependencies
 */
// import { BackgroundControls, BorderControls, BoxShadowControls, PaddingControls, MarginControls, SpacingControls } from '../../../../packages/tailwindcss-controls/src';
import { tailwindcssControls } from '@blockhandbook/tailwindcss-controls';
const { BackgroundControls, BorderControls, BoxShadowControls, SpacingControls } = tailwindcssControls;

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
			<BackgroundControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				slug={ slug }
			/>
			<SpacingControls
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
