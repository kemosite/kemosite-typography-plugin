<?php

defined( 'ABSPATH' ) or die();

$version = '5.4.2.9';

/**
 * @package kemosite-typography-plugin
 * @version 5.4.2.9
 */
/*
Plugin Name: kemosite-typography-plugin
Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Github Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Author: Kevin Montgomery
Author URI: https://github.com/kemosite/
Description: This plug-in establishes a reasonable typographic baseline for all devices.
Requires at least: 5.4
Version: 5.4.2.9
Requires PHP: 7.3
License: GNU General Public License v2 or later
License URI: LICENSE
Text Domain: kemosite-wordpress-theme
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
?>
<select name="adaptive_font_size">
<option value="_100"<?php if ($adaptive_font_size === "_100"): echo ' selected="selected"'; endif;?>>100</option>
<option value="_200"<?php if ($adaptive_font_size === "_200"): echo ' selected="selected"';  endif;?>>200</option>
<option value="_300"<?php if ($adaptive_font_size === "_300"): echo ' selected="selected"';  endif;?>>300</option>
<option value="_400"<?php if ($adaptive_font_size === "_400"): echo ' selected="selected"';  endif;?>>400</option>
<option value="_500"<?php if ($adaptive_font_size === "_500"): echo ' selected="selected"';  endif;?>>500</option>
<option value="_600"<?php if ($adaptive_font_size === "_600"): echo ' selected="selected"';  endif;?>>600</option>
<option value="_700"<?php if ($adaptive_font_size === "_700"): echo ' selected="selected"';  endif;?>>700</option>
<option value="_800"<?php if ($adaptive_font_size === "_800"): echo ' selected="selected"';  endif;?>>800</option>
<option value="_900"<?php if ($adaptive_font_size === "_900"): echo ' selected="selected"';  endif;?>>900</option>
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
function kemosite_typography_classes( $classes ) {
 	
	$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
	if ($activate_kemosite_typography === "activate_kemosite_typography"):

		$classes[] = $activate_kemosite_typography;
		$classes[] = esc_attr( get_option('adaptive_font_size'));
		$classes[] = esc_attr( get_option('orphan_control'));
     
	    return $classes;

    endif;
     
}

function load_kemosite_typography_script() {

	global $version;

	$activate_kemosite_typography = esc_attr( get_option('activate_kemosite_typography'));
	$orphan_control = esc_attr( get_option('orphan_control'));

	wp_deregister_script('kemosite-typography');
	wp_register_script('kemosite-typography', plugins_url('kemosite-typography.min.js', __FILE__), '', $version);
	//wp_register_script('kemosite-typography', plugins_url('kemosite-typography.js', __FILE__), '', $version);
	wp_enqueue_script('kemosite-typography');

	wp_deregister_script('activate_kemosite_typography');
	wp_register_script('activate_kemosite_typography', false, array('kemosite-typography'), $version);
	wp_enqueue_script('activate_kemosite_typography');

	if ($activate_kemosite_typography === 'activate_kemosite_typography'):
		wp_add_inline_script( 'activate_kemosite_typography', '
			document.addEventListener("DOMContentLoaded", function() {
				typography_obj.init(); 
				typography_obj.activate_kemosite_typography();
				if (typeof Chart != "undefined" && Chart.defaults.global && typography_obj.outputs.font_height_pixels_min > 12) {
					Chart.defaults.global.defaultFontSize = typography_obj.outputs.font_height_pixels_min;
				}
			});
		'); // Now supports presense of Chart JS!

		// wp_add_inline_script( 'kemosite-typography', 'typography_obj.init(); console.log(typography_obj);' );

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
	
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url() . '/kemosite-typography-plugin/kemosite-typography.min.css" />' . "\n";
	// echo '<link rel="stylesheet" type="text/css" href="' . plugins_url() . '/kemosite-typography-plugin/kemosite-typography.css" />' . "\n";
	
}
add_action('wp_head', 'load_kemosite_typography_css');


/**
 * Remove columns if override found in post meta
 */
if ( null !== get_post_meta(get_the_ID(), 'kemosite_typography_remove_columns') ):
	add_filter( 'body_class','kemosite_typography_remove_columns' );
endif;
function kemosite_typography_remove_columns( $classes ) {

	$kemosite_typography_remove_columns = get_post_meta(get_the_ID(), 'kemosite_typography_remove_columns');

	/*
	echo "<pre>";
	print_r($kemosite_typography_remove_columns);
	echo "</pre>";
	*/

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

	if ( empty( $user->ID ) )
		return false;

	return true;
}
endif;

?>