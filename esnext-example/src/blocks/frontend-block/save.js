/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */
import './editor.scss';
import './style.scss';
import { sortObject } from '../../utils/helpers';

const Save = ( props ) => {

	let {
		attributes,
		attributes: {
			className,
		},
	} = props;

	// We need to pass the className to the saved attributes, otherwise
	// we run into a block validation issue b/c the attribute values
	// are different than expected... b/c the className isn't there!
	// We also need to sort the attributes object so it's in the same order
	// every time the block is saved, otherwise we run into issues!
	attributes = JSON.stringify( sortObject( { 
		...attributes, 
		...{ className } 
	} ) );

	// IMPORTANT - If you use a Fragment as a wrapper then
	// the wrapper classes don't get added to the block when saving!!!!

	return (
		<div className="frontend-block-container" data-attributes={ attributes }></div>
	);
}

export default Save;
