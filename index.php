<?php

defined( 'ABSPATH' ) or die();

$version = '6.0.1.1';

/**
 * @package kemosite-typography-plugin
 * @version 6.0.1.1
 */
/*
Plugin Name: kemosite-typography-plugin
Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Github Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Author: Kevin Montgomery
Author URI: https://github.com/kemosite/
Description: This plug-in establishes a reasonable typographic baseline for all devices.
Requires at least: 6.0
Version: 6.0.1.1
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: LICENSE
Text Domain: kemosite-wordpress-theme
*/

// Determine whether this is an AMP response.
/*
if (!function_exists('is_amp_detected')):
	function is_amp_detected() {
	    return function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();
	}
endif;
*/

add_action( 'admin_menu', 'kemosite_typography_menu' );

function kemosite_typography_menu() {

	//call register settings function
	add_action( 'admin_init', 'register_kemosite_typography_settings' );

	//create new top-level menu
	add_options_page( 'Typography Settings', 'Typography Settings', 'manage_options', 'kemosite-typography-settings', 'kemosite_typography_settings_page' );

}

function register_kemosite_typography_settings() { // whitelist options
	register_setting( 'kemosite-typography', 'activate_kemosite_typography' );
	register_setting( 'kemosite-typography', 'adaptive_font_size' );
	register_setting( 'kemosite-typography', 'orphan_control' );
}

function  kemosite_typography_settings_page() { ?>

<div class="wrap">
<h1>Typography Options</h1>
<form method="post" action="options.php">
<?php settings_fields( 'kemosite-typography' ); ?>
<?php do_settings_sections( 'kemosite-typography' ); ?>

<table class="form-table">

<caption>Activate Typography settings, select adaptive font size, and activate orphan control.</caption>

<tr valign="top">
<th scope="row">Activate Typography Settings</th>
<td>
<?php
$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
?>
<input type="checkbox" name="activate_kemosite_typography" value="activate_kemosite_typography"<?php if ($activate_kemosite_typography === "activate_kemosite_typography"): echo ' checked="checked"'; endif;?>>
<p><em>None of these settings will work if this box is left unchecked.</em></p>
</td>
</tr>

<tr valign="top">
<th scope="row">Adaptive Font Size</th>
<td>
<?php

$adaptive_font_size = esc_attr( get_option('adaptive_font_size'));
$selected_statement = ' selected="selected"'; // Avoiding duplication

?>
<select name="adaptive_font_size">
<option value="_100"<?php if ($adaptive_font_size === "_100"): echo $selected_statement; endif;?>>100</option>
<option value="_200"<?php if ($adaptive_font_size === "_200"): echo $selected_statement;  endif;?>>200</option>
<option value="_300"<?php if ($adaptive_font_size === "_300"): echo $selected_statement;  endif;?>>300</option>
<option value="_400"<?php if ($adaptive_font_size === "_400"): echo $selected_statement;  endif;?>>400</option>
<option value="_500"<?php if ($adaptive_font_size === "_500"): echo $selected_statement;  endif;?>>500</option>
<option value="_600"<?php if ($adaptive_font_size === "_600"): echo $selected_statement;  endif;?>>600</option>
<option value="_700"<?php if ($adaptive_font_size === "_700"): echo $selected_statement;  endif;?>>700</option>
<option value="_800"<?php if ($adaptive_font_size === "_800"): echo $selected_statement;  endif;?>>800</option>
<option value="_900"<?php if ($adaptive_font_size === "_900"): echo $selected_statement;  endif;?>>900</option>
</select>
</td>
</tr>

<tr valign="top">
<th scope="row">Orphan Control</th>
<td>
<?php
$orphan_control = esc_attr( get_option('orphan_control'));
?>
<input type="checkbox" name="orphan_control" value="orphan_control"<?php if ($orphan_control === "orphan_control"): echo ' checked="checked"'; endif;?>>
</td>
</tr>

</table>

<?php submit_button(); ?>

</form>
</div>
<?php }

$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
if ($activate_kemosite_typography === "activate_kemosite_typography"):
	add_filter( 'body_class','kemosite_typography_classes' );
endif;
if ( !function_exists('kemosite_typography_classes') ) :

	function kemosite_typography_classes( $classes ) {
 	
		$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
		if ($activate_kemosite_typography === "activate_kemosite_typography"):

			$classes[] = $activate_kemosite_typography;
			$classes[] = esc_attr( get_option('adaptive_font_size'));
			$classes[] = esc_attr( get_option('orphan_control'));
	     
		    return $classes;

	    endif;
	     
	}

