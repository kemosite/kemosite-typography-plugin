<?php

defined( 'ABSPATH' ) or die();

/**
 * @package kemosite typography plug-in for Wordpress
 * @version 4.9.6
 */
/*
Plugin Name: kemosite typography plug-in for Wordpress
Description: (Release Candidate) This plug-in establishes a reasonable typographic baseline for all devices. Version matches last tested Wordpress.
Author: Kevin Montgomery
Version: 4.9.6
Plugin URI: http://kemosite.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
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
	register_setting( 'kemosite-typography', 'ideal_line_length_spacing' );
	register_setting( 'kemosite-typography', 'orphan_control' );
	register_setting( 'kemosite-typography', 'smart_quotes' );
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
<input type="checkbox" name="activate_kemosite_typography" value="typography"<?php if ($activate_kemosite_typography === "typography"): echo ' checked="checked"'; endif;?>>
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
<th scope="row">Ideal Line Length and Spacing</th>
<td>
<?php
$ideal_line_length_spacing = esc_attr( get_option('ideal_line_length_spacing'));
?>
<input type="checkbox" name="ideal_line_length_spacing" value="lines"<?php if ($ideal_line_length_spacing === "lines"): echo ' checked="checked"'; endif;?>>
</td>
</tr>

<tr valign="top">
<th scope="row">Orphan Control</th>
<td>
<?php
$orphan_control = esc_attr( get_option('orphan_control'));
?>
<input type="checkbox" name="orphan_control" value="orphans"<?php if ($orphan_control === "orphans"): echo ' checked="checked"'; endif;?>>
</td>
</tr>

<tr valign="top">
<th scope="row">Smart Quotes</th>
<td>
<?php
$smart_quotes = esc_attr( get_option('smart_quotes'));
?>
<input type="checkbox" name="smart_quotes" value="quotes"<?php if ($smart_quotes === "quotes"): echo ' checked="checked"'; endif;?>>
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
	if ($activate_kemosite_typography === "typography"):

		$classes[] = esc_attr( get_option('adaptive_font_size'));
		$classes[] = $activate_kemosite_typography;
		$classes[] = esc_attr( get_option('ideal_line_length_spacing'));
		$classes[] = esc_attr( get_option('orphan_control'));
     
	    return $classes;

    endif;
     
}

function load_kemosite_typography_script() {

	wp_deregister_script('kemosite-typography');
	wp_register_script('kemosite-typography', plugins_url('kemosite-typography.js', __FILE__), '', '4.8.1', 'true');
	wp_enqueue_script('kemosite-typography');

	wp_add_inline_script( 'kemosite-typography', 'typography_obj.init(); console.log(typography_obj);' );

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