module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'lib/app.js' : 'src/app.js',
          'lib/services/dataHandler.js' : 'src/services/dataHandler.js'
        }
      }
    },

    jshint: {
      options: {
        "esnext": true
      },
      files: ['src/**/*.js']
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'lib/app.js'
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'mochaTest', 'babel']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:scripts'],
        options: {
        limit: 8,
        logConcurrentOutput: true
      },
      }
    }
  });


  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('serve-dev', ['babel', 'jshint', 'concurrent:dev']);

};
