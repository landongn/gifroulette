/*jshint node:true*/
'use strict';

// https://github.com/nDmitry/grunt-autoprefixer

// Parses CSS and add vendor-prefixed properties using the Can I Use database.

module.exports = function (config) {
	return {
		options: {
			browsers: ['> 1%', 'last 2 versions', 'ie 9']
		},
		prefix: {
			expand: true,
			flatten: true,
			src: '.temp/css/*.css',
			dest: config.static + 'css/'
		}
	};
};
