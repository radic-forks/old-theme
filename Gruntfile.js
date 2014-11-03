'use strict';
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                // jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                'assets/js/plugins/*.js',
                '!assets/js/scripts.min.js'
            ]
        },
        jekyll: {              // Task
            options: {
                host: '0.0.0.0',
                port: 4000
            },
            serve: {
                drafts: true
            }
        },

        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/plugins/*.js',
                        'assets/js/_*.js'
                    ]
                }
            },
            test: {
                options: {
                    beautify: true
                },
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/plugins/*.js',
                        'assets/js/_*.js'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'images/'
                }]
            }
        },
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
                tasks: ['uglify:test']
            }
        },
        clean: {
            dist: [
                'assets/js/scripts.min.js'
            ]
        }
    });


    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'uglify',
        'imagemin',
        'svgmin'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};