'use strict';

var util = require('util');

// my new content

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

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

        preprocess: {
            options: {
                context: {
                    DEBUG: true
                }
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/core',
                    src: 'radic.js',
                    dest: 'assets/js'
                }]
            }
        },
        watch: {
            my: {
                files: [
                    'assets/js/core/**/*',
                    'assets/js/widgets/**/*',
                    '_includes/*.html',
                    '_layouts/*.html',
                    '_posts/*.markdown',
                    '_config.yml',
                    'index.html'
                ],
                tasks: ['preprocess:js'],
                options: {
                    interrupt: true,
                    atBegin: true,
                    livereload: true
                }
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
       // 'uglify',
        'imagemin',
        'svgmin'
    ]);
    grunt.registerTask('dev', [
        'livereloadx',
        'jekyll:serve'
    ]);

};