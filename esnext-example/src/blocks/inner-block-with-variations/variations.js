/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { name } from './block.json';
import icons from './icons';

const variations = [
	{
		name: 'big-bordered',
		title: __( 'Big Bordered', 'esnext-example' ),
		icon: icons.bigBordered,
		attributes: {
			"borderWidth": "border-8",
			"borderRadius": "rounded-none",
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					/* translators: content placeholder */
					placeholder: __( 'Testimonial', 'esnext-example' ),
					/* translators: content placeholder */
					content: __( 'I am obsessed with building blocks!', 'esnext-example' ),
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
		],
		scope: [ 'block' ],
	},
	{
		name: 'rounded-big-bordered',
		title: __( 'Rounded Big Bordered', 'esnext-example' ),
		icon: icons.roundedBigBordered,
		attributes: {
			"borderWidth": "border-8",
			"customBorderRadius": 30,
			"useCustomBorderRadius": true
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					/* translators: content placeholder */
					placeholder: __( 'Testimonial', 'esnext-example' ),
					/* translators: content placeholder */
					content: __( 'Seriously, I love building blocks!', 'esnext-example' ),
					fontSize: 'larger',
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
		],
		scope: [ 'block' ],
	},
];

export { name, variations };
