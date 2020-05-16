/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, __experimentalBlockVariationPicker } from '@wordpress/block-editor';

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
		'core/heading',
		{
			/* translators: content placeholder */
			placeholder: __( 'Testimonial', 'esnext-example' ),
			/* translators: content placeholder */
			content: __( 'I am obsessed with building blocks!', 'esnext-example' ),
			level: 3,
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
			// put attributes here to use them
		},
	} = props;

	return (
		<div className={ className }>
			<div className={ 'bg-white rounded p-5' }>
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
