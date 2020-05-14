/**
 * External Dependencies
 */
import {
	hotVariationLoader,
	registerVariations,
} from '../../packages/block-hot-loader';

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */
if ( module.hot ) {
	hotVariationLoader( {
		getContext: () => require.context( './blocks', true, /variations\.js$/ ),
		module,
	} );
} else {
	registerVariations( {
		getContext: () => require.context( './blocks', true, /variations\.js$/ ),
		module,
	} );
}
