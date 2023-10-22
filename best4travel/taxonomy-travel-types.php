<?php
$context = Timber::context();
$timber_post     = new Timber\Post();

$post = get_queried_object();

$context['fields'] = get_fields($post);

$context['travel_type_destinations'] = Timber::get_posts(array(
    'post_type' => 'destinations',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'tax_query' => array(
        array(
            'taxonomy' => 'travel-types',
            'field' => 'slug',
            'terms' => $post->slug
        )
    )
));

$context['post'] = $post;

Timber::render( 'taxonomy-travel-types.twig', $context );
