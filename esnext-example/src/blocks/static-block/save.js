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
import './editor.scss';
import './style.scss';

const Save = ( props ) => {
	const {
		attributes: {},
	} = props;

	// IMPORTANT - If you use Fragment as wrapper then
	// the wrapper classes don't get added to the block when saving!!!!

	return (
		<p>
			{ __(
				'ESNext Example – hello from the saved content!',
				'create-plugin'
			) }
		</p>
	);
}

export default Save;
