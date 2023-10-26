<?php

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

include 'php/tiny-mce-extend.php';
if (file_exists(__DIR__ . '/ajax/ajax.php')) {
    include 'ajax/ajax.php';
}

/**
 * Include helpers
 */
$helpers = glob(__DIR__ . '/helpers/*/*.php');
foreach ($helpers as $helper) {
    if (file_exists($helper)) {
        include_once $helper;
    }
}

/**
 * Setup our custom options page
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Site Settings',
		'menu_title'	=> 'Site Settings',
		'menu_slug' 	=> 'site-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if (!class_exists('Timber')) {

	add_action(
		'admin_notices',
		function () {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function ($template) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class TomDotCom extends Timber\Site
{
	/** Add timber support. */
	public function __construct()
	{
		add_action('after_setup_theme', array($this, 'theme_supports'));
		add_filter('timber/context', array($this, 'add_to_context'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types()
	{
		register_post_type( 'destinations', array(
			'label'  => 'Destinations',
			'public' => true,
			'has_archive' => false,
			'supports' => array( 'title', 'thumbnail'),
			'menu_icon' => 'dashicons-palmtree',
		));

		register_post_type( 'team-members', array(
			'label'  => 'Team Members',
			'public' => true,
			'has_archive' => false,
			'publicly_queryable' => false,
			'supports' => array( 'title', 'thumbnail'),
			'menu_icon' => 'dashicons-nametag',
		));
	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies()
	{
		register_taxonomy('travel-types', 'destinations', array(
			'labels' => array(
				'name' => 'Travel Types',
				'singular_name' => 'Travel Type',
			),
			'hierarchical' => true,
			'show_in_rest' => false,
			'show_admin_column' => true,
			'sort' => true,
		));
	}

    /** This is where you can register custom CSS & JS files. */
    public function register_assets()
    {
	$style_version = filemtime(get_stylesheet_directory() . '/static/style.css') ?: '';
        $script_version = filemtime(get_stylesheet_directory() . '/static/site.js') ?: '';

        wp_enqueue_style('tomdotcom', get_stylesheet_directory_uri() . '/static/style.css', false, $style_version);
        wp_enqueue_script('tomdotcom', get_stylesheet_directory_uri() . '/static/site.js', false, $script_version);

        // wp_enqueue_style('adobe-fonts', 'https://use.typekit.net/PASTE_PROJECT_ID_HERE.css');
    }

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context($context)
	{
		if (function_exists('get_fields')) {
            $context['options'] = get_fields('options');
        }

		// MENUS
		$context['menu']  = new Timber\Menu('primary');
        $context['footer_menu'] = new Timber\Menu('footer');


		// LOOPS
		$context['all_destinations'] = Timber::get_posts(array(
			'post_type' => 'destinations',
			'post_status' => 'publish',
			'posts_per_page' => -1,
		));

		$context['all_team_members'] = Timber::get_posts(array(
			'post_type' => 'team-members',
			'post_status' => 'publish',
			'posts_per_page' => -1,
		));

		$context['home_destinations'] = Timber::get_posts(array(
			'post_type' => 'destinations',
			'post_status' => 'publish',
			'posts_per_page' => -1,
		));

		$context['travel_types'] = Timber::get_terms('travel-types');

		// SITE
		$context['site']  = $this;

		return $context;
	}

	public function theme_supports()
	{
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		add_theme_support('menus');
		/**
		 * Register our first menu
		 */
		register_nav_menus(
			array(
				'primary' => __('Primary Menu', 'tomdotcom'),
				'footer' => __('Footer Menu', 'tomdotcom'),
			)
		);

		add_theme_support('align-wide');
		add_theme_support('wp-block-styles');
		add_theme_support('editor-styles');
		add_editor_style('static/editor.css');
	}
}

// REMOVE AUTHOR FROM POST SOCIAL EMBEDS

add_filter( 'oembed_response_data', 'disable_embeds_filter_oembed_response_data_' );
function disable_embeds_filter_oembed_response_data_( $data ) {
    unset($data['author_url']);
    unset($data['author_name']);
    return $data;
}

// GRAVITY FORM BUTTON CUSTOM

add_filter('gform_submit_button', 'form_submit_button', 10, 2);
function form_submit_button($button, $form)
{
    return "<button class='button relative z-10 duration-200 round arrow gform_button' id='gform_submit_button_{$form['id']}'><span>Submit</span>
	<svg width='37' height='37' viewbox='0 0 37 37' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<circle cx='18.5' cy='18.5' r='18' stroke='black' stroke-dasharray='2 2'/>
		<path d='M27.1768 19.1768C27.2744 19.0791 27.2744 18.9209 27.1768 18.8232L25.5858 17.2322C25.4882 17.1346 25.3299 17.1346 25.2322 17.2322C25.1346 17.3299 25.1346 17.4882 25.2322 17.5858L26.6464 19L25.2322 20.4142C25.1346 20.5118 25.1346 20.6701 25.2322 20.7678C25.3299 20.8654 25.4882 20.8654 25.5858 20.7678L27.1768 19.1768ZM9 19.25L27 19.25V18.75L9 18.75V19.25Z' fill='black'/>
	</svg></button>";
}

// ADD FAVICON TO ADMIN LOGIN SCREEN

function custom_login_logo()
{
    echo '<style type="text/css">
        body.login div#login h1 a {
            background-image: url(' . get_site_icon_url() . ');
			pointer-events: none;
        }
    </style>';
}
add_action('login_enqueue_scripts', 'custom_login_logo');

new TomDotCom();
