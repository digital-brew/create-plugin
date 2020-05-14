/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, Dropdown, MenuGroup, MenuItem, PanelBody, RangeControl, SelectControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import icons from './icons';

const BorderControls = ( props ) => {
	const {
		setAttributes,
		slug,
		attributes: {
			borderColor,
			borderRadius,
			borderStyle,
			borderWidth,
			customBorderRadius,
			customBorderWidth,
			useCustomBorderRadius,
			useCustomBorderWidth,
		},
	} = props;

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown						
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.borderRadius }
								label={ __( 'Border Radius', 'esnext-example' ) }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									!	useCustomBorderRadius &&
									<MenuGroup>
									{
									[
										{ 
											label: __( 'None', 'esnext-example' ), icon: icons.borderRadiusNone, value: 'rounded-none' 
										},
										{ 
											label: __( 'Small', 'esnext-example' ), icon: icons.borderRadiusSmall, value: 'rounded-sm' 
										},
										{ 
											label: __( 'Medium', 'esnext-example' ), icon: icons.borderRadiusMedium, value: 'rounded' 
										},
										{ 
											label: __( 'Large', 'esnext-example' ), icon: icons.borderRadiusLarge, value: 'rounded-md' 
										},
										{ 
											label: __( 'X-Large', 'esnext-example' ), icon: icons.borderRadiusXLarge, value: 'rounded-lg' 
										},
									].map( ( item ) => {
										return(
											<MenuItem
												icon={ item.icon }
												className={ borderRadius === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
												key={ item.label } 
												onClick={ () => setAttributes( { borderRadius: item.value } ) }
											>
												{ item.label }
											</MenuItem>
										)
									})
								}
									</MenuGroup>
								}
								{
									useCustomBorderRadius &&
									<MenuGroup>
									<div className={ slug }	>
										<div className="px-3 pb-0 pt-3">
										{
											useCustomBorderRadius &&
											<RangeControl
												value={ customBorderRadius }
												showTooltip={ false }
												onChange={
													( value ) => {
														setAttributes( { customBorderRadius: value } );
													}
												}
												initialPosition={ customBorderRadius }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
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
										checked={ useCustomBorderRadius }
										onChange={ ( ) => setAttributes( { useCustomBorderRadius: ! useCustomBorderRadius } ) }
									/>
								</div>
								</MenuGroup>	
							</div>
								</div>
							) } 
						}
					/>
					<Dropdown						
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.borderWidth }
								label={ __( 'Border Width', 'esnext-example' ) }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									!	useCustomBorderWidth &&
									<MenuGroup>
									{
										[
											{ 
												label: __( 'None', 'esnext-example' ), icon: icons.borderWidth, value: 'border-0' 
											},
											{ 
												label: __( 'Small', 'esnext-example' ), icon: icons.borderWidthSmall, value: 'border' 
											},
											{ 
												label: __( 'Medium', 'esnext-example' ), icon: icons.borderWidthMedium, value: 'border-2' 
											},
											{ 
												label: __( 'Large', 'esnext-example' ), icon: icons.borderWidthLarge, value: 'border-4' 
											},
											{ 
												label: __( 'X-Large', 'esnext-example' ), icon: icons.borderWidthXLarge, value: 'border-8' 
											},
										].map( ( item ) => {
											return(
												<MenuItem
													icon={ item.icon }
													className={ borderWidth === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
													key={ item.label } 
													onClick={ () => setAttributes( { borderWidth: item.value } ) }
												>
													{ item.label }
												</MenuItem>
											)
										})
									}
								</MenuGroup>
								}
								{
									useCustomBorderWidth &&
									<MenuGroup>
									<div className={ slug }	>
										<div className="px-3 pb-0 pt-3">
										{
											useCustomBorderWidth &&
											<RangeControl
												value={ customBorderWidth }
												showTooltip={ false }
												onChange={
													( value ) => {
														setAttributes( { customBorderWidth: value } );
													}
												}
												initialPosition={ customBorderWidth }
												min={ 0 }
												max={ 50 }
												step={ 1 }
											/>
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
										checked={ useCustomBorderWidth }
										onChange={ ( ) => setAttributes( { useCustomBorderWidth: ! useCustomBorderWidth } ) }
									/>
								</div>
								</MenuGroup>	
							</div>
								</div>
							) } 
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Border Settings', 'esnext-example' ) }
					initialOpen={ false }
				>
					<BaseControl
						id="border-radius"
						className={ slug }
						label={ __( 'Border Radius', 'esnext-example' ) }
					>
					<Button 
						className="float-right mb-3"
						isTertiary
						isSmall
						onClick={ () => setAttributes( { useCustomBorderRadius: ! useCustomBorderRadius } ) }
						>
						{ useCustomBorderRadius ? 'Defaults' : 'Custom' }
					</Button>
					{
						useCustomBorderRadius &&
						<RangeControl
							value={ customBorderRadius }
							onChange={
								( value ) => {
									setAttributes( { customBorderRadius: value } );
								}
							}
							initialPosition={ customBorderRadius }
							min={ 0 }
							max={ 200 }
							step={ 1 }
							allowReset
						/>
					}
					{
						! useCustomBorderRadius &&
						<div className="flex justify-between">							
								<ButtonGroup
									id="border-radius"
								>
								{
									[
										{ label: __( 'None', 'esnext-example' ), value: 'rounded-none' },
										{ label: 'S', value: 'rounded-sm' },
										{ label: 'M', value: 'rounded' },
										{ label: 'L', value: 'rounded-md' },
										{ label: 'XL', value: 'rounded-lg' },
									].map( ( item ) => {
										return (
											<Button
												key={ item.label }
												isPrimary={ borderRadius === item.value }
												isSecondary={ borderRadius !== item.value }
												onClick={ ( ) => setAttributes( { borderRadius: item.value } ) }
											>{ item.label }</Button>
										);
									} )
								}
							</ButtonGroup>
						</div>
					}
					</BaseControl>
					<BaseControl
						id="border-width"
						className={ slug }
						label={ __( 'Border Width', 'esnext-example' ) }
					>
					<Button 
						className="float-right mb-3"
						isTertiary
						isSmall
						onClick={ () => setAttributes( { useCustomBorderWidth: ! useCustomBorderWidth } ) }
						>
						{ useCustomBorderWidth ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
					</Button>
					{
						useCustomBorderWidth &&
						<RangeControl
							value={ customBorderWidth }
							onChange={
								( value ) => {
									setAttributes( { customBorderWidth: value } );
								}
							}
							initialPosition={ customBorderWidth }
							min={ 0 }
							max={ 50 }
							step={ 1 }
							allowReset
						/>
					}
					{
						! useCustomBorderWidth &&
						<div className="flex justify-between">							
								<ButtonGroup
									id="border-width"
								>
								{
									[
										{ label: __( 'None', 'esnext-example' ), value: 'border-0' },
										{ label: 'S', value: 'border' },
										{ label: 'M', value: 'border-2' },
										{ label: 'L', value: 'border-4' },
										{ label: 'XL', value: 'border-8' },
									].map( ( item ) => {
										return (
											<Button
												key={ item.label }
												isPrimary={ borderWidth === item.value }
												isSecondary={ borderWidth !== item.value }
												onClick={ ( ) => setAttributes( { borderWidth: item.value } ) }
											>{ item.label }</Button>
										);
									} )
								}
							</ButtonGroup>
						</div>
					}
					</BaseControl>
					<SelectControl
						label={ __( 'Border Style', 'esnext-example' ) }
						value={ borderStyle }
						options={
							[
								{ label: __( 'None', 'esnext-example' ), value: 'border-none' },
								{ label: __( 'Solid', 'esnext-example' ), value: 'border-solid' },
								{ label: __( 'Dashed', 'esnext-example' ), value: 'border-dashed' },
								{ label: __( 'Dotted', 'esnext-example' ), value: 'border-dotted' },
								{ label: __( 'Double', 'esnext-example' ), value: 'border-double' },
							]
						}
						onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
					/>
					<BaseControl
						id="border-color"
						label={ __( 'Border Color', 'esnext-example' ) }
					>
						<ColorPalette
							id="border-color"
							value={ borderColor }
							onChange={ ( color ) => setAttributes( { borderColor: color } )	}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default BorderControls;