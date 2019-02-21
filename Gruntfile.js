module.exports = function(grunt) {
	/* Load Plugins */

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-bump");

	grunt.initConfig({
		pkg: "<json:package.json>",
		compress: {
			main: {
				options: {
					archive: "theme-extension.zip",
					mode: "zip"
				},
				files: [
					{
						cwd: "theme-extension/",
						src: "**/*",
						expand: true
					}
				]
			}
		},
		less: {
			generate: {
				options: {
					compress: true,
					ieCompat: false
				},
				files: [
					{
						expand: true,
						cwd: "less/theme-builds",
						src: ["*.stable.less"],
						dest: "theme-extension/",
						ext: ".stable.css"
					},
					{
						expand: true,
						cwd: "less/theme-builds",
						src: ["*.canary.less"],
						dest: "theme-extension/",
						ext: ".canary.css"
					}
				]
			},
			build: {
				options: {
					compress: true
				},
				files: [
					{
						expand: true,
						cwd: "less/theme-builds",
						src: ["*.stable.less"],
						dest: "theme-extension/",
						ext: ".stable.css"
					},
					{
						expand: true,
						cwd: "less/theme-builds",
						src: ["*.canary.less"],
						dest: "theme-extension/",
						ext: ".canary.css"
					}
				]
			}
		},
		watch: {
			canary: {
				files: ["less/**/*.less", "themes/*.less"],
				tasks: ["less:generate"]
			}
		}
	});

	grunt.registerTask("default", ["less:generate"]);
	grunt.registerTask("package", ["less:build", "compress"]);
};
