module.exports = function(grunt) {

	/* Load Plugins */

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.initConfig({
		pkg: '<json:package.json>',
		less: {
			stable: {
				files: {
					//'stable-theme-extension/styles.css': 'less/stable/build.less'
					'c:/Users/Maurice/AppData/Local/Google/Chrome/User\ Data/Profile 2/User\ StyleSheets/Custom.css': 'less/stable/build.less'
				}
			},
			canary: {
				files: {
					'canary-theme-extension/styles.css': 'less/canary/build.less'
				}
			}
		},
		watch: {
			canary: {
				files: ['less/canary/*.less','themes/*.less'],
				tasks: ['less:canary']
			},
			stable: {
				files: ['less/stable/*.less'],
				tasks: ['less:stable']
			},

		}

	});

	grunt.registerTask('default', ['less']);
};
