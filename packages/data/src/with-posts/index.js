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
				taxonomy,
				featuredImageSize,
			},
		} = props;

		const {
			getEntityRecords,
			getTaxonomies,
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
			per_page: postsToShow,
			[ `${ taxonomy }` ]: !! taxonomy ? catIds : null,
		}, ( value ) => ! isUndefined( value ) );

		const authors = getAuthors();
		const posts = getEntityRecords( 'postType', `${ !! postType ? postType : 'post' }`, latestPostsQuery );

		const postTypes = getPostTypes();

		// At some point need to add dynamic taxonomy filtering if switching between post types.
		// For now probably need to hide the categorySelector if more than 1 postType
		//const taxonomies = getTaxonomies();

		return {
			postTypes,
			posts: ! Array.isArray( posts )
			? posts
			: posts.map( ( post ) => {

				let author_data;
				if( !! post.author ) {
					authors.forEach( ( author ) => {
						if( author.id === post.author ) {
							author_data = author;
						};
					} );
				}

				let image, url;
				if( !! post.featured_media ) {
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
					return { ...post, featuredImageSourceUrl: url, author_data };
				}
				if( post.featuredImage && ! post.author ) {
					return { ...post, featuredImageSourceUrl: url };
				}
				if( ! post.featuredImage && post.author ) {
					return { ...post, author_data };
				}
				return { ...post };
			} ),
		};
	} ),
	'withPosts',
);

export default withPosts;
