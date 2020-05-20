/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { getUnregisteredTypeHandlerName, createBlock, setUnregisteredTypeHandlerName, rawHandler, registerBlockType, unregisterBlockType, registerBlockVariation, unregisterBlockVariation } from '@wordpress/blocks';
import { render } from '@wordpress/element';
import { registerPlugin, unregisterPlugin } from '@wordpress/plugins';
import { dispatch, select, registerStore } from '@wordpress/data';
import { addFilter, removeFilter } from '@wordpress/hooks';
// Needed this for breaking Gutenberg changes.  Commenting out incase we
// need it in the future
// const { replaceBlock, insertBlock, removeBlock, updateBlock, updateBlockAttributes } = dispatch( 'core/block-editor' );
// const { getBlock } = select( 'core/block-editor' );

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
		if ( ! context ) {
			return;
		}

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

		blocks = blocks.map( ( block, index ) => {
			const { innerBlocks, name, clientId } = block;
			const flattenedInnerBlocks = flatten( innerBlocks );
			block = { name: name, clientId: clientId, innerBlocks: flattenedInnerBlocks, index };
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

			// added to fix breaking changes to gutenberg 7.6
			// keeping just in case we need this again in the future
			// let prevAttributes = [];
			// end added
			if ( blockModules[ name ] ) {
				const prevModule = blockModules[ name ].module;

				// added to fix breaking changes to gutenberg 7.6
				// keeping just in case we need this again in the future
				// blocks.forEach( ( block, index ) => {
				// 	if( block.name === name && block.updated ) {
				// 		const { attributes } = getBlock( block.clientId );
				// 		prevAttributes[ index ] = attributes;
				// 		removeBlock( block.clientId );
				// 	}
				// } );
				// end added

				unregisterBlockType( prevModule.name );
			}

			registerBlockType( module.name, module.settings );

			// added to fix breaking changes to gutenberg 7.6
			// keeping just in case we need this again in the future
			// blocks.forEach( ( block, index ) => {
			// 	if( block.name === name && block.updated ) {
			// 		for( const attribute in module.settings.attributes ) {
			// 			if( module.settings.attributes[ attribute ] ) {
			// 				module.settings.attributes[ attribute ].default = prevAttributes[ index ][ attribute ];
			// 			}
			// 		}
			// 		const insertedBlock = createBlock( module.name, module.settings );
			// 		insertBlock( insertedBlock, block.index );
			// 	}
			// } );
			// end added

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
		const context = getContext();
		if ( ! context ) {
			return;
		}

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
		if ( ! context ) {
			return;
		}

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
		if ( ! context ) {
			return;
		}

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

// Hot Module Replacement for frontend
export const hotFrontendLoader = ( { getContext, module: frontendModule } ) => {
	let frontendModules = {};
	const loadFrontend = () => {
		const context = getContext();
		if ( ! context ) {
			return;
		}

		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;
			const blocks = module.blocks;
			const blockContainers = module.blockContainers;

			if ( frontendModules[ name ] && ( module === frontendModules[ name ].module ) ) {
				continue;
			}

			blockContainers.forEach( ( blockContainer, index ) => {
				render(
					blocks[ index ],
					blockContainer
				);
			} );

			frontendModules = { ...frontendModules, [ name ]: { filePath: filePath, module: module } };
		}
		return context;
	};
	frontendModule.hot.accept( loadFrontend().id, loadFrontend );
};

// Hot Module Replacement for variations
export const hotVariationLoader = ( { getContext, module: variationModule } ) => {
	let variationModules = {};
	const loadVariations = () => {
		const context = getContext();
		if ( ! context ) {
			return;
		}

		for ( const filePath of context.keys() ) {
			const module = context( filePath );
			const name = module.name;
			const variations = module.variations;

			if ( variationModules[ name ] && ( module === variationModules[ name ].module ) ) {
				continue;
			}

			if ( variationModules[ name ] ) {
				const prevModule = variationModules[ name ].module;

				prevModule.variations.forEach( ( variation ) => {
					const { name } = variation;
					unregisterBlockVariation( name, variation );
				} );
			}

			variations.forEach( ( variation ) => {
				// Adding the variation
				const { name } = variation;
				registerBlockVariation( name, variation );
			} );

			variationModules = { ...variationModules, [ name ]: { filePath: filePath, module: module } };
		}
		return context;
	};
	variationModule.hot.accept( loadVariations().id, loadVariations );
};

// RegisterBlocks function for non-HMR use
export const registerBlocks = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const name = module.name;
		const settings = module.settings;

		registerBlockType( name, settings );
	}

	return context;
};

// RegisterStores function for non-HMR use
export const registerStores = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const name = module.name;
		const settings = module.settings;

		registerStore( name, settings );
	}

	return context;
};

// Register filters function for non-HMR use
export const registerFilters = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const filters = module.filters;

		filters.forEach( ( filter ) => {
			// addFilter( 'hookName', 'namespace', 'functionName', 'callback', 'priority' )
			const { hookName, namespace, functionName } = filter;
			addFilter( hookName, namespace, functionName );
		} );
	}

	return context;
};

// RegisterPlugins function for non-HMR use
export const registerPlugins = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const name = module.name;
		const settings = module.settings;

		registerPlugin( name, settings );
	}

	return context;
};

// Autoload frontend.js
export const registerFrontend = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const blocks = module.blocks;
		const blockContainers = module.blockContainers;

		blockContainers.forEach( ( blockContainer, index ) => {
			render(
				blocks[ index ],
				blockContainer
			);
		} );
	}

	return context;
};

// Autoload variations for non-HMR use
export const registerVariations = ( { getContext } ) => {
	const context = getContext();

	for ( const filePath of context.keys() ) {
		const module = context( filePath );
		const variations = module.variations;

		variations.forEach( ( variation ) => {
			// addFilter( 'hookName', 'namespace', 'functionName', 'callback', 'priority' )
			const { name } = variation;
			registerBlockVariation( name, variation );
		} );
	}

	return context;
};

// RegisterPatterns function for non-HMR use
// export const registerPatterns = ( { getContext } ) => {
// 	const context = getContext();

// 	for ( const filePath of context.keys() ) {
// 		const module = context( filePath );
// 		const name = module.name;
// 		const settings = module.settings;

// 		registerBlockPattern( name, settings );
// 	}

// 	return context;
// };
