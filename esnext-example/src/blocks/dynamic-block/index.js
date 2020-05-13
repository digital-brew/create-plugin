/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { attributes, name } from './block.json';
// import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import transforms from './transforms';
import './editor.scss';
import './style.scss';

const settings = {
	title: __( 'Dynamic Block', 'esnext-example' ),
	description: __(
		'A starter dynamic block.',
		'esnext-example'
	),
	keywords: [ 'blockhandbook', 'block handbook' ],
	icon,
	category: 'esnext-example',
	example: {},
	supports: {
		align: true,
	},
	styles: [],
	attributes,
	// deprecated,
	transforms,
	edit,
};

export { name, settings };
