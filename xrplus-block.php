<?php

/**
 * Plugin Name: Xr.plus Custom Block
 * Description: Xr.plus Custom Block for show project
 * Requires at least: 6.1
 * Requires PHP:      7.3 +
 * Version:           0.1
 * Author:            Nicolas REITIN
 * Url:       https://xr.plus
 * Text Domain:       xr.plus
 */

 function xrplus_custom_block_script_register() 
 {
    wp_enqueue_script('xrplus-custom-block', plugin_dir_url(__FILE__).'xrplus-block.js', array('wp-blocks', 'wp-i18n', 'wp-editor'),true, false);
 }

 add_action('enqueue_block_editor_assets', 'xrplus_custom_block_script_register');


function xrplus_enqueue_block_assets() {
    wp_enqueue_style('xrplus-custom-block-styles', plugin_dir_url(__FILE__) . 'styles.css');
}

add_action('enqueue_block_assets', 'xrplus_enqueue_block_assets');


?>