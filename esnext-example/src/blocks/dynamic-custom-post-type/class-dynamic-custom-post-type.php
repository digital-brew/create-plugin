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

		$args = wp_get_recent_posts(
			array(
				'numberposts'      => $attributes['postsToShow'],
				'post_status'      => 'publish',
				'order'            => $attributes['order'],
				'orderby'          => $attributes['orderBy'],
				'suppress_filters' => false,
			)
		);

		if ( isset( $attributes['categories'] ) ) {
			$args['category__in'] = array_column( $attributes['categories'], 'id' );
		}

		$recent_posts = get_posts( $args );

		if ( count( $recent_posts ) === 0 ) {
			return 'No posts';
		}

		$list_items_markup = '';

		foreach ( $recent_posts as $post ) {
			$list_items_markup .= '<li>';

			// Add the featured image.
			if ( $attributes['showFeaturedImage'] && has_post_thumbnail( $post ) ) {
				$list_items_markup .= sprintf(
					'<div><a href="%1$s">%2$s</a></div>',
					esc_url( get_permalink( $post ) ),
					get_the_post_thumbnail(
						$post,
						$attributes['featuredImageSize']
					)
				);
			}

			// Add the post title.
			if ( isset( $attributes['showPostTitle'] ) ) {
				$list_items_markup .= sprintf(
					'<h3><a href="%1$s">%2$s</a></h3>',
					esc_url( get_permalink( $post ) ),
					esc_html( get_the_title( $post ) )
				);
			}

			// Add the post author.
			if ( isset( $attributes['showPostAuthor'] ) ) {
				$list_items_markup .= sprintf(
					'<p>By: %1$s</p>',
					get_the_author_meta( 'display_name', $post->post_author )
				);
			}

			// Add the post date.
			if ( isset( $attributes['showPostDate'] ) ) {
				$list_items_markup .= sprintf(
					'<p><time datetime="%1$s">%2$s</time></p>',
					esc_attr( get_the_date( 'c', $post ) ),
					esc_html( get_the_date( '', $post ) )
				);
			}

			// Add the post excerpt.
			if ( isset( $attributes['showPostExcerpt'] ) ) {
				$list_items_markup .= sprintf(
					'<div>%1$s</div>',
					get_the_excerpt( $post )
				);
			}

			$list_items_markup .= '</li>';
		}

		return sprintf(
			'<div class="wp-block-esnext-example-dynamic-block"><ul class="list-none">%1$s</ul></div>',
			$list_items_markup
		);
	}
}

/**
 * Initialize class.
 *
 * @since 1.0.0
 */
Dynamic_Custom_Post_Type::register();
