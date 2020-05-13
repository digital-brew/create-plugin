/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { name } from './block.json';

const blockContainers = document.querySelectorAll( '.frontend-block-container' );

const FrontendBlock = ( props ) => {
	const {
		attributes: {
			isDarkBackground,
		},
	} = props;

	console.log( isDarkBackground )

	const [ darkBackground, toggleDarkBackground ] = useState( isDarkBackground );

	const rowClasses = classnames( 
		'p-5 rounded-lg',
		{
			'bg-gray-900 text-white': darkBackground,
			'bg-white shadow-md': ! darkBackground,
		},
	);

	return (
		<div className={ rowClasses }>
			<ToggleControl
				label={ 'Dark background' }
				checked={ darkBackground }
				onChange={ () => toggleDarkBackground( ! darkBackground ) }
			/>
		</div>
	);
};

let blocks = [];
blockContainers.forEach( ( blockContainer ) => {
	// pass attributes to the frontend as a data attribute
	const attributes = JSON.parse( blockContainer.dataset.attributes );

	blocks.push( <FrontendBlock attributes={ attributes } /> );
} );

export { name, blocks, blockContainers };
