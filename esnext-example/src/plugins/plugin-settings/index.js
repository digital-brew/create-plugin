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
import { config } from '../../../package.json';
const { pluginName, slug } = config;

const Plugin = ( props ) => {
	const {
		defaults: {
			addWrapperClass,
			wrapperClass,
		},		
	} = props;

	const [ addWrapperClassState, toggleAddWrapperClass ] = useState( addWrapperClass );
	const [ wrapperClassState, setWrapperClass ] = useState( wrapperClass );

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
						addWrapperClassState &&
						<TextControl 
							label={ __( 'Custom Block Wrapper Class', 'create-plugin' ) }
							value={ wrapperClassState }
							onChange={ ( wrapperClass ) => setWrapperClass( wrapperClass ) }
						/>
					}
					<ToggleControl
						onChange={ ( ) => {
							toggleAddWrapperClass( ( ) => ! addWrapperClassState );
						} }
						checked={ addWrapperClassState }
						label={ __( 'Add custom class to block wrapper.', 'create-plugin' ) }
					/>
					<Button
						isSecondary
						isSmall
						onClick={ ( ) => {
							const pluginSettings = { 
								defaults: { 
									wrapperClass: wrapperClassState, 
									addWrapperClass: addWrapperClassState
								}
							};
							updatePluginSettings( pluginSettings );
						} }
					>
					{ __( 'Save', 'create-plugin' ) }
					</Button>
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