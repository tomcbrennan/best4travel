<?php
$context = Timber::context();
$timber_post     = new Timber\Post();

$post = get_queried_object();

$context['fields'] = get_fields($post);

$context['single_location_destinations'] = Timber::get_posts(array(
    'post_type' => 'destinations',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'tax_query' => array(
        array(
            'taxonomy' => 'locations',
            'field' => 'slug',
            'terms' => $post->slug
        )
    )
));

$context['post'] = $post;

Timber::render( 'taxonomy-locations.twig', $context );
