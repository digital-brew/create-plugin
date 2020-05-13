/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './editor.scss';
import './style.scss';
const pkg = require( '../../../package.json' );
const slug = pkg.config.slug;

/**
 * Module Constants
 */

const Edit = ( props ) => {
	const {
		attributes,
		className,
		setAttributes,
		defaults: {
			addWrapperClass,
			wrapperClass,
		},
		attributes: {
			// put attribute key names here to use them
		},
	} = props;

	return (
		<div className={ className	}>
			<Controls
				className={ className }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<p>
				{ __(
					'ESNext Example – hello from the editor!',
					'create-plugin'
				) }
			</p>
		</div>
	);
}

const EditWithSettings = compose(
	[
		withSelect( ( select, props ) => {
			const pluginSettings = select( `${ slug }/settings` ).getPluginSettings();

			return pluginSettings;
		} ),
	]
)( Edit );

export default EditWithSettings;
