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
import { dispatch, withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { config } from '../../../package.json';
const { pluginName, slug } = config;

const Plugin = ( props ) => {
	const {
		defaults: {
			addCustomClass
		},		
	} = props;

	console.log( props )
	const [ showClass, setAddCustomClass ] = useState( addCustomClass );

	const updatePluginSettings = async ( data ) => {
		const request = apiFetch( {
			path: `${ slug }/v1/settings/defaults`,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify( data )
		} );

		try {
			const response = await request;
			if ( response ) {
				console.log( response, data )
				dispatch( 'core/notices' ).createNotice( 'success', 'Setting saved.' );
				dispatch( `${ slug }/settings` ).updatePluginSettings( data );
				setAddCustomClass( ( showClass ) => ! showClass );
			}
		} catch ( error ) {
			console.log( error )
			const errorNotice = 'Setting was not updated, please try again.';
			dispatch( 'core/notices' ).createNotice( 'error', errorNotice );
		}
	};


	return (
		<>
			<PluginSidebarMoreMenuItem target={ `${ slug }` }>
				{ __( 'ESNext Example plugin settings', 'create-plugin' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar className="" title={ `${ pluginName }`} name={ `${ slug }` }>
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
								defaults: { addCustomClass: showClass }
							};
							updatePluginSettings( defaults );
						} }
						checked={ showClass }
						label={ __( 'Add classname to block wrapper.', 'create-plugin' ) }/>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

const PluginWithCompose = compose(
	[
		withSelect( ( select, props ) => {
			const pluginSettings = select( `${ slug }/settings` ).getPluginSettings();

			return pluginSettings;
		} ),
	]
)( Plugin );

const name = `${ slug }`;
const settings = {
	icon: 'admin-plugins',
	render: PluginWithCompose,
};

export { name, settings };