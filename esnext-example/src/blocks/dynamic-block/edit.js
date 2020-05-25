/**
 * External Dependencies
 */
// import { data } from '@blockhandbook/data';
// const { withPosts } = data;
import { withPosts } from '../../../../packages/data/src';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import icons from '../../utils/icons';
const pkg = require( '../../../package' );
const slug = pkg.config.slug;

const Edit = ( props ) => {
	const {
		setAttributes,
		className,
		attributes,
		posts,
		postTypes,
		attributes: {
			postsToShow,
			showPostAuthor,
			showPostDate,
			showPostExcerpt,
			showPostTitle,
			showFeaturedImage,
		}
	} = props;

	if ( ! posts ) {
		return (
			<>
				<Spinner />
					Loading...
			</>
		);
	}

	const hasPosts = Array.isArray( posts ) && posts.length;
	if ( ! hasPosts  ) {
		return (
			<>
				<Controls
					postTypes={ postTypes }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				{ __( 'No posts found.', 'esnext-example' ) }
			</>
		);
	}

	// Removing posts from display should be instant.
	const displayPosts =
	posts.length > postsToShow
		? posts.slice( 0, postsToShow )
		: posts;

	return (
		<>
			<Controls
				postTypes={ postTypes }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div className={ className } >
				<ul className="list-none">
					{
						displayPosts.map( ( post, i ) => {
							return (
								<li key={ post.id }>
									{
										showFeaturedImage && !! post.featured_media &&
										<div>
											<img src={ post.featuredImageSourceUrl } alt="" />
										</div>
									}
									{
										showPostTitle && post.title.rendered &&
										<h3>
											<a href="#">
												{ post.title.rendered }
											</a>
										</h3>
									}

									{
										showPostAuthor && post.author_data &&
										<p>
											<span>By: </span>
											<a href="#">
												{	post.author_data.name	}
											</a>
										</p>
									}
									{
										showPostDate && post.date_gmt &&
										<time dateTime={ moment( post.date_gmt ).utc().format() }>
											{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
										</time>
									}
									{
										showPostExcerpt && post.excerpt &&
										<div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
									}
								</li>
							);
						} )
					}
				</ul>
			</div>
		</>
	);
}

export default withPosts( Edit );
