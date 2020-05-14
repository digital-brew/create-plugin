/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, MediaPlaceholder } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './editor.scss';
import './style.scss';

/**
 * Module Constants
 */
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading' ];
const TEMPLATE = [
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Testimonial', 'esnext-example' ),
			/* translators: content placeholder */
			content: __( 'I am obsessed with learning how to build blocks!', 'esnext-example' ),
			fontSize: 'large',
			className: 'mt-8',
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Author\'s name', 'esnext-example' ),
			/* translators: content placeholder */
			content: __( 'Lee Shadle', 'esnext-example' ),
			fontSize: 'regular',
			className: 'mb-0',
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Author\'s position', 'esnext-example' ),
			/* translators: content placeholder */
			content: __( 'Teacher @ blockhandbook.com', 'esnext-example' ),
			fontSize: 'small',
			customTextColor: '#bbb',
			className: 'mb-0',
		},
	],
];

const Edit = ( props ) => {
	const {
		attributes,
		className,
		setAttributes,
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

	const containerClasses = classnames(
		`p-10 bg-white ${ borderStyle } overflow-hidden`,
		{
			[ `${ borderRadius }` ]: ! useCustomBorderRadius,
			[ `${ borderWidth }` ]: ! useCustomBorderWidth,
		} );
 console.log( containerClasses )
	const containerStyle = {
	 borderColor,
	 borderRadius: useCustomBorderRadius ? customBorderRadius : null,
	 borderWidth: useCustomBorderWidth ? customBorderWidth : null,
	};

	return (
		<div className={ className }>
			<div className={ containerClasses } style={ containerStyle }>
				<Controls
					className={ className }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ true }
				/>
			</div>
		</div>		
	);
}

export default Edit;
