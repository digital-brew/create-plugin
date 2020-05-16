/**
 * External Dependencies
 */
import { upperFirst } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, Dropdown, MenuGroup, MenuItem, PanelBody, RangeControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, ColorPalette, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from './icons';

const hexToRgb = ( hex ) => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
		return r + r + g + g + b + b;
	} );

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result ? {
		r: parseInt( result[ 1 ], 16 ),
		g: parseInt( result[ 2 ], 16 ),
		b: parseInt( result[ 3 ], 16 ),
	} : null;
};

const convertToRGB = ( color ) => {
	let rgb = hexToRgb( color );
	rgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;
	return rgb;
};

const BoxShadowControls = ( props ) => {
	const {
		setAttributes,
		slug,
		initialOpen = false,
		attributes: {
			boxShadow,
		},
	} = props;

	// this is kinda annoying, in order to be able to purge styles for production
	// we need to include the classes fully-written.  these were programatically
	// generated initially but I had to put them here for the purge.
	const opacity = {
		0: 'opacity-0',
		10: 'opacity-10',
		20: 'opacity-20',
		30: 'opacity-30',
		40: 'opacity-40',
		50: 'opacity-50',
		60: 'opacity-60',
		70: 'opacity-70',
		80: 'opacity-80',
		90: 'opacity-90',
		100: 'opacity-100',
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
				{
					boxShadow.toolbar &&
					<Dropdown	
						focusOnMount={ false }					
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.boxShadow }
								label={ __( 'Box Shadow', 'esnext-example' ) }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									boxShadow.usePreset &&
									<MenuGroup>
										{
											[
												{ 
													label: __( 'None', 'esnext-example' ), icon: icons.boxShadowNone, value: 'shadow-none'
												},
												{ 
													label: __( 'Small', 'esnext-example' ), icon: icons.boxShadowSmall, value: 'shadow'
												},
												{
													label: __( 'Medium', 'esnext-example' ), icon: icons.boxShadowMedium, value: 'shadow-md' 
												},
												{ 
													label: __( 'Large', 'esnext-example' ), icon: icons.boxShadowLarge, value: 'shadow-lg' 
												},
												{ 
													label: __( 'X-Large', 'esnext-example' ), icon: icons.boxShadowXLarge, value: 'shadow-xl' 
												},
											].map( ( item ) => {
												return(
													<MenuItem
														icon={ item.icon }
														className={ boxShadow.preset === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
														key={ item.label } 
														onClick={ () => setAttributes( { 
															boxShadow: {
																...boxShadow,
																preset: item.value,
															} }
														) }
													>
														{ item.label }
													</MenuItem>
												)
											})
										}
									</MenuGroup>
								}
								{
									! boxShadow.usePreset &&
									<MenuGroup>
									<div className={ slug }	>
										<div className="px-6 pb-0 pt-3">
										{
											Object.keys( boxShadow ).map( ( key ) => {
												if( 
													key === 'x' || key === 'y' || key === 'blur' || key === 'spread' || key === 'opacity' 
												) {
													return(
													<RangeControl
														key={ key }
														label={ upperFirst( key ) }
														className="clear-both"
														value={ boxShadow[ key ] }
														showTooltip={ false }
														onChange={
															( value ) => {
																setAttributes( { 
																	customBoxShadow: {
																		...boxShadow,
																		[ key ]: value
																	} 
																} );
															}
														}
														initialPosition={ boxShadow[ key ] }
														min={ 0 }
														max={ 100 }
														step={ 1 }
													/>
												)	}
											} )
										}
										</div>
									</div>
									</MenuGroup>				
								}		
								<MenuGroup>				
								<div className={ slug }	>
									<ToggleControl
										className="px-3 pt-3"
										label={ __( 'Custom', 'esnext-example' ) }
										checked={ boxShadow.usePreset }
										onChange={ ( ) => setAttributes( { 
											boxShadow: {
												...boxShadow,
												usePreset: ! boxShadow.usePreset
											} } 
										) }
									/>
								</div>
								</MenuGroup>	
							</div>
								</div>
							) } 
						}
					/>
				}
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
			{
				boxShadow.sidebar &&
				<PanelBody
					title={ __( 'Shadow Settings', 'esnext-example' ) }
					initialOpen={ initialOpen }
				>
					<BaseControl
						id="shadow-size"
						className={ slug }
						label={ __( 'Shadow Size', 'esnext-example' ) }
					>
					<Button 
						className="float-right mb-3"
						isTertiary
						isSmall
						onClick={ () => setAttributes( { 
							boxShadow: {
								...boxShadow,
								usePreset: ! boxShadow.usePreset,
							} } 
						) }
						>
						{ ! boxShadow.usePreset ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
					</Button>
					{
						! boxShadow.usePreset &&
						Object.keys( boxShadow ).map( ( key ) => {
							if( 
								key === 'x' || key === 'y' || key === 'blur' || key === 'spread' || key === 'opacity' 
							) {
								return(
								<RangeControl
									key={ key }
									label={ upperFirst( key ) }
									className="clear-both"
									value={ boxShadow[ key ] }
									onChange={
										( value ) => {
											setAttributes( { 
												boxShadow: { 
													...boxShadow, 
													[ key ]: value 
												} } );
										}
									}
									initialPosition={ boxShadow[ key ] }
									min={ key === 'x' || key === 'y' ? -100 : 0 }
									max={ 100 }
									step={ 1 }
									allowReset
								/>
							) }
						} )						
					}
					{ 
						boxShadow.usePreset &&
						<div className="flex justify-between">
							<ButtonGroup
								id="shadow-size"
							>
								{
									[
										{ label: __( 'None', 'esnext-example' ), value: 'shadow-none' },
										{ label: 'S', value: 'shadow' },
										{ label: 'M', value: 'shadow-md' },
										{ label: 'L', value: 'shadow-lg' },
										{ label: 'XL', value: 'shadow-xl' },
									].map( ( item ) => {
										return (
											<Button
												key={ item.label }
												isPrimary={ boxShadow.preset === item.value }
												isSecondary={ boxShadow.preset !== item.value }
												onClick={ ( ) => setAttributes( { 
													boxShadow: {
														...boxShadow,
														preset: item.value,
													} }
												) }
											>{ item.label }</Button>
										);
									} )
								}
								</ButtonGroup>							
							</div>
						}						
					</BaseControl>
					<BaseControl
						id="shadow-color"
						label={ __( 'Shadow Color', 'esnext-example' ) }
					>
						<ColorPalette
							id="shadow-color"
							value={ boxShadow.color }
							onChange={ ( color ) => {
								if ( color === undefined ) {
									setAttributes( { 
										boxShadow: {
											...boxShadow,
											color: convertToRGB( '#000000' ),
										} 
									} );
								} else {
									setAttributes( { 
										boxShadow: {
											...boxShadow,
											color: convertToRGB( color ),
										} 
									} );
								}
							}	}
						/>
					</BaseControl>
				</PanelBody>
			}
			</InspectorControls>
		</>
	);
}

export default BoxShadowControls;