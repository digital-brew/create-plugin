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
		attributes: {
			// put attribute key names here to use them
		},
	} = props;

	/* IMPORTANT - Wrapper classes get added to the outermost wrapper element.  If you use Fragment as wrapper then the wrapper classes don't get added to the block when saving! */

	return (
		<div>
			<p>
				{ __(
					'ESNext Example – this is a static block w/ settings.',
					'esnext-example'
				) }
			</p>
		</div>
	);
}

export default Save;
