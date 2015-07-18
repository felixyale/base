module.exports = function(grunt) {
  'use strict';

  function readOptionalJSON(filepath) {
    var data = {};
    try {
      data = grunt.file.readJSON(filepath);
    } catch (e) {}

    return data;
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    build: {
      all: {
        dest: 'dist/base.js'
      }
    },
    jsonlint: {
      pkg: {
        src: ['package.json']
      }
    },
    jshint: {
      all: {
        src: [
          'Gruntfile.js', 'src/**/*.js', 'build/**/*.js', 'test/**/*.js'
        ]
      }
    },
    jscs: {
      src: ['Gruntfile.js', 'src/**/*.js', 'build/**/*.js', 'test/**/*.js'],

      // Check parts of tests that pass
      // release: ['build/*.js', '!build/release-notes.js'],
      //tasks: 'build/tasks/*.js',
      options: {
        config: '.jscsrc'
      }
    },
    watch: {
      files: ['<%= jshint.all.src %>'],
      tasks: ['dev']
    },
    uglify: {
      all: {
        files: {
          'dist/base.min.js': ['dist/base.js']
        },
        options: {
          preserveComments: false,
          sourceMap: true,
          sourceMapName: 'dist/base.min.map',
          report: 'min',
          beautify: {
            ascii_only: true
          },
          banner: '/*! base v<%= pkg.version %> */',
          compress: {
            hoist_funs: false,
            loops: false,
            unused: false
          }
        }
      }
    }
  });

  // Load grunt tasks from NPM packages
  require('load-grunt-tasks')(grunt);

  // Integrate jQuery specific tasks
  grunt.loadTasks('build/tasks');

  grunt.registerTask('lint', ['jsonlint', 'jshint', 'jscs']);

  grunt.registerTask('default', ['build:all:*', 'lint', 'uglify']);

};
