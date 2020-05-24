<?php
/**
 * Register custom post type
 *
 * @package CreatePlugin
 */

namespace CreatePlugin;

use \CreatePlugin\Plugin as Plugin;

// Stop the hackers if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register custom post type.
 *
 * @since 1.0.0
 */
class Register_Custom_Post_Types {
	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_team_post_type' ), 20 );
	}

	/**
	 * Register custom post type.
	 *
	 * @return void
	 */
	public function register_team_post_type() {
		register_post_type(
			'esnext_example_team',
			array(
				'labels'        => array(
					'name'          => __( 'Team', 'esnext-example' ),
					'singular_name' => __( 'Team Member', 'esnext-example' ),
					'add_new'       => __( 'Add New Member', 'esnext-example' ),
					'add_new_item'  => __( 'Add New Team Member', 'esnext-example' ),
					'new_item'      => __( 'New Team Member', 'esnext-example' ),
				),
				'taxonomies'    => array( 'department' ),
				'public'        => true,
				'has_archive'   => true,
				'rewrite'       => array(
					'slug' => 'team', // Custom slug.
				),
				'show_in_rest' => true, // Use in block editor.
				'supports'      => array(
					'title',
					'editor',
					'author',
					'thumbnail',
					'excerpt',
				),
				'template_lock' => 'all',
				'template'      => array(
					array(
						'core/group',
						array(
							'align'           => 'full',
							'backgroundColor' => 'subtle-background',
						),
						array(
							array(
								'core/columns',
								array(
									'align'             => 'wide',
									'verticalAlignment' => 'center',
								),
								array(
									array(
										'core/column',
										array( 'width' => 33.33 ),
										array(
											array(
												'core/image',
												array(),
											),
										),
									),
									array(
										'core/column',
										array( 'width' => 66.66 ),
										array(
											array(
												'core/heading',
												array( 'placeholder' => 'Name' ),
											),
											array(
												'core/paragraph',
												array( 'placeholder' => 'Bio' ),
											),
											array(
												'core/paragraph',
												array( 'placeholder' => 'Title' ),
											),
										),
									),
								),
							),
						),
					),
				),
			)
		);
	}
}
