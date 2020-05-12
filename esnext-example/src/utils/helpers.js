export const sortObject = ( unordered ) => {
	const ordered = {};
	Object.keys( unordered )
		.sort()
		.forEach( (key) => {
		ordered[key] = unordered[key];
	} );

	return ordered;
};