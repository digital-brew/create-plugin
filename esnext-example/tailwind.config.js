const nodeEnv = process.env.NODE_ENV;

const config = {
	theme: {},
	variants: {},
	purge: {
		enabled: nodeEnv === 'production' ? true : false,
		content: [
			'./src/**/*.js',
		],
	},
	plugins: [ 
		require( 'tailwindcss' ), 
		require( 'autoprefixer' ) 
	],
};

module.exports = config;
