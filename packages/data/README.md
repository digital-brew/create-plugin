# Data Utility Components for the WordPress block editor plugin
Utilities that make it easier to manage state for WordPress plugins built for the block editor.

* [Follow us on Twitter](https://twitter.com/blockhandbook)

## Installation
```
npm i @blockhandbook/data --save-dev
```
_This package assumes that your code will run in an ES2015+ environment._

## Setup
Here's a little context. I'm going to assume you have a gutenberg block file structure something like this with your edit function in the edit.js file:

```
plugin-name
├── build
├── src
│    ├── blocks
│    │   ├── block-1
│    │   │   ├── block.json
│    │   │   ├── edit.js
│    │   │   └── index.js
├── plugin-name.php
├── webpack.config.js
└── package.json
```

## Components
# withPosts
Grabbing post data to create dynamic blocks is kinda complicated.  The withPosts Higher Order Component makes it a breeze to grab WordPress post data such:
```
title: { raw, rendered },
date,
excerpt: { raw, rendered, protected, block_version }
author: { id, name, url, description, link },
url,
content,
type,
categories
```

Here's an example Edit component.  Note that all you need to do is import the withPosts HOC and then export your Edit component using the withPosts() HOC and you'll have access to the posts data in the props:
```
/**
 * External Dependencies
 */
import { withPosts } from '@blockhandbook/data';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';

function Edit( props ) {
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
					className={ className }
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
				className={ className }
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

// Just export your Edit component using the withPosts() Higher Order Component
export default withPosts( Edit );
```
