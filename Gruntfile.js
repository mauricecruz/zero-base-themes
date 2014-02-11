module.exports = function(grunt) {

	/* Load Plugins */

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.initConfig({
		pkg: '<json:package.json>',
		less: {
			generate: {
				files: {
					'stable-theme-extension/styles.css': 'less/build-stable.less',
					'canary-theme-extension/styles.css': 'less/build-canary.less',
					'<path/to/stable/custom.css>': 'less/build-stable.less'
				}
			}
		},
		watch: {
			canary: {
				files: ['less/*.less','themes/*.less'],
				tasks: ['less:generate']
			},

		}

	});

	grunt.registerTask('default', ['less']);
};
