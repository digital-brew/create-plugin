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
import icon from './icon';

const variations = [
		{
			name: 'big-bordered',
			title: __( 'Big Bordered', 'esnext-example' ),
			icon: icon,
			attributes: {
				"borderWidth": "border-8",
				"borderRadius": "rounded-lg",
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
	];

export { name, variations };
