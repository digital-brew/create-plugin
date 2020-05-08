/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { name } from './block.json';

const blockContainers = document.querySelectorAll( '.blockContainer' );

const Block = ( props ) => {
	const {
		attributes: {},
	} = props;

	return (
		<p className={ className }>
			{ __( 'ESNext Example – hello from the editor!', 'create-plugin' ) }
		</p>
	);
};

let blocks = [];
blockContainers.forEach( ( blockContainer ) => {
	const attributes = JSON.parse( blockContainer.dataset.attributes );

	blocks.push( <Block attributes={ attributes } /> );
} );

export { name, blocks, blockContainers };
