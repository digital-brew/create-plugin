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
				postType,
				order,
				orderBy,
				categories,
				featuredImageSize,
			},
		} = props;

		const {
			getEntityRecords,
			getMedia,
			getAuthors,
			getPostTypes,
		} = select( 'core' );

		const catIds =
			categories && categories.length > 0
				? categories.map( ( cat ) => cat.id )
				: [];

		const latestPostsQuery = pickBy( {
			categories: catIds,
			order,
			orderby: orderBy,
			per_page: postsToShow
		}, ( value ) => ! isUndefined( value ) );

		const authors = getAuthors();
		const posts = getEntityRecords( 'postType', `${ !! postType ? postType : 'post' }`, latestPostsQuery );

		const postTypes = getPostTypes();

		return {
			posts: ! Array.isArray( posts )
			? posts
			: posts.map( ( post ) => {
				let author_data;
				if( post.author ) {
					authors.forEach( ( author ) => {
						if( author.id === post.author ) {
							author_data = author;
						};
					} );
				}

				let image, url;
				if( post.featuredImage ) {
					image = getMedia( post.featured_media );
					url = get(
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
				}

				if ( post.featured_media && post.author ) {
					return { ...post, postTypes, featuredImageSourceUrl: url, author_data };
				}
				if( post.featuredImage && ! post.author ) {
					return { ...post, postTypes, featuredImageSourceUrl: url };
				}
				if( ! post.featuredImage && post.author ) {
					return { ...post, postTypes, author_data };
				}
				return { ...post, postTypes };
			} ),
		};
	} ),
	'withPosts',
);

export default withPosts;
