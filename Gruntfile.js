'use strict';

var util = require('util');


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                // jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/{radic,plugins,*}/*.js',
                '!assets/js/scripts.min.js'
            ]
        },
        jekyll: {                       // Task
            options: {                          // Universal options
                bundleExec: true,
                src: './',
                serve: true,
                watch: true
            },
            serve: {
                dest: '.jekyll',
                drafts: true
            }
        },
        livereloadx: {
            static: true,
            dir: './'
        },
        preprocess: {
            options: {
                context: {
                    DEBUG: true,
                    cookie: true,
                    github: true, // requires: cookie
                    GithubProfileWidget: true // requires: github
                }
            },
            js: {

                files: [{
                    expand: true,
                    cwd: 'assets/js/radic',
                    src: 'radic.js',
                    dest: 'assets/js'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/plugins/*.js',
                        'assets/js/_*.js',
                        'assets/js/radic.js'
                    ]
                }
            },
            test: {
                options: {
                    beautify: true
                },
                files: {
                    'assets/js/vendor.js': [
                        'assets/js/plugins/*.js',
                        'assets/js/_*.js'
                    ]
                }
            }
        }, /*
         imagemin: {
         dist: {
         options: {
         optimizationLevel: 7,
         progressive: true
         },
         files: [{
         expand: true,
         cwd: 'images/',
         src: '{,*\/}*.{png,jpg,jpeg}',
         dest: 'images/'
         }]
         }
         },*/
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: '{,*/}*.svg',
                    dest: 'images/'
                }]
            }
        },
        watch: {
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['preprocess:js', 'uglify']
            }
        },
        clean: {
            dist: [
                'assets/js/scripts.min.js'
            ]
        }
    });


    grunt.loadNpmTasks('livereloadx');
    //grunt.registerTask('default', ['livereloadx']);

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'uglify',
        'imagemin',
        'svgmin'
    ]);
    grunt.registerTask('dev', [
        'livereloadx',
        'jekyll:serve'
    ]);

};