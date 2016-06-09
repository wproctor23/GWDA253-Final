<!doctype html>
<html class="no-js" lang="eng">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title><?php wp_title( '|', true, 'right' ); ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory delete this -->
        <link rel="icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico">

    <?php wp_head(); ?>
    </head>

    <body>
        <div class="container">
            <div class="content-container clearfix">
                <div class="main-content">
                    <header>
                        <div class="misc-items">
                            <ul class="top-nav">
                                <li><a href="index.html">Home</a> <span> | </span> </li>
                                <li><a href="about-us.html">About Us</a> <span> | </span> </li>
                                <li><a href="faq.html">FAQ</a> <span> | </span> </li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                            <!-- END .top-nav -->
                            <a href="#" class="facebook-icon"><img class="facebook-button" src="<?php bloginfo('template_url'); ?>/images/facebook-btn.png" alt="facebook button"></a>
                            <div class="search-container">
                                <form class="search-form" method="get" action="#">
                                    <input class="search-input" type="text" onFocus="this.value=(this.value=='Search...')? '' : this.value ;" value="Search..." name="search">
                                    <input class="search-submit" type="image" value="Search" src="<?php bloginfo('template_url'); ?>/images/search-btn.gif">
                                </form>
                                <!-- END .search-form -->
                            </div>
                            <!-- END .search-container -->
                            <a href="#" class="donate" target="_blank">
                                <img src="<?php bloginfo('template_url'); ?>/images/donate-btn.png" alt="donate button">
                            </a>
                            <!-- END .donate -->
                        </div>
                        <!-- END .misc-items -->

                        <nav class="navbar navbar-default">
                          <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
                            &#9776;
                          </button>
                          <a href="<?php bloginfo( 'url' ); ?>">
                              <img class="logo" src="<?php bloginfo('template_url'); ?>/images/bhs-logo.png" alt="<?php bloginfo( 'name' ); ?>">
                          </a>
                          <div class="collapse navbar-toggleable-md" id="exCollapsingNavbar2">

                              <?php
                                $args = array(
                                 'menu'    => 'header-menu',
                                 'menu_class' => 'nav navbar-nav',
                                 'container' => 'false'
                                );
                                wp_nav_menu( $args );
                               ?>

                          </div>
                        </nav>


                        <!-- END nav -->
                    </header>
                    <!-- END header -->



