const config = {
	theme: {
		spacing: {},
		opacity: {},
		borderRadius: {},
		borderWidth: {},
		boxShadow: {},
		extend: {},
	},
	variants: {},
	purge: {
		enabled: true,
		content: [
			'./src/**/*.js',
		],
	},
	plugins: [ require( 'tailwindcss' ), require( 'autoprefixer' ) ],
};

module.exports = config;
