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
 * Register global plugin settings.
 *
 * @since 1.0.0
 */
class Plugin_Settings {
	/**
	 * The plugin instance.
	 *
	 * @var array
	 */
	private $plugin_instance;

	/**
	 * Register class with appropriate WordPress hooks.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'set_plugin_settings' ) );
		// Pass settings variable to plugin store instead of grabbing
		// settings via a resolver on page load.
		add_action( 'enqueue_block_editor_assets', array( $instance, 'init_plugin_store' ) );
	}

	/**
	 * Construct the Plugin_Settings class.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __construct() {
		$this->plugin_instance = Plugin::get_instance();
	}

	/**
	 * Add global plugin options.
	 *
	 * @return void
	 */
	public function set_plugin_settings() {
		// Shortcuts for variables.
		$plugin_instance = $this->plugin_instance;
		$slug_           = $plugin_instance->slug_;
		$slug            = $plugin_instance->slug;

		$settings = array(
			'defaults' => array(
				array( 'classname' => true ),
			),
		);
		// add_option only adds options if they don't yet exist.
		add_option( $slug_ . 'settings', $settings );
		// uncomment this to reset the settings object for testing.
		// delete_option( $slug_ . 'settings' );
	}

	/**
	 * Make settings available to plugin data store.
	 *
	 * @return void
	 */
	public function init_plugin_store() {
		$plugin_instance = $this->plugin_instance;
		$slug_           = $plugin_instance->slug_;
		$slug            = $plugin_instance->slug;

		// Read in existing settings values from database.
		$settings = get_option( $slug_ . 'settings' );
		// Create an object of all plugin settings that we need.
		// We will then load these in the redux store and
		// create actions for updating shared global state.
		// Uncomment this if we want to load the redux store from the wp_local_script.
		wp_localize_script(
			$slug . '-block-editor',
			$slug_ . 'settings',
			array(
				'settings' => $settings,
			)
		);
	}

}
