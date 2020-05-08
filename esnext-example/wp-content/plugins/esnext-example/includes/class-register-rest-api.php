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
 * Register custom rest API endpoints.
 *
 * @since 1.0.0
 */
class Register_Rest_API {
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
		add_action( 'rest_api_init', array( $instance, 'register_routes' ) );
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
	 * Register custom API routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$plugin_instance = $this->plugin_instance;
		$slug            = $plugin_instance->slug;

		// Register get_options route.
		register_rest_route(
			$slug . '/v1',
			'/settings/',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_settings' ),
			)
		);

		// Register update_options route.
		// Path variable is passed on to callback along with data.
		// We can define any path variable.
		register_rest_route(
			$slug . '/v1',
			'/settings/(?P<setting_name>[a-zA-Z0-9-_]+)',
			array(
				'methods'  => 'POST',
				'callback' => array( $this, 'update_settings' ),
			)
		);
	}

	/**
	 * Callback for GET /options/ route.
	 *
	 * @return $response
	 */
	public function get_settings() {
		$plugin_instance = $this->plugin_instance;
		$slug_           = $plugin_instance->slug_;
		$settings        = get_option( $slug_ . 'settings' );

		$response = new WP_REST_Response( $settings, 200 );

		return $response;
	}

	/**
	 * Callback for POST /settings/ route.
	 *
	 * @return $response
	 */
	public function update_settings( $request ) {
		$plugin_instance = $this->plugin_instance;
		$slug_           = $plugin_instance->slug_;
		file_put_contents('php://stderr', print_r($request, TRUE));
		// Grab the setting from the path variable setting_name.
		$setting = $request['setting_name'];
		// Since we are passing a JSON string, we can use the
		// get_json_params() method to retrieve the parameters.
		// This also allows us to grab the setting value we need to update.
		$request_body = $request->get_json_params();
		// Since our settings are stored in a multi-dimensional array
		// we need to grab the entire array and update the setting
		// corresponding with the request we received.
		$settings = get_option( $slug_ . 'settings' );
		// Update the setting that corresponds with the request.
		$settings[ $setting ] = $request_body[ $setting ];
		// Update the entire settings array with the updated settings.
		update_option( $slug_ . 'settings', $settings );
		// If we need the data in the response, pass it back here,
		// otherwise we're just passing back true and a 201 server code.
		$response = new WP_REST_Response( $settings, 201 );

		return $response;
	}
}
