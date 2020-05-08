/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */

// Add custom namespace className to all plugin blocks.
const filterDefaultClassName = ( className, blockName ) => {
	const namespace = 'esnext-example';
	const classes = `${ className } ${ namespace }`;
	console.log( 'filter example: logged from src/filters/filter-1/index.js' );
	return blockName.includes( namespace ) ? classes : className;
};

export const name = 'filter-default-class-name';
export const filters = [
	{
		hookName: 'blocks.getBlockDefaultClassName',
		namespace: 'esnext-example/filter-default-class-name',
		functionName: filterDefaultClassName,
	},
];
