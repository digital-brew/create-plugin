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

const PaddingControls = ( props ) => {
	const {
		setAttributes,
		slug,
		initialOpen = false,
		attributes: {
			padding,
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
				</ToolbarGroup>
			}
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Padding settings', 'esnext-example' ) }
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
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default PaddingControls;
