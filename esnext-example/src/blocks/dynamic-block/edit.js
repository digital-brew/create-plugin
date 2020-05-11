/**
 * External Dependencies
 */
import data from '@blockhandbook/data';
const { withPosts } = data;
console.log( data )

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';

function DynamicBlockEdit( props ) {
	const {
		setAttributes,
		className,
		attributes,
		posts,
		attributes: {
			postsToShow,
			showPostAuthor,
			showPostDate,
			showPostExcerpt,
			showPostTitle,
			showFeaturedImage
		}
	} = props;

	console.log( posts )

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
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				{ __( 'No posts found.', 'create-plugin' ) }
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
										showPostTitle &&
										<h3>
											<a href="#">
												{ post.title.rendered }
											</a>									
										</h3>
									}
									
									{
										showPostAuthor &&
										<p>
											<span>By: </span>
											<a href="#">
												{	post.author_data.name	}
											</a>
										</p>
									}
									{
										showPostDate &&
										<time dateTime={ moment( post.date_gmt ).utc().format() }>
											{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
										</time>
									}
									{
										showPostExcerpt &&
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

export default withPosts( DynamicBlockEdit );
