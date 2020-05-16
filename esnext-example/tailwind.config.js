const nodeEnv = process.env.NODE_ENV;

const config = {
	theme: {
		boxShadow: {
			default: 'var( --tw-box-shadow )',
			md: 'var( --tw-box-shadow-md )',
			lg: 'var( --tw-box-shadow-lg )',
			xl: 'var( --tw-box-shadow-xl )',
		},
	},
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
