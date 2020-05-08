/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './editor.scss';
import './style.scss';

/**
 * Module Constants
 */

function BlockEdit( props ) {
	const {
		attributes,
		className,
		setAttributes,
		attributes: {
			// put attribute key names here to use them
		},
	} = props;

	return (
		<>
			<Controls
				className={ className }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<p className={ className }>
				{ __(
					'ESNext Example – hello from the editor!',
					'create-plugin'
				) }
			</p>
		</>
	);
}

export default BlockEdit;
