/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, TextControl, ToggleControl, BaseControl, PanelRow, PanelBody, Panel } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { BlockCard } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { dispatch, withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
const { savePost } = dispatch( 'core/editor' );

/**
 * Internal Dependencies
 */
import { config } from '../../../package';
const { pluginName, slug } = config;

const Plugin = ( props ) => {
	const {
		defaults: {
			addCustomClass,
			customClass,
		},		
	} = props;

	const [ addCustomClassState, toggleAddCustomClass ] = useState( addCustomClass );
	const [ customClassState, setCustomClass ] = useState( customClass );

	const updatePluginSettings = async ( data, setting ) => {
		const request = apiFetch( {
			path: `${ slug }/v1/settings/${ setting }`,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify( data )
		} );

		try {
			const response = await request;
			if ( response ) {
				dispatch( 'core/notices' ).createNotice( 'success', 'Setting saved.' );
				dispatch( `${ slug }/settings` ).updatePluginSettings( data );
				savePost();
			}
		} catch ( error ) {
			const errorNotice = 'Setting was not updated, please try again.';
			dispatch( 'core/notices' ).createNotice( 'error', errorNotice );
		}
	};

	return (
		<>
			<PluginSidebarMoreMenuItem 
				target={ `${ slug }-settings` }
			>
				{ __( 'ESNext Example', 'create-plugin' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar 
				title={ `${ pluginName }`} 
				name={ `${ slug }-settings` }
			>
				<PanelBody title={__( 'Plugin Settings', 'create-plugin' ) }>
					{
						addCustomClassState &&
						<TextControl 
							label={ __( 'Custom Class', 'create-plugin' ) }
							value={ customClassState }
							onChange={ ( customClass ) => setCustomClass( customClass ) }
						/>
					}
					<ToggleControl
						onChange={ ( ) => {
							toggleAddCustomClass( ( ) => ! addCustomClassState );
						} }
						checked={ addCustomClassState }
						label={ __( 'Add custom class to default block class.', 'create-plugin' ) }
					/>
					<Button
						isSecondary
						isSmall
						onClick={ ( ) => {
							const pluginSettings = { 
								defaults: { 
									customClass: customClassState, 
									addCustomClass: addCustomClassState
								}
							};
							updatePluginSettings( pluginSettings, 'defaults' );
						} }
					>
					{ __( 'Save', 'create-plugin' ) }
					</Button>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

const PluginWithSettings = compose(
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
	render: PluginWithSettings,
};

export { name, settings };