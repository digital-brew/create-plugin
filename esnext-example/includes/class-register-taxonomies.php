<?php
/**
 * Register custom taxonomies
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
 * Register custom taxonomies.
 *
 * @since 1.0.0
 */
class Register_Taxonomies {
	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_department_taxonomy' ), 5 );
	}

	/**
	 * Register department taxonmony.
	 *
	 * @return void
	 */
	public function register_department_taxonomy() {
		register_taxonomy(
			'department',  // The name of the taxonomy. Name should be in slug form (must not contain capital letters or spaces).
			'esnext_example_team', // Post type name.
			array(
				'hierarchical'      => true,
				'labels'            => array(
					'name'          => __( 'Departments', 'esnext-example' ),
					'singular_name' => __( 'Department', 'esnext-example' ),
					'all_items'     => __( 'All Departments', 'esnext-example' ),
					'search_items'  => __( 'Search Departments', 'esnext-example' ),
				),
				'public'            => true,
				'query_var'         => true,
				'rewrite'           => array(
					'slug'       => 'department',
					'with_front' => false,
				),
				'show_admin_column' => true,
				'show_ui'           => true,
				'show_in_rest'      => true,
			)
		);
	}
}
