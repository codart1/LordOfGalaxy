module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sync');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './deploy'
                }
            }
        },

        concat: {
            dist: {
                src: [  
                		"src/lib/phaser.min.js",
                    	"src/game/namespace.js",
                    	"src/game/config.js",
                    	"src/game/main.js"
                     ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },

        watch: {
        	sourceChange: {
	            files: 'src/**/*.js',
    	        tasks: ['concat'],
    	        options: {
			      livereload: true,
			    }
        	},

        	assetsChange: {
        		files: 'src/assets/**/*',
    	        tasks: ['sync']	
        	}
        },

        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        },


		sync: {
			main: {
				files: [{
				  cwd: 'src/assets',
				  src: [
				    '**', /* Include everything */
				    '!**/*.db' /* but exclude txt files */
				  ],
				  dest: 'deploy/assets',
				}],
				pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
				verbose: true, // Display log messages when copying files
				updateAndDelete: true
			}
	    }
    });

    grunt.registerTask('default', ['sync', 'concat', 'connect', 'open', 'watch']);

}