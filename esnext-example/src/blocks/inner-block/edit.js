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
const ALLOWED_MEDIA_TYPES = [ 'image' ];
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading' ];
const TEMPLATE = [
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Testimonial', 'turbocharged-testimonial-block' ),
			/* translators: content placeholder */
			content: __( 'I am obsessed with learning how to build blocks!', 'turbocharged-testimonial-block' ),
			fontSize: 'large',
			className: 'mt-8',
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Author\'s name', 'turbocharged-testimonial-block' ),
			/* translators: content placeholder */
			content: __( 'Lee Shadle', 'turbocharged-testimonial-block' ),
			fontSize: 'regular',
			className: 'mb-0',
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Author\'s position', 'turbocharged-testimonial-block' ),
			/* translators: content placeholder */
			content: __( 'Teacher @ blockhandbook.com', 'turbocharged-testimonial-block' ),
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
			// put attribute key names here to use them
		},
	} = props;

	const containerClasses = classnames( {

	} );

	return (
		<div className={ containerClasses }>
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
	);
}

export default Edit;
