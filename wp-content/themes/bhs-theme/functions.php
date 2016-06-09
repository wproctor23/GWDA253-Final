<?php
function theme_styles() {

    wp_enqueue_style( 'bundle_min_css', get_template_directory_uri() . '/assets/dest/css/bundle.min.css' );
    wp_enqueue_style( 'style_css', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );

function theme_js() {
    global $wp_scripts;

    wp_register_script( 'html5_shiv', 'http://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js', '', '', false);
    wp_register_script( 'respond_js', 'http://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js', '', '', false);

    $wp_scripts->add_data( 'html5_shiv', 'conditional', 'lt IE 9' );
    $wp_scripts->add_data( 'respond_js', 'conditional', 'lt IE 9' );

    wp_enqueue_script( 'tether_js', get_template_directory_uri() . '/node_modules/tether/dist/js/tether.js', array('jquery'), '', true );
    // wp_enqueue_script( 'jquery_js', get_template_directory_uri() . '/node_modules/jquery/dist/jquery.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'bootstrap_js', get_template_directory_uri() . '/node_modules/bootstrap/dist/js/bootstrap.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'ie10_js', get_template_directory_uri() . '/js/ie10-viewport-bug-workaround.js', array('jquery'), '', true );
    wp_enqueue_script( 'scripts_js', get_template_directory_uri() . '/js/scripts.js', array('jquery'), '', true );
}
add_action( 'wp_enqueue_scripts', 'theme_js' );

/*=============================
=            Menus            =
=============================*/

add_theme_support( 'menus' );

function register_theme_menus() {
    register_nav_menus(
      array(
        'header-menu' => __( 'Header Menu' )
      )
    );
}
add_action( 'init', 'register_theme_menus' );

?>
