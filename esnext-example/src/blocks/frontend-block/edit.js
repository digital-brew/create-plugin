/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './editor.scss';
import './style.scss';
const pkg = require( '../../../package.json' );
const slug = pkg.config.slug;

function Edit( props ) {
	const {
		attributes,
		className,
		setAttributes,
		attributes: {
			isDarkBackground,
		},
	} = props;

	const rowClasses = classnames( 
		`p-5`,
		{
			'bg-gray-900 text-white': isDarkBackground,
		} );

	return (
		<div className={ slug }>
			<div className={ rowClasses }>
				<Controls
					className={ className }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<ToggleControl
					label={ 'Dark background' }
					checked={ isDarkBackground }
					onChange={ () => setAttributes( { isDarkBackground: ! isDarkBackground } ) }
				/>
			</div>
		</div>
	);
}

export default Edit;
