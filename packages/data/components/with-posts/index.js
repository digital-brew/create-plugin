/**
 * External Dependencies
 */
import { isUndefined, get, pickBy } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */

const withPosts = createHigherOrderComponent(
	withSelect( ( select, props ) => {
		const {
			attributes: {
				postsToShow,
				order,
				orderBy,
				categories,
				featuredImageSize,
			},
		} = props;

		const { getEntityRecords, getMedia } = select( 'core' );

		const catIds =
			categories && categories.length > 0
				? categories.map( ( cat ) => cat.id )
				: [];

		const latestPostsQuery = pickBy( {
			categories: catIds,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			authors: -1
		}, ( value ) => ! isUndefined( value ) );

		const posts = getEntityRecords( 'postType', 'post', latestPostsQuery );
		const authors = select( 'core' ).getAuthors();
	
		return {
			posts: ! Array.isArray( posts )
			? posts
			: posts.map( ( post ) => {
				let author_data;

				authors.forEach( ( author ) => {
					if( author.id === post.author ) {
						author_data = author;
					};
				} );

				if ( post.featured_media ) {
					const image = getMedia( post.featured_media );
					let url = get(
						image,
						[
							'media_details',
							'sizes',
							featuredImageSize,
							'source_url',
						],
						null
					);

					if ( ! url ) {
						url = get( image, 'source_url', null );
					}							
					return { ...post, featuredImageSourceUrl: url, author_data };
				}
				return { ...post, author_data };
			} ),
		};
	} ),
	'withPosts',
);

export default withPosts;