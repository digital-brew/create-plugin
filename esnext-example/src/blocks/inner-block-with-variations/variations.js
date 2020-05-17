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
			"borderRadius": {
				"topLeft": 30,
				"bottomLeft": 30,
				"topRight": 30,
				"bottomRight": 30,
				"sync": true,
				"usePreset": true,
				"preset": "rounded-none",
				"toolbar": true,
				"sidebar": true
			},
			"borderWidth": {
				"top": 10,
				"bottom": 10,
				"left": 10,
				"right": 10,
				"sync": true,
				"usePreset": true,
				"preset": "border-8",
				"toolbar": true,
				"sidebar": true
			},
			"padding": {
				"top": 10,
				"bottom": 10,
				"left": 10,
				"right": 10,
				"sync": true,
				"usePreset": true,
				"preset": "p-16",
				"toolbar": true,
				"sidebar": true
			}
		},
		innerBlocks: [
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
		],
		scope: [ 'block' ],
	},
	{
		name: 'rounded-big-bordered',
		title: __( 'Rounded Big Bordered', 'esnext-example' ),
		icon: icons.roundedBigBordered,
		attributes: {
			"borderRadius": {
				"topLeft": 30,
				"bottomLeft": 30,
				"topRight": 30,
				"bottomRight": 30,
				"sync": true,
				"usePreset": false,
				"preset": "rounded-lg",
				"toolbar": true,
				"sidebar": true
			},
			"padding": {
				"top": 10,
				"bottom": 10,
				"left": 10,
				"right": 10,
				"sync": true,
				"usePreset": true,
				"preset": "p-8",
				"toolbar": true,
				"sidebar": true
			},
			"borderWidth": {
				"top": 10,
				"bottom": 10,
				"left": 10,
				"right": 10,
				"sync": true,
				"usePreset": true,
				"preset": "border-8",
				"toolbar": true,
				"sidebar": true
			},
		},
		innerBlocks: [
			[
				'core/heading',
				{
					/* translators: content placeholder */
					placeholder: __( 'Testimonial', 'esnext-example' ),
					/* translators: content placeholder */
					content: __( 'Seriously, I love building blocks!', 'esnext-example' ),
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
		],
		scope: [ 'block' ],
	},
];

export { name, variations };
