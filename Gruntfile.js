module.exports = function (grunt) {  
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
    
	// Project configuration.  
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'), 

		// configure jshint to validate js files -----------------------------------
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},

			build: ['Gruntfile.js', 'js/*.js']
		},
		
        cssmin: {  
			options: { 
				compress: true,
				keepSpecialComments: 0,
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n* /\n'  
			},  
			build: {
				files: {  
					'dist/css/main.min.css': [
						'node_modules/bootstrap/dist/css/bootstrap.min.css',
						'dist/css/main.css'
					]
				}  
			}
        },

		// compile less stylesheets to css -----------------------------------------
		less: {
			build: {
				files: {
					 'dist/css/main.css': [
						 //'node_modules/font-awesome/less/font-awesome.less',
						 'less/main.less'
					 ],
				}
			}
		},
				
        uglify: {  
            options: {  
                compress: true,
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
			build: {
				files: {
					'dist/js/main.min.js': [
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/bootstrap/dist/js/bootstrap.min.js',
						'js/*.js'
					]
				}
			}
        },

		// configure watch to auto update ----------------
		watch: {
			// for stylesheets, watch css and less files 
			// only run less and cssmin 
			stylesheets: { 
				files: ['less/*.less'], 
				tasks: ['less', 'cssmin'] 
			},

			// for scripts, run jshint and uglify 
			scripts: { 
				files: ['js/*.js'], 
				tasks: ['jshint', 'uglify'] 
			} 
		},
		
    });  
		
    // Default task.  
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);

	grunt.registerTask('debug', ['jshint', 'less']);

    grunt.registerTask('release', ['jshint', 'uglify', 'less', 'cssmin']);

	grunt.registerTask('build-watch', ['jshint', 'uglify', 'less', 'cssmin', 'watch']);  
};