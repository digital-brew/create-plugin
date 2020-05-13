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
import './editor.scss';
import './style.scss';
import { attributes, name } from './block.json';

const deprecated = [
	{
		attributes: {
			...attributes,
		},
		supports: {},
	},
];

export default deprecated;
