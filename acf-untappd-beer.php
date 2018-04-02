<?php

/*
Plugin Name: Advanced Custom Fields: Untappd Beer
Plugin URI: https://github.com/Craftpeak/acf-untappd-beer
Description: ACF field to retrieve a beer from the Untappd API and store basic data associated with it.
Version: 1.0.0
Author: Craftpeak
Author URI: https://craftpeak.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('cp_acf_plugin_untappd_beer') ) :

class cp_acf_plugin_untappd_beer {

	// vars
	var $settings;


	/*
	*  __construct
	*
	*  This function will setup the class functionality
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	void
	*  @return	void
	*/

	function __construct() {

		// settings
		// - these will be passed into the field class.
		$this->settings = array(
			'version'	=> '1.0.0',
			'url'		=> plugin_dir_url( __FILE__ ),
			'path'		=> plugin_dir_path( __FILE__ )
		);


		// include field
		add_action('acf/include_field_types', 	array($this, 'include_field')); // v5
	}


	/*
	*  include_field
	*
	*  This function will include the field type class
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	$version (int) major ACF version. Defaults to 4
	*  @return	void
	*/

	function include_field( $version = 4 ) {

		// load cp-untappd-beer
		load_plugin_textdomain( 'cp-untappd-beer', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' );


		// include
		include_once('fields/class-cp-acf-field-untappd-beer-v' . $version . '.php');
	}

}


// initialize
new cp_acf_plugin_untappd_beer();


// class_exists check
endif;

?>
