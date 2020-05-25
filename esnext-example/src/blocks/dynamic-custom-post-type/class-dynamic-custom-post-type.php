<?php
/**
 * Render dynamic block.
 *
 * @package CreatePlugin
 */

namespace CreatePlugin;

// Stop the hackers if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render dynamic block in php.
 *
 * @since 1.0.0
 */
class Dynamic_Custom_Post_Type {
	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_dynamic_custom_post_type' ) );
	}

	/**
	 * Registers the `esnext-example/dynamic-block` block on server.
	 */
	public function register_dynamic_custom_post_type() {
		$path     = __DIR__ . '/block.json';
		$metadata = json_decode( file_get_contents( $path ), true );

		register_block_type(
			$metadata['name'],
			array_merge(
				$metadata,
				array(
					'render_callback' => array( new Dynamic_Custom_Post_Type(), 'render' ),
				)
			)
		);
	}

	/**
	 * Render dynamic block markup.
	 *
	 * @param Array  $attributes block attributes.
	 * @param String $content block inner content.
	 * @return string The dynamic block markup.
	 */
	public function render( $attributes, $content ) {

		$args = array(
			'post_type'        => $attributes['postType'],
			'numberposts'      => $attributes['postsToShow'],
			'post_status'      => 'publish',
			'order'            => $attributes['order'],
			'orderby'          => $attributes['orderBy'],
			'suppress_filters' => false,
		);

		if ( isset( $attributes['categories'] ) && ! isset( $attributes['taxonomy'] ) ) {
			$args['category__in'] = array_column(
				$attributes['categories'],
				'id'
			);
		}

		if ( count( $attributes['categories'] ) > 0 && isset( $attributes['taxonomy'] ) ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => $attributes['taxonomy'],
					'field'    => 'term_id',
					'terms'    => array_column(
						$attributes['categories'],
						'id'
					),
				),
			);
		}

		$recent_posts = get_posts( $args );

		if ( count( $recent_posts ) === 0 ) {
			return 'No posts';
		}

		$posts = '';

		foreach ( $recent_posts as $post ) {
			$posts .= $post->post_content;
		}

		return $posts;
	}
}

/**
 * Initialize class.
 *
 * @since 1.0.0
 */
Dynamic_Custom_Post_Type::register();
