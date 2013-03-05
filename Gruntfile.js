"use strict";

// File Path
var includeDir    = "_includes";
var jekyllDest    = "_site";
var htmlFiles     = ["**/*.html", "**/*.md", "!_site/**/*.html"];
var jsFiles       = ["_includes/js/**/*.js", "!_includes/js/**/*.min.js"]
var jshintFiles   = jsFiles.concat("!js/modernizr-2.6.2-respond-1.1.0.js");
var cssFiles      = ["_includes/css/**/*.css", "!_includes/css/**/*.min.css"];
var lessFiles     = ["_includes/css/**/*.less"];
var allFiles      = [].concat(htmlFiles, jsFiles, cssFiles, lessFiles);

// http://www.jshint.com/docs/
var jshintOption  = {
  asi: true,
  es5: true,
  esnext: true,
  globalstrict: true,
  globals: {
    "require": false,
    "module": false
  }
}

var path = require("path");
//var livereloadSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet;
var livereloadSnippet = require("./node_modules/grunt-contrib/node_modules/grunt-contrib-livereload/lib/utils").livereloadSnippet;

module.exports = function(grunt) {
  grunt.initConfig({
    // npm の設定ファイル読み込み
    pkg: grunt.file.readJSON("package.json"),
    
    // JS Lint
    jshint: {
      options: jshintOption,
      Gruntfile: ["Gruntfile.js"],
      js: jshintFiles
    },
    
    // JavaScript 最小化
    uglify: {
      options: {
        preserveComments: false,
        //banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
        banner: "/*! Uglified on <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      all: {
        files: [
          {
            expand: true,
            src: jsFiles,
            dest: ".",
            ext: ".min.js"
          }
        ]
      },
      changed: {
        files: [
          {
            expand: true,
            src: '<%= grunt.regarde.changed %>',
            dest: ".",
            ext: ".min.js"
          }
        ]
      }
    },
    
    // CSS 最小化
    cssmin: {
      all: {
        files: [
          {
            expand: true,
            src: cssFiles,
            dest: ".",
            ext: ".min.css"
          }
        ]
      },
      changed: {
        files: [
          {
            expand: true,
            src: '<%= grunt.regarde.changed %>',
            dest: ".",
            ext: ".min.css"
          }
        ]
      }
    },
    
    // LESS コンパイル
    less: {
      all: {
        options: {
          yuicompress: true
        },
        files: [
          {
            expand: true,
            src: lessFiles,
            dest: ".",
            ext: ".min.css"
          }
        ]
      },
      changed: {
        options: {
          yuicompress: true
        },
        files: [
          {
            expand: true,
            src: '<%= grunt.regarde.changed %>',
            dest: ".",
            ext: ".min.css"
          }
        ]
      }
    },
    
    // Jekyll テンプレート
    jekyll: {
      generate: {
        src: ".",
        dest: jekyllDest
      },
      server: {
        server: true,
        server_port: 4000,
        auto: true
      }
    },
    
    // Web サーバを起動
    connect: {
      server: {
        options: {
          hostname: "localhost",
          port: 8000,
          base: jekyllDest,
          keepalive: true
        }
      },
      livereload: {
        options: {
          hostname: "localhost",
          port: 8000,
          //base: jekyllDest,
          
          middleware: function(connect, options) {
            return [
              livereloadSnippet,
              connect.static(path.resolve(jekyllDest))
            ];
          }
        }
      }
    },
    
    // ファイルを監視してライブリロード
    regarde: {
      js: {
        files: jsFiles,
        tasks: ["uglify:changed", "jekyll:generate", "livereload"]
      },
      css: {
        files: cssFiles,
        tasks: ["cssmin:changed", "jekyll:generate", "livereload"]
      },
      less: {
        files: lessFiles,
        tasks: ["less:changed", "jekyll:generate", "livereload"]
      },
      html: {
        files: htmlFiles,
        tasks: ["jekyll:generate", "livereload"]
      }
    },

    // ファイル更新時に自動処理
    watch: {
      Gruntfile: {
        files: "Gruntfile.js",
        tasks: ["jshint:Gruntfile"]
      },
      js: {
        options: {
          debounceDelay: 1000
        },
        files: jsFiles,
        tasks: ["jshint:js", "uglify:all"]
      },
      css: {
        options: {
          debounceDelay: 1000
        },
        files: cssFiles,
        tasks: ["cssmin:all"]
      },
      less: {
        options: {
          debounceDelay: 1000
        },
        files: lessFiles,
        tasks: ["less:all"]
      }
    }
  });

  // https://github.com/gruntjs/grunt-contrib
  //grunt.loadNpmTasks("grunt-connect");
  //grunt.loadNpmTasks("grunt-cssmin");
  //grunt.loadNpmTasks("grunt-jshint");
  //grunt.loadNpmTasks("grunt-less");
  //grunt.loadNpmTasks("grunt-livereload");
  //grunt.loadNpmTasks("grunt-uglify");
  //grunt.loadNpmTasks("grunt-watch");
  grunt.loadNpmTasks("grunt-contrib");
  // https://github.com/yeoman/grunt-regarde
  grunt.loadNpmTasks("grunt-regarde");
  // https://github.com/dannygarcia/grunt-jekyll
  grunt.loadNpmTasks("grunt-jekyll");

  // Default task(s).
  grunt.registerTask("default", ["uglify:all", "cssmin:all", "less:all", "jekyll:generate"]);
  
  grunt.registerTask("live", ["livereload-start", "connect:livereload", "regarde"]);

};