/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, Dropdown, MenuGroup, MenuItem, PanelBody, RangeControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from './icons';

const SpacingControls = ( props ) => {
	const {
		setAttributes,
		slug,
		initialOpen = false,
		attributes: {
			padding,
			margin,
		},
	} = props;

	const syncButton = ( property, object, icon ) => <Button 
		onClick={ () => setAttributes( {
			[ property ]: {
				...object,
				"sync": ! object.sync,
			}
		} )
		} 
		icon={ icon } 
	/>;

	return (
		<>
			<BlockControls>
			{
				<ToolbarGroup>
				{
					padding.toolbar &&
					<Dropdown				
						renderToggle={ ( { isOpen, onToggle } ) => {
							return(
								<Button
									icon={ icons.padding }
									label={ __( 'Padding', 'esnext-example' ) }
									onClick={ onToggle }
									aria-haspopup="true"
									aria-expanded={ isOpen }
									showTooltip
								/>
							)							
						} }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									padding.usePreset &&
									<MenuGroup>
									{
									[
										{ 
											label: __( 'None', 'esnext-example' ), icon: icons.paddingNone, value: 'p-0' 
										},
										{ 
											label: __( 'Small', 'esnext-example' ), icon: icons.paddingSmall, value: 'p-2' 
										},
										{ 
											label: __( 'Medium', 'esnext-example' ), icon: icons.paddingMedium, value: 'p-4' 
										},
										{ 
											label: __( 'Large', 'esnext-example' ), icon: icons.paddingLarge, value: 'p-8' 
										},
										{ 
											label: __( 'X-Large', 'esnext-example' ), icon: icons.paddingXLarge, value: 'p-16' 
										},
									].map( ( item ) => {
										return(
											<MenuItem
												icon={ item.icon }
												className={ padding.preset === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
												key={ item.label } 
												onClick={ () => setAttributes( { 
													padding: {
														...padding,
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
									! padding.usePreset && ! padding.sync &&
									[
										{ label: __( 'Top Left' ), value: "topLeft" },
										{ label: __( 'Top Right' ), value: "topRight" },
										{ label: __( 'Bottom Right' ), value: "bottomRight" },
										{ label: __( 'Bottom Left' ), value: "bottomLeft" },							
									].map( ( side ) => {
										return(
											<RangeControl
												key={ side.value }
												label={ side.label }
												value={ padding[ side.value ] }
													beforeIcon={ syncButton( 'padding', padding, 'unlock' ) 
												}
												onChange={
													( value ) => {
														setAttributes( { 
															padding: 
														{ 
															...padding,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ padding.top }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									! padding.usePreset && padding.sync &&
									<RangeControl
										label={ __( 'Padding', 'esnext-example' ) }
										value={ padding.top }
										beforeIcon={ syncButton( 'padding', padding, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( { 
													padding: 
												{ 
													...padding,
													"top": value,
													"bottom": value,
													"left": value,
													"right": value
												}
											} )
											}
										}
										initialPosition={ padding.top }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								}		
								<MenuGroup>				
								<div className={ slug }	>
									<ToggleControl
										className="px-3 pt-3"
										label={ __( 'Custom', 'esnext-example' ) }
										checked={ ! padding.usePreset }
										onChange={ ( ) => setAttributes( { 
											padding: {
												...padding,
												usePreset : ! padding.usePreset
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
				{
					margin.toolbar &&
					<Dropdown			
						renderToggle={ ( { isOpen, onToggle } ) => {
							return(
								<Button
									icon={ icons.margin }
									label={ __( 'Margin', 'esnext-example' ) }
									onClick={ onToggle }
									aria-haspopup="true"
									aria-expanded={ isOpen }
									showTooltip
								/>
							)							
						} }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									margin.usePreset &&
									<MenuGroup>
									{
									[
										{ 
											label: __( 'None', 'esnext-example' ), icon: icons.marginNone, value: 'm-0' 
										},
										{ 
											label: __( 'Small', 'esnext-example' ), icon: icons.marginSmall, value: 'm-2' 
										},
										{ 
											label: __( 'Medium', 'esnext-example' ), icon: icons.marginMedium, value: 'm-4' 
										},
										{ 
											label: __( 'Large', 'esnext-example' ), icon: icons.marginLarge, value: 'm-8' 
										},
										{ 
											label: __( 'X-Large', 'esnext-example' ), icon: icons.marginXLarge, value: 'm-16' 
										},
									].map( ( item ) => {
										return(
											<MenuItem
												icon={ item.icon }
												className={ margin.preset === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
												key={ item.label } 
												onClick={ () => setAttributes( { 
													margin: {
														...margin,
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
									! margin.usePreset && ! margin.sync &&
									[
										{ label: __( 'Top' ), value: "top" },
										{ label: __( 'Right' ), value: "right" },
										{ label: __( 'Bottom' ), value: "bottom" },
										{ label: __( 'Left' ), value: "left" },							
									].map( ( side ) => {
										return(
											<RangeControl
												key={ side.value }
												label={ side.label }
												value={ margin[ side.value ] }
													beforeIcon={ syncButton( 'margin', margin, 'unlock' ) 
												}
												onChange={
													( value ) => {
														setAttributes( { 
															margin: 
														{ 
															...margin,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ margin.top }
												min={ -200 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									! margin.usePreset && margin.sync &&
									<RangeControl
										label={ __( 'Margin', 'esnext-example' ) }
										value={ margin.top }
										beforeIcon={ syncButton( 'margin', margin, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( { 
													margin: 
												{ 
													...margin,
													"top": value,
													"bottom": value,
													"left": value,
													"right": value
												}
											} )
											}
										}
										initialPosition={ margin.top }
										min={ -200 }
										max={ 200 }
										step={ 1 }
									/>
								}		
								<MenuGroup>				
								<div className={ slug }	>
									<ToggleControl
										className="px-3 pt-3"
										label={ __( 'Custom', 'esnext-example' ) }
										checked={ ! margin.usePreset }
										onChange={ ( ) => setAttributes( { 
											margin: {
												...margin,
												usePreset : ! margin.usePreset
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
			}
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Spacing settings', 'esnext-example' ) }
					initialOpen={ initialOpen }
				>
					{
						padding.sidebar &&
						<BaseControl
							id="padding"
							className={ slug }
							label={ __( 'Padding', 'esnext-example' ) }
						>
						<Button
							className="float-right mb-3"
							isTertiary
							isSmall
							onClick={ () => setAttributes( { 
								padding: {
									...padding,
									usePreset: ! padding.usePreset,
								}
							} ) }
							>
							{ ! padding.usePreset ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
						</Button>
						{
							! padding.usePreset && ! padding.sync &&
							[
								{ label: __( 'Top' ), value: "top" },
								{ label: __( 'Right' ), value: "right" },
								{ label: __( 'Bottom' ), value: "bottom" },
								{ label: __( 'Left' ), value: "left" },
							].map( ( side ) => {
								return(
									<RangeControl
										key={ side.value }
										label={ side.label }
										value={ padding[ side.value ] }
											beforeIcon={ syncButton( 'padding', padding, 'unlock' ) 
										}
										onChange={
											( value ) => {
												setAttributes( { 
													padding: 
												{ 
													...padding,
													[ side.value ]: value,
												}
											} )
											}
										}
										initialPosition={ padding[ side.value ] }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								)
							} )
						}
						{
							! padding.usePreset && padding.sync &&
							<RangeControl
								value={ padding.top }
								beforeIcon={ syncButton( 'padding', padding, 'lock' ) }
								onChange={
									( value ) => {
										setAttributes( { 
											padding: 
										{ 
											...padding,
											"top": value,
											"bottom": value,
											"left": value,
											"right": value
										}
									} )
									}
								}
								initialPosition={ padding.top }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>
						}
						{
							padding.usePreset &&
							<div className="flex justify-between">							
									<ButtonGroup
										id="padding"
									>
									{
										[
											{ label: __( 'None', 'esnext-example' ), value: 'p-0' },
											{ label: 'S', value: 'p-2' },
											{ label: 'M', value: 'p-4' },
											{ label: 'L', value: 'p-8' },
											{ label: 'XL', value: 'p-16' },
										].map( ( item ) => {
											return (
												<Button
													key={ item.label }
													isPrimary={ padding.preset === item.value }
													isSecondary={ padding.preset !== item.value }
													onClick={ ( ) => setAttributes( { 
														padding: {
															...padding,
															preset: item.value
														}
													} ) }
												>{ item.label }</Button>
											);
										} )
									}
								</ButtonGroup>
							</div>
						}
						</BaseControl>
					}
					{
						margin.sidebar &&
						<BaseControl
							id="margin"
							className={ slug }
							label={ __( 'Margin', 'esnext-example' ) }
						>
						<Button
							className="float-right mb-3"
							isTertiary
							isSmall
							onClick={ () => setAttributes( { 
								margin: {
									...margin,
									usePreset: ! margin.usePreset,
								}
							} ) }
							>
							{ ! margin.usePreset ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
						</Button>
						{
							! margin.usePreset && ! margin.sync &&
							[
								{ label: __( 'Top' ), value: "top" },
								{ label: __( 'Right' ), value: "right" },
								{ label: __( 'Bottom' ), value: "bottom" },
								{ label: __( 'Left' ), value: "left" },
							].map( ( side ) => {
								return(
									<RangeControl
										key={ side.value }
										label={ side.label }
										value={ margin[ side.value ] }
											beforeIcon={ syncButton( 'margin', margin, 'unlock' ) 
										}
										onChange={
											( value ) => {
												setAttributes( { 
													margin: 
												{ 
													...margin,
													[ side.value ]: value,
												}
											} )
											}
										}
										initialPosition={ margin[ side.value ] }
										min={ -200 }
										max={ 200 }
										step={ 1 }
									/>
								)
							} )
						}
						{
							! margin.usePreset && margin.sync &&
							<RangeControl
								value={ margin.top }
								beforeIcon={ syncButton( 'margin', margin, 'lock' ) }
								onChange={
									( value ) => {
										setAttributes( { 
											margin: 
										{ 
											...margin,
											"top": value,
											"bottom": value,
											"left": value,
											"right": value
										}
									} )
									}
								}
								initialPosition={ margin.top }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>
						}
						{
							margin.usePreset &&
							<div className="flex justify-between">							
									<ButtonGroup
										id="margin"
									>
									{
										[
											{ label: __( 'None', 'esnext-example' ), value: 'm-0' },
											{ label: 'S', value: 'm-2' },
											{ label: 'M', value: 'm-4' },
											{ label: 'L', value: 'm-8' },
											{ label: 'XL', value: 'm-16' },
										].map( ( item ) => {
											return (
												<Button
													key={ item.label }
													isPrimary={ margin.preset === item.value }
													isSecondary={ margin.preset !== item.value }
													onClick={ ( ) => setAttributes( { 
														margin: {
															...margin,
															preset: item.value
														}
													} ) }
												>{ item.label }</Button>
											);
										} )
									}
								</ButtonGroup>
							</div>
						}
						</BaseControl>
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default SpacingControls;