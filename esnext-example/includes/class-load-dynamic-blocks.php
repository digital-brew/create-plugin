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
 * Load dynamic blocks.
 *
 * @since 1.0.0
 */
class Load_Dynamic_Blocks {
	/**
	 * Construct the Load_Dynamic_Blocks class.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->load_dynamic_blocks();
	}

	/**
	 * Load dynamic blocks render templates as well as any other
	 * dynamic block logic.
	 *
	 * @since 1.0.0
	 */
	private function load_dynamic_blocks() {
		// Loop through and load dynamic block php files.
		foreach ( glob( dirname( dirname( __FILE__ ) ) . '/src/blocks/*/class-*.php' ) as $dynamic_block ) {
			require_once $dynamic_block;
		};
	}
}

