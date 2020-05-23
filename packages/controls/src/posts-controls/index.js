/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { QueryControls, PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal Dependencies
 */

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

const PostsControls = ( props ) => {
	const {
		setAttributes,
		postTypes,
		attributes: {
			categories,
			postsToShow,
			order,
			orderBy,
			showPostAuthor,
			showPostDate,
			showPostExcerpt,
			showPostTitle,
			showFeaturedImage,
			featuredImageSize,
			postType,
		},
	} = props;

	console.log( postTypes )

	const [ categoriesList, setCategoriesList ] = useState([]);

	useEffect( () => {
		const fetchCategories = async () => {
			const categoriesList = await apiFetch( {
				path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY )
			} );

			try {
				setCategoriesList( categoriesList );
			} catch (error) {
				setCategoriesList([]);
			}
		}
		fetchCategories();
	}, [] );

	const suggestions = categoriesList.reduce(
		( accumulator, category ) => ( {
			...accumulator,
			[ category.name ]: category,
		} ),
		{}
	);

	const categorySuggestions = categoriesList.reduce(
		( accumulator, category ) => ( {
			...accumulator,
			[ category.name ]: category,
		} ),
		{}
	);

	const selectCategories = ( tokens ) => {
		// Categories that are already will be objects, while new additions will be strings (the name).
		// allCategories nomalizes the array so that they are all objects.
		let allCategories = tokens.map( ( token ) =>
			typeof token === 'string' ? suggestions[ token ] : token
		).filter( category => category );
		setAttributes( { categories: allCategories } );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<SelectControl
					label={ __( 'Post Type' ) }
					value={ postType }
					onChange={ ( postType ) => setAttributes( { postType } ) }
					options={
						postTypes.map( postType => {
							const { name, slug } = postType;
							return {
								label: name,
								value: slug,
							}
						} )
					}
				/>
				<QueryControls
					{ ...{ order, orderBy } }
					numberOfItems={ postsToShow }
					onOrderChange={ ( value ) =>
						setAttributes( { order: value } )
					}
					onOrderByChange={ ( value ) =>
						setAttributes( { orderBy: value } )
					}
					onNumberOfItemsChange={ ( value ) =>
						setAttributes( { postsToShow: value } )
					}
					categorySuggestions={ categorySuggestions }
					onCategoryChange={ selectCategories }
					selectedCategories={ categories }
				/>
				<ToggleControl
					label={ __( 'Show Featured Image' ) }
					checked={ showFeaturedImage }
					onChange={ ( ) => setAttributes( { showFeaturedImage: ! showFeaturedImage } ) }
				/>
				{
					showFeaturedImage &&
					<SelectControl
						label={ __( 'Featured Image Size' ) }
						value={ featuredImageSize }
						onChange={ ( size ) => setAttributes( { featuredImageSize: size } ) }
						options={
							[
								{ label: 'Full', value: 'full' },
								{ label: 'Large', value: 'large' },
								{ label: 'Medium', value: 'medium' },
								{ label: 'Medium Large', value: 'medium_large' },
								{ label: 'Thumbnail', value: 'thumbnail' },
							]
						}
					/>
				}
				<ToggleControl
					label={ __( 'Show Title' ) }
					checked={ showPostTitle }
					onChange={ ( ) => setAttributes( { showPostTitle: ! showPostTitle } ) }
				/>
				<ToggleControl
					label={ __( 'Show Post Date' ) }
					checked={ showPostDate }
					onChange={ ( ) => setAttributes( { showPostDate: ! showPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Show Post Author' ) }
					checked={ showPostAuthor }
					onChange={ ( ) => setAttributes( { showPostAuthor: ! showPostAuthor } ) }
				/>
				<ToggleControl
					label={ __( 'Show Post Excerpt' ) }
					checked={ showPostExcerpt }
					onChange={ ( ) => setAttributes( { showPostExcerpt: ! showPostExcerpt } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default PostsControls;
