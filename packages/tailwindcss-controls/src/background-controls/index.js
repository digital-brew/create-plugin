/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, FocalPointPicker, PanelBody, PanelRow, Panel, RangeControl, ToggleControl, ToolbarGroup, SelectControl } from '@wordpress/components';
import { BlockControls, ColorPalette, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { useCallback, useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import icons from './icons';

/**
 * 
 * Module Constants
 */
const ALLOWED_MEDIA_TYPES = [ 'image' ];

const BackgroundControls = ( props ) => {
	const {
		setAttributes,
		slug,
		initialOpen = false,
		attributes: {
			backgroundColor,
			backgroundImage,
		},
	} = props;

	const [ backgroundSettings, toggleBackgroundSettings ] = useState( 'repeat' );

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

	// Will not change unless media changes
	const onSelectImage = useCallback(
		( media ) => {
			setAttributes( {
				backgroundImage: {
					...backgroundImage,
					url: media.url,
					id: media.id
				},
			} );
		},
		[ setAttributes ]
	);

	return (
		<>
			<BlockControls>
			{
				backgroundImage.toolbar &&
				<ToolbarGroup>
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ backgroundImage.id }
						render={ ( { open } ) => (
							<Button
								className="components-toolbar__control"
								label={ __( 'Background Image', 'esnext-example' ) }
								icon={ icons.backgroundImage }
								onClick={ open }
							/>
						) }
					/>
				</ToolbarGroup>
			}
			</BlockControls>
			<InspectorControls>
			<PanelBody
					title={ __( 'Background settings', 'esnext-example' ) }
					initialOpen={ false }
				>
					{
						! backgroundImage.url && backgroundImage.sidebar &&
						<BaseControl
						title={ __( 'Background image', 'esnext-example' ) }
						>
							<MediaUpload
								onSelect={ onSelectImage }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ backgroundImage.id }
								render={ ( { open } ) => (
									<Button
										className="components-button editor-post-featured-image__toggle"
										onClick={ open }
									>
										{ __( 'Select image', 'esnext-example' ) }
									</Button>
								) }
							/>
						</BaseControl>
					}
					{
						backgroundImage.url && backgroundImage.sidebar &&
						<>
							<ToggleControl
								label={ __( 'Custom image sizing', 'esnext-example' ) }
								checked={ backgroundImage.customSize }
								onChange={ ( ) => {
									toggleBackgroundSettings( 'repeat' );
									setAttributes( { 
									backgroundImage : {
										...backgroundImage,
										customSize: ! backgroundImage.customSize
									}
								} ) } }
							/>
							{
								backgroundImage.customSize && 
								<>
									<FocalPointPicker
										url={ backgroundImage.url }
										value={ backgroundImage.focalPoint }
										onChange={ ( focalPoint ) => setAttributes( {
											backgroundImage: {
												...backgroundImage,
												focalPoint,
											}
										} ) }
									/>
									<RangeControl
										label={ __( 'Image size', 'esnext-example' ) }
										value={ backgroundImage.size }
										onChange={
											( size ) => {
												setAttributes( { 
													backgroundImage: {
														...backgroundImage,
														size,
													}
												} );
											}
										}
										initialPosition={ backgroundImage.size }
										min={ 0 }
										max={ 1000 }
										step={ 50 }
										allowReset
									/>
								</>
							}
							<BaseControl>
								<div className="esnext-example">
									{
										! backgroundImage.customSize &&
											<MediaUpload
												onSelect={ onSelectImage }
												allowedTypes={ ALLOWED_MEDIA_TYPES }
												value={ backgroundImage.id }
												render={ ( { open } ) => (
													<Button className="h-24 d-block w-full hover:bg-gray-200 mb-2" onClick={ open }>
														<img className="h-24 mx-auto" src={ backgroundImage.url } 	alt="" />
													</Button>
												) }
											/>
									}
									<PanelRow>
										{/* <MediaUpload
											onSelect={ onSelectImage }
											allowedTypes={ ALLOWED_MEDIA_TYPES }
											value={ backgroundImage.id }
											render={ ( { open } ) => (
												<Button
													isSecondary
													isSmall
													onClick={ open }
												>
													Replace Image
												</Button>
											) }
										/> */}
										<Button
											className="ml-auto"
											isSecondary
											isSmall
											onClick={ () => setAttributes( { 
												backgroundImage: {
													...backgroundImage,
													url: '',
													id: '',
												}
											} ) }
										>
											Clear Image
										</Button>
									</PanelRow>
								</div>
							</BaseControl>
							<BaseControl
							>
								<ButtonGroup
									id="background-properties"
								>
									{
										[
											{ label: __( 'Repeat', 'esnext-example' ), value: 'm-0', name: 'repeat' },
											{ label: __(  'Position', 'esnext-example' ), value: 'm-2', name: 'position' },
											{ label: __( 'Size', 'esnext-example' ), value: 'm-4', name: 'size' },
											{ label: __( 'Attachment', 'esnext-example' ), value: 'm-8', name: 'attachment' },
										].map( ( item ) => {
											if( ! backgroundImage.customSize || backgroundImage.customSize && item.name === 'repeat' || backgroundImage.customSize && item.name === 'attachment' ) {
												return (
												<Button
													key={ item.label }
													isPrimary={ backgroundSettings === item.name }
													isSecondary={ backgroundSettings !== item.name }
													isSmall
													onClick={ () => toggleBackgroundSettings( item.name ) }
												>{ item.label }</Button>
											);
											}
										} )
									}
								</ButtonGroup>
							</BaseControl>
							{
								! backgroundImage.customSize && backgroundSettings === 
								'size' &&
								<SelectControl
									label={ __( 'Background size', 'esnext-example' ) }
									value={ backgroundImage.backgroundSize }
									options={
										[
											{ label: __( 'Cover', 'esnext-example' ), value: 'bg-cover' },
											{ label: __( 'Contain', 'esnext-example' ), value: 'bg-contain' },
											{ label: __( 'Auto', 'esnext-example' ), value: 'bg-auto' },
										]
									}
									onChange={ ( size ) => setAttributes( { 
										backgroundImage: {
											...backgroundImage,
											"backgroundSize": size,
										} }
									) }
								/>
							}
							{
								backgroundSettings === 'repeat' &&
								<SelectControl
									label={ __( 'Background repeat', 'esnext-example' ) }
									value={ backgroundImage.repeat }
									options={
										[
											{ label: __( 'No repeat', 'esnext-example' ), value: 'bg-no-repeat' },
											{ label: __( 'Repeat', 'esnext-example' ), value: 'bg-repeat' },
											{ label: __( 'Repeat x', 'esnext-example' ), value: 'bg-repeat-x' },
											{ label: __( 'Repeat y', 'esnext-example' ), value: 'bg-repeat-y' },
											{ label: __( 'Repeat round', 'esnext-example' ), value: 'bg-repeat-round' },
											{ label: __( 'Repeat space', 'esnext-example' ), value: 'bg-repeat-space' },
										]
									}
									onChange={ ( repeat ) => setAttributes( { 
										backgroundImage: {
											...backgroundImage,
											"repeat": repeat,
										} }
									) }
								/>
							}							
							{
								! backgroundImage.customSize && backgroundSettings === 'position' &&
								<SelectControl
									label={ __( 'Background position', 'esnext-example' ) }
									value={ backgroundImage.position }
									options={
										[
											{ label: __( 'Center', 'esnext-example' ), value: 'bg-center' },
											{ label: __( 'Bottom', 'esnext-example' ), value: 'bg-bottom' },
											{ label: __( 'Left', 'esnext-example' ), value: 'bg-left' },
											{ label: __( 'Left Bottom', 'esnext-example' ), value: 'bg-left-bottom' },
											{ label: __( 'Left Top', 'esnext-example' ), value: 'bg-left-top' },
											{ label: __( 'Right', 'esnext-example' ), value: 'bg-right' },
											{ label: __( 'Right Bottom', 'esnext-example' ), value: 'bg-right-bottom' },
											{ label: __( 'Right Top', 'esnext-example' ), value: 'bg-right-top' },
											{ label: __( 'Top', 'esnext-example' ), value: 'bg-top' },
										]
									}
									onChange={ ( size ) => setAttributes( { 
										backgroundImage: {
											...backgroundImage,
											"position": size,
										} }
									) }
								/>
							}
							{
								backgroundSettings === 'attachment' &&
								<SelectControl
									label={ __( 'Background attachment', 'esnext-example' ) }
									value={ backgroundImage.attachment }
									options={
										[
											{ label: __( 'Scroll', 'esnext-example' ), value: 'bg-scroll' },
											{ label: __( 'Fixed', 'esnext-example' ), value: 'bg-fixed' },
											{ label: __( 'Local', 'esnext-example' ), value: 'bg-local' },											
										]
									}
									onChange={ ( attachment ) => setAttributes( { 
										backgroundImage: {
											...backgroundImage,
											"attachment": attachment,
										} }
									) }
								/>
							}
							<RangeControl
								label={ __( 'Background image opacity', 'esnext-example' ) }
								value={ parseInt( backgroundImage.opacity.replace( 'opacity-', '' ) ) }
								onChange={
									( value ) => {
										value = opacity[ value ];
										setAttributes( { 
											backgroundImage: {
												...backgroundImage,
												opacity: value,
											} } );
									}
								}
								initialPosition={ parseInt( backgroundImage.opacity.replace( 'opacity-', '' ) ) }
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>
						</>
					}
					{
						backgroundColor.sidebar &&
						<BaseControl
						id="img-background-color"
						label={ __( 'Background color', 'esnext-example' ) }
					>
						<ColorPalette
							id="img-background-color"
							value={ backgroundColor }
							clearable={ false }
							onChange={ ( color ) => setAttributes( { 
								backgroundColor: {
									...backgroundColor,
									color,
								} } )	}
						/>
					</BaseControl>
					}
					{
						backgroundColor.sidebar &&
						<RangeControl
							label={ __( 'Background color opacity', 'esnext-example' ) }
							value={ parseInt( backgroundColor.opacity.replace( 'opacity-', '' ) ) }
							onChange={
								( value ) => {
									value = opacity[ value ];
									setAttributes( { 
										backgroundColor: {
											...backgroundColor,
											opacity: value,
										} } );
								}
							}
							initialPosition={ parseInt( backgroundColor.opacity.replace( 'opacity-', '' ) ) }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default BackgroundControls;