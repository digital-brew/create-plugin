/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { registerPlugin, unregisterPlugin } from '@wordpress/plugins';
import { dispatch, select, registerStore } from '@wordpress/data';
import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */

// Hot Module Replacement for blocks
export const hotBlockLoader = ( { getContext, module: blockModule } ) => {
	let blockModules = {};
	const loadBlocks = () => {
		const selectedBlockId = select( 'core/block-editor' ).getSelectedBlockClientId();

		dispatch( 'core/block-editor' ).clearSelectedBlock();

		let blocks = select( 'core/block-editor' ).getBlocks();

		const context = getContext();

		const flatten = ( array ) => {
			let flat = [];

			if ( !! array ) {
				for ( let i = 0; i < array.length; i++ ) {
					flat.push( array[ i ] );
					if ( ( array[ i ].innerBlocks.constructor === Array ) && ( array[ i ].innerBlocks.length > 0 ) ) {
						flat = flat.concat( flatten( array[ i ].innerblocks ) );
					}
				}
			}
			return flat;
		};

		blocks = blocks.map( ( block ) => {
			const { innerBlocks, name, clientId } = block;
			const flattenedInnerBlocks = flatten( innerBlocks );
			block = { name: name, clientId: clientId, innerBlocks: flattenedInnerBlocks };
			return block;
		} );

		blocks = blocks.map( ( block ) => {
			const { innerBlocks } = block;
			switch ( innerBlocks.length ) {
				case 0:
					for ( const filePath of context.keys() ) {
						const module = context( filePath );
						const name = module.name;

						if ( block.name === name ) {
							block.updated = ! ( blockModules[ name ] && ( blockModules[ name ].module === module ) );
						}
					}
					return block;
				default:
					for ( const innerBlock of innerBlocks ) {
						for ( const filePath of context.keys() ) {
							const module = context( filePath );
							const name = module.name;

							if ( block.name === name ) {
								block.updated = ! ( blockModules[ name ] && ( blockModules[ name ].module === module ) );
							}
							if ( innerBlock.name === name ) {
								innerBlock.updated = ! ( blockModules[ name ] && ( blockModules[ innerBlock.name ].module === module ) );
							}
						}
					}
					return block;
			}
		} );

		blocks = blocks.map( ( block ) => {
			const { innerBlocks } = block;
			if ( innerBlocks.length > 0 ) {
				block.innerBlocksUpdated = innerBlocks.some( ( innerBlock ) => {
					return innerBlock.updated === true;
				} );
			}
			return block;
		} );

		blocks = blocks.filter( ( block ) => {
			const { innerBlocks } = block;

			switch ( innerBlocks.length ) {
				case 0:
					return block.updated;
				default:
					if ( ! block.innerBlocksUpdated && ! block.updated ) {
						return false;
					}
					return true;
			}
		} );
		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;

			if ( blockModules[ name ] && ( module === blockModules[ name ].module ) ) {
				const allBlocksUnchanged = blocks.every( ( block ) => {
					return (
						( block.name === name ) &&
						( ! block.updated ) &&
						( ! block.innerBlocksUpdated )
					);
				} );
				if ( allBlocksUnchanged ) {
					continue;
				}
			}

			if ( blockModules[ name ] ) {
				const prevModule = blockModules[ name ].module;

				unregisterBlockType( prevModule.name );
			}

			registerBlockType( module.name, module.settings );

			blockModules = { ...blockModules, [ name ]: { filePath: filePath, module: module } };
		}

		for ( const block of blocks ) {
			const { clientId, innerBlocks } = block;
			dispatch( 'core/block-editor' ).selectBlock( clientId );

			for ( const innerBlock of innerBlocks ) {
				const { clientId: innerBlockClientId } = innerBlock;
				dispatch( 'core/block-editor' ).selectBlock( innerBlockClientId );
			}
		}

		if ( selectedBlockId ) {
			dispatch( 'core/block-editor' ).selectBlock( selectedBlockId );
		} else {
			dispatch( 'core/block-editor' ).clearSelectedBlock();
		}

		return context;
	};
	blockModule.hot.accept( loadBlocks().id, loadBlocks );
};

// Hot Module Replacement for filters
export const hotFilterLoader = ( { getContext, module: filterModule } ) => {
	let filterModules = {};
	const loadFilters = () => {
		if ( ! context ) {
			return;
		}
		const context = getContext();

		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;
			const filters = module.filters;

			if ( filterModules[ name ] && ( module === filterModules[ name ].module ) ) {
				continue;
			}

			if ( filterModules[ name ] ) {
				const prevModule = filterModules[ name ].module;

				prevModule.filters.forEach( ( filter ) => {
					const { hookName, namespace, functionName } = filter;
					removeFilter( hookName, namespace, functionName );
				} );
			}

			filters.forEach( ( filter ) => {
				// Adding the filter
				// addFilter( 'hookName', 'namespace', 'functionName', 'callback', 'priority' )
				const { hookName, namespace, functionName } = filter;
				addFilter( hookName, namespace, functionName );
			} );

			filterModules = { ...filterModules, [ name ]: { filePath: filePath, module: module } };
		}
		return context;
	};
	filterModule.hot.accept( loadFilters().id, loadFilters );
};

// Hot Module Replacement for plugins
export const hotPluginLoader = ( { getContext, module: pluginModule } ) => {
	let pluginModules = {};
	const loadPlugins = () => {
		const context = getContext();

		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;
			const settings = module.settings;

			if ( pluginModules[ name ] && ( module === pluginModules[ name ].module ) ) {
				continue;
			}

			if ( pluginModules[ name ] ) {
				const prevModule = pluginModules[ name ].module;
				unregisterPlugin( prevModule.name );
			}

			registerPlugin( name, settings );

			pluginModules = { ...pluginModules, [ name ]: { filePath: filePath, module: module } };
		}
		return context;
	};
	pluginModule.hot.accept( loadPlugins().id, loadPlugins );
};

// Hot Module Replacement for store
export const hotStoreLoader = ( { getContext, module: storeModule } ) => {
	let storeModules = {};
	const loadStore = () => {
		const context = getContext();

		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;
			const settings = module.settings;

			if ( storeModules[ name ] && ( module === storeModules[ name ].module ) ) {
				continue;
			}

			registerStore( name, settings );

			storeModules = { ...storeModules, [ name ]: { filePath: filePath, module: module } };
		}
		return context;
	};
	storeModule.hot.accept( loadStore().id, loadStore );
};

// RegisterBlocks function for non-HMR use
// Register blocks.
const registerBlocks = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const name = module.name;
		const settings = module.settings;

		registerBlockType( name, settings );
	}

	return context;
};

export default registerBlocks;