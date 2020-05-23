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
class Register_Custom_Post_Type {
	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_custom_post_type' ) );
	}

	/**
	 * Register custom post type.
	 *
	 * @return void
	 */
	public function register_custom_post_type() {
		// Shortcuts for variables.
		$instance        = Plugin::get_instance();
		$slug            = $instance->slug;
		$plugin_dir_path = $instance->plugin_dir_path;
		$plugin_dir_url  = $instance->plugin_dir_url;

		register_post_type(
			'esnext_example_team',
			array(
				'labels'       => array(
					'name'          => __( 'Team', 'esnext-example' ),
					'singular_name' => __( 'Member', 'esnext-example' ),
					'add_new'       => __( 'Add New Member', 'esnext-example' ),
					'add_new_item'  => __( 'Add New Team Member', 'esnext-example' ),
					'new_item'      => __( 'New Team Member', 'esnext-example' ),
				),
				'public'       => true,
				'has_archive'  => true,
				'rewrite'      => array(
					'slug' => 'team', // Custom slug.
				),
				'show_in_rest' => true, // Use in block editor.
				'supports'     => array(
					'title',
					'editor',
					'author',
					'thumbnail',
					'excerpt',
				),
				'template'     => array(
					array(
						'core/image',
						array(
							'align' => 'left',
						),
					),
					array(
						'core/heading',
						array(
							'placeholder' => 'Add Author...',
						),
					),
					array(
						'core/paragraph',
						array(
							'placeholder' => 'Add Description...',
						),
					),
				),
			)
		);
	}
}
