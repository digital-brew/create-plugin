/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { config } from '../../../package.json';
const { slug } = config;

// Add custom namespace className to all plugin blocks.
const setBlockCustomClassName = ( className, blockName ) => {
	const pluginSettings = select( `${ slug }/settings` ).getPluginSettings();
	
	const { 
		addWrapperClass, 
		wrapperClass 
	} = pluginSettings.defaults;

	const classes = addWrapperClass ? `${ className } ${ wrapperClass }` : `${ className }`;
	return classes;
};

export const name = 'set-block-custom-class-name';
export const filters = [
	{
		hookName: 'blocks.getBlockDefaultClassName',
		namespace: `${ slug }/set-block-custom-class-name`,
		functionName: setBlockCustomClassName,
	},
];
