/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
const { registerBlockType, unregisterBlockType } = wp.blocks;
const { registerPlugin, unregisterPlugin } = wp.plugins;
const { dispatch, select, registerStore } = wp.data;
const { addFilter, removeFilter } = wp.hooks;

/**
 * Internal Dependencies
 */

// Hot Module Replacement for blocks
let modules = {};
const loadBlocks = () => {
	const selectedBlockId = select( 'core/block-editor' ).getSelectedBlockClientId();

	dispatch( 'core/block-editor' ).clearSelectedBlock();

	let blocks = select( 'core/block-editor' ).getBlocks();

	const context = require.context( '../blocks', true, /index\.js$/ );

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
						block.updated = ! ( modules[ name ] && ( modules[ name ].module === module ) );
					}
				}
				return block;
			default:
				for ( const innerBlock of innerBlocks ) {
					for ( const filePath of context.keys() ) {
						const module = context( filePath );
						const name = module.name;

						if ( block.name === name ) {
							block.updated = ! ( modules[ name ] && ( modules[ name ].module === module ) );
						}
						if ( innerBlock.name === name ) {
							innerBlock.updated = ! ( modules[ name ] && ( modules[ innerBlock.name ].module === module ) );
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

		if ( modules[ name ] && ( module === modules[ name ].module ) ) {
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

		if ( modules[ name ] ) {
			const prevModule = modules[ name ].module;
			unregisterBlockType( prevModule.name );
		}

		registerBlockType( module.name, module.settings );

		modules = { ...modules, [ name ]: { filePath: filePath, module: module } };
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

// Hot Module Replacement for filters
let filterModules = {};
const loadFilters = () => {
	const context = require.context( '../filters', true, /index\.js$/ );

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

// Hot Module Replacement for plugins
let pluginModules = {};
const loadPlugins = () => {
	const context = require.context( '../plugins', true, /index\.js$/ );

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

// Hot Module Replacement for store
let storeModules = {};
const loadStore = () => {
	const context = require.context( '../store', true, /index\.js$/ );

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

export const hotModuleReplacement = () => {
	const blockContext = loadBlocks();
	const filterContext = loadFilters();
	const pluginContext = loadPlugins();
	const storeContext = loadStore();

	module.hot.accept( storeContext.id, loadStore );
	module.hot.accept( blockContext.id, loadBlocks );
	module.hot.accept( filterContext.id, loadFilters );
	module.hot.accept( pluginContext.id, loadPlugins );
};