endif;

function load_kemosite_typography_script() {

	// Do not load scripts if AMP is detected.
	// Consider whether an AMP version is possible, or even necessary.
	/*
	if (is_amp_detected() ) {
        return;
    }
    */

	global $version;

	$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
	$orphan_control = esc_attr( get_option('orphan_control'));
	$adaptive_font_size = esc_attr( get_option('adaptive_font_size'));

	wp_deregister_script('kemosite-typography');
	wp_register_script('kemosite-typography', plugins_url('kemosite-typography.min.js', __FILE__), '', $version);
	// wp_register_script('kemosite-typography', plugins_url('kemosite-typography.js', __FILE__), '', $version);
	wp_enqueue_script('kemosite-typography');

	wp_deregister_script('activate_kemosite_typography');
	wp_register_script('activate_kemosite_typography', false, array('kemosite-typography'), $version);
	wp_enqueue_script('activate_kemosite_typography');

	if ($activate_kemosite_typography === 'activate_kemosite_typography'):
		wp_add_inline_script( 'activate_kemosite_typography', '
			document.addEventListener("DOMContentLoaded", (event) => {
				document.fonts.ready.then( function() {
					typography_obj.init();
					typography_obj.activate_kemosite_typography("'.$adaptive_font_size.'");
					if (typeof Chart != "undefined" && Chart.defaults.global && typography_obj.outputs.font_height_pixels_min > 12) {
						Chart.defaults.global.defaultFontSize = typography_obj.outputs.font_height_pixels_min;
					}
				});
			});
		');

		if ($orphan_control === 'orphan_control'):
			wp_add_inline_script( 'activate_kemosite_typography', 'document.addEventListener("DOMContentLoaded", function() { typography_obj.orphans_control(); });');
	    endif;

    endif;

	/*
	typography_obj.activate_kemosite_typography();
    typography_obj.orphans_control();
    */

}
add_action('wp_enqueue_scripts', 'load_kemosite_typography_script');

function load_kemosite_typography_css() {

	/*
	if ( is_amp_detected() ):

		$adaptive_font_size = esc_attr( get_option('adaptive_font_size'));
       	
		$typography_root_size = ":root { " .
			"font-size: 1rem !important;".
			"--kemosite-typography-100: calc(1rem - 4px);".
			"--kemosite-typography-200: calc(1rem - 3px);".
			"--kemosite-typography-300: calc(1rem - 2px);".
			"--kemosite-typography-400: calc(1rem - 1px);".
			"--kemosite-typography-500: 1rem;" .
			"--kemosite-typography-600: calc(1rem + 1px);".
			"--kemosite-typography-700: calc(1rem + 2px);".
			"--kemosite-typography-800: calc(1rem + 3px);".
			"--kemosite-typography-900: calc(1rem + 4px);".
		"} ";

    endif;
    */

	global $version;

	wp_deregister_style('kemosite-typography');
	
	wp_register_style( 'kemosite-typography', plugins_url() . '/kemosite-typography-plugin/kemosite-typography.min.css', '', $version);
	// wp_register_style( 'kemosite-typography', plugins_url() . '/kemosite-typography-plugin/kemosite-typography.css', '', $version);

	wp_enqueue_style('kemosite-typography');
	
}
add_action('wp_enqueue_scripts', 'load_kemosite_typography_css');


/**
 * Remove columns if override found in post meta
 */
if ( null !== get_post_meta(get_the_ID(), 'kemosite_typography_remove_columns') ):
	add_filter( 'body_class','kemosite_typography_remove_columns' );
endif;
function kemosite_typography_remove_columns( $classes ) {

	$kemosite_typography_remove_columns = get_post_meta(get_the_ID(), 'kemosite_typography_remove_columns');

	if (isset($kemosite_typography_remove_columns[0]) && $kemosite_typography_remove_columns[0] != null):
		$kemosite_typography_remove_columns = $kemosite_typography_remove_columns[0];
	endif;
	if ($kemosite_typography_remove_columns == 'true'):
		$classes[] = 'kemosite_typography_remove_columns';
	endif;
     
    return $classes;
     
}

if ( !function_exists('is_user_logged_in') ) :
	
	/**
	 * Checks if the current visitor is a logged in user.
	 *
	 * @since 2.0.0
	 *
	 * @return bool True if user is logged in, false if not logged in.
	 */
	function is_user_logged_in() {
		
		$user = wp_get_current_user();

		if ( empty( $user->ID ) ):
			return false;
		endif;

		return true;
		
	}

endif;

?>