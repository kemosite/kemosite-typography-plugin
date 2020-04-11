<?php

defined( 'ABSPATH' ) or die();

$version = '5.4.0.5';

/**
 * @package kemosite-typography-plugin
 * @version 5.4.0.5
 */
/*
Plugin Name: kemosite-typography-plugin
Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Github Plugin URI: https://github.com/kemosite/kemosite-typography-plugin
Author: Kevin Montgomery
Author URI: https://github.com/kemosite/
Description: This plug-in establishes a reasonable typographic baseline for all devices.
Requires at least: 5.4
Version: 5.4.0.5
Requires PHP: 7.2
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
<option value="small"<?php if ($adaptive_font_size === "small"): echo ' selected="selected"'; endif;?>>Small</option>
<option value="average"<?php if ($adaptive_font_size === "average"): echo ' selected="selected"';  endif;?>>Average</option>
<option value="large"<?php if ($adaptive_font_size === "large"): echo ' selected="selected"';  endif;?>>Large</option>
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

add_filter( 'body_class','kemosite_typography_classes' );
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
	wp_register_script('kemosite-typography', plugins_url('kemosite-typography.js', __FILE__), '', $version);
	wp_enqueue_script('kemosite-typography');

	wp_deregister_script('activate_kemosite_typography');
	wp_register_script('activate_kemosite_typography', false, array('kemosite-typography'), $version);
	wp_enqueue_script('activate_kemosite_typography');

	// wp_add_inline_script( 'kemosite-typography', 'typography_obj.init(); console.log(typography_obj);' );

	if ($activate_kemosite_typography === 'activate_kemosite_typography'):
		wp_add_inline_script( 'activate_kemosite_typography', '
			document.addEventListener("DOMContentLoaded", function() {
				typography_obj.init(); 
				typography_obj.activate_kemosite_typography();
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
	
	echo '<link rel="stylesheet/less" type="text/css" href="' . plugins_url() . '/kemosite-typography-plugin/kemosite-typography.css" />' . "\n";
	
}
add_action('wp_head', 'load_kemosite_typography_css');

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