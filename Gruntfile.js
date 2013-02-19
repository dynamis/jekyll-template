module.exports = function(grunt) {
  grunt.initConfig({
    // npm の設定ファイル読み込み
    pkg: grunt.file.readJSON('package.json'),
    // テンプレート
    jsfiles: ['js/**/*.js', '!js/library.js', '!js/**/*.min.js'],
    cssfiles: ['css/**/*.css', '!css/library.css', '!css/**/*.min.css'],
    lessfiles: ['css/**/*.less'],
    
    // JS Lint
    jshint: {
      // http://www.jshint.com/docs/
      options: {
        asi: true,
        es5: true
      },
      Gruntfile: ['Gruntfile.js'],
      js: ['<%= jsfiles %>']
    },
    
    // JavaScript 最小化
    uglify: {
      options: {
        preserveComments: false,
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        banner: '/*! Updated on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: [
          {
            expand: true,
            src: '<%= jsfiles %>',
            dest: '.',
            ext: '.min.js'
          }
        ]
      }
    },
    
    // LESS コンパイル
    less: {
      dist: {
        options: {
          yuicompress: true
        },
        files: [
          {
            expand: true,
            src: '<%= lessfiles %>',
            dest: '.',
            ext: '.min.css'
          }
        ]
      }
    },
    
    // CSS 最小化
    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            src: '<%= cssfiles %>',
            dest: '.',
            ext: '.min.css'
          }
        ]
      }
    },
    
    // ファイル更新時に自動処理
    watch: {
      Gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:Gruntfile']
      },
      js: {
        options: {
          debounceDelay: 1000
        },
        files: '<%= jsfiles %>',
        tasks: ['jshint:js', 'uglify']
      },
      css: {
        options: {
          debounceDelay: 1000
        },
        files: '<%= cssfiles %>',
        tasks: ['cssmin']
      },
      less: {
        options: {
          debounceDelay: 1000
        },
        files: '<%= lessfiles %>',
        tasks: ['less']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['watch']);

};