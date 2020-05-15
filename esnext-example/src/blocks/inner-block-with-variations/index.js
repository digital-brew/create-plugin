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
import { attributes, name } from './block';
// import deprecated from './deprecated';
import edit from './edit';
import icons from './icons';
import save from './save';
import transforms from './transforms';
import './editor.scss';
import './style.scss';

const settings = {
	title: __( 'Inner Block w/ Variations', 'esnext-example' ),
	description: __(
		'A starter inner block w/ variations.',
		'esnext-example'
	),
	keywords: [ 'blockhandbook', 'block handbook' ],
	icon: icons.block,
	category: 'esnext-example',
	example: {},
	supports: {},
	styles: [],
	attributes,
	// deprecated,
	transforms,
	edit,
	save,
};

export { name, settings };
