'use strict';

module.exports = function (grunt) {

    // https://github.com/shootaroo/jit-grunt
    require('jit-grunt')(grunt);


    var module = grunt.option("module") || 'login';


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },

        ts: {
            options: {
                failOnTypeErrors: false
            },
            dev: {
                src: ['**/*.ts', '!node_modules/**', '!.tscache/**']
            },
            debug: {
                src: ['**/*.ts', '!node_modules/**', '!.tscache/**']
            },
            release: {
                src: ['**/*.ts', '!node_modules/**', '!.tscache/**'],
                options: {
                    sourceMap: false
                }
            }
        },

        watch: {
            files: ['./**/*.ts', '!./node_modules/**'],
            tasks: ['ts:dev']
        },

        open: {
            dev: {
                path: 'http://localhost:8080/' + module + '/' + module + '.html'
            }
        }

    });

    grunt.registerTask('default', ['ts:dev', 'connect', 'open', 'watch']);

};
