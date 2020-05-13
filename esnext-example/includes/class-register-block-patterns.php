<?php
/**
 * Register block scripts and styles.
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
 * Register block patterns.
 *
 * @since 1.0.0
 */
class Register_Block_Patterns {
	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_block_patterns' ) );
	}

	/**
	 * Registers all frontend scripts so we can use react on the frontend.
	 *
	 * @return void
	 */
	public function register_block_patterns() {

		if ( function_exists( 'register_pattern' ) ) {
			/**
			* Register block patterns
			* Tool to escape strings: https://onlinestringtools.com/escape-string
			*/
			register_pattern(
				'esnext-example/hero',
				array(
					'title'   => __( 'Hero', 'esnext-example' ),
					'content' => "<!-- wp:group {\"align\":\"full\",\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-group alignfull create-plugin\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns {\"verticalAlignment\":\"top\",\"align\":\"full\",\"className\":\"create-plugin\",\"backgroundColor\":\"subtle-background\"} -->\n<div class=\"wp-block-columns alignfull are-vertically-aligned-top create-plugin has-subtle-background-background-color has-background\"><!-- wp:column {\"verticalAlignment\":\"top\",\"width\":25,\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-column is-vertically-aligned-top create-plugin\" style=\"flex-basis:25%\"></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"verticalAlignment\":\"top\",\"width\":50,\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-column is-vertically-aligned-top create-plugin\" style=\"flex-basis:50%\"><!-- wp:heading {\"align\":\"center\"} -->\n<h2 class=\"has-text-align-center\">Hero Block Pattern</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph {\"align\":\"center\"} -->\n<p class=\"has-text-align-center\">Block Patterns are magical.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:buttons {\"align\":\"center\",\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-buttons aligncenter create-plugin\"><!-- wp:button {\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-button create-plugin\"><a class=\"wp-block-button__link\">Learn More</a></div>\n<!-- /wp:button --></div>\n<!-- /wp:buttons --></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"verticalAlignment\":\"top\",\"width\":25,\"className\":\"create-plugin\"} -->\n<div class=\"wp-block-column is-vertically-aligned-top create-plugin\" style=\"flex-basis:25%\"></div>\n<!-- /wp:column --></div>\n<!-- /wp:columns --></div></div>\n<!-- /wp:group -->",
				)
			);
		}
	}
}
