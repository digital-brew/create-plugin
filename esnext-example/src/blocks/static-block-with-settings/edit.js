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
const pkg = require( '../../../package' );
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
			addCustomClass,
			customClass,
		},
		attributes: {
			// put attribute key names here to use them
		},
	} = props;

	// We need to generate the wrapper classes so that if the custom wrapper class changes in the plugin, this component will re-render.  Otherwise, it won't.
	const wrapperClasses = classnames(
		{
			[`${ className } ${ customClass }`]: addCustomClass && ! className.includes( customClass ),
			[ className ]: addCustomClass && className.includes( customClass ),
			[ className ]: ! addCustomClass
		}
	)

	return (
		<div className={ wrapperClasses	}>
			<Controls
				className={ className }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<p>
				{ __(
					'ESNext Example – this is a static block w/ settings.',
					'esnext-example'
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
