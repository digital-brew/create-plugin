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
import { parse } from '@wordpress/block-serialization-default-parser';

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
		taxonomies,
		attributes: {
			postsToShow,
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
				attributes={ attributes }
				setAttributes={ setAttributes }
				taxonomies={ taxonomies }
			/>
			<div className={ className } >
				<ul className="list-none ml-0 pl-0">
					{
						displayPosts.map( ( post, i ) => {
							console.log( parse( post.content.raw ) )
							console.log( post )
							return (
								<li key={ post.id }>
									{
										<div dangerouslySetInnerHTML={ { __html: post.content.rendered } } />
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
