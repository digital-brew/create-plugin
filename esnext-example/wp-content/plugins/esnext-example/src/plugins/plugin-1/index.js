/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { ToggleControl, BaseControl, PanelBody } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { dispatch, select, withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { config } from '../../../package.json';
const { slug } = config;

const Plugin = ( props ) => {
	const {
		defaults: [ {
			classname
		} ],
	} = props;

	console.log( props )
	const [ showClass, setWrapperClass ] = useState( classname );

	const updatePluginSettings = async ( data ) => {
		const request = apiFetch( {
			path: 'esnext-example/v1/settings/defaults',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify( data ),
		} );

		try {
			const response = await request;
			if ( response ) {
				dispatch( 'esnext-example/settings' ).updatePluginSettings( data );
				setWrapperClass( ( showClass ) => ! showClass );
			}
		} catch ( error ) {
			console.log( error )
			const errorNotice = 'Setting was not updated, please try again.';
			dispatch( 'core/notices' ).createNotice( 'error', error.message );
		}
	};


	return (
		<>
			<PluginSidebarMoreMenuItem target="esnext-example">
				ESNext Example plugin settings
			</PluginSidebarMoreMenuItem>
			<PluginSidebar className="" title="ESNext Example" name="settings">
				<PanelBody>
					<BaseControl
						label={ __(
							'ESNext Example – hello from the plugin sidebar!',
							'create-plugin'
						) }
					/>
					<ToggleControl
						onChange={ ( showClass ) => {
							const defaults = { 
								defaults: [ { classname: showClass } ]
							};
							updatePluginSettings( defaults );
						} }
						checked={ showClass }
						label={ __( 'Add classname to block wrapper.', 'esnext-example' ) }/>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

const PluginWithCompose = compose(
	[
		withSelect( ( select, props ) => {
			const pluginSettings = select( 'esnext-examples/settings' ).getPluginSettings();

			return pluginSettings;
		} ),
	]
)( Plugin );

const name = 'esnext-example';
const settings = {
	icon: 'admin-plugins',
	render: PluginWithCompose,
};

export { name, settings };