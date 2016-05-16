'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        dist: 'dist'
    }

    grunt.initConfig({
        config: config,

        copy: {
            // 法1:
            // dist_html: {
            //     src: '<%= config.app %>/index.html',
            //     dest: '<%= config.dist %>/index.html'
            // },
            // dist_js: {
            //     src: '<%= config.app %>/js/index.js',
            //     dest: '<%= config.dist %>/js/index.js'
            // }
            //
            // 法2:
            dist_html: {
                files: [
                    // {
                    //     src: '<%= config.app %>/index.html',
                    //     dest: '<%= config.dist %>/index.html'
                    // },
                    // {
                    //     src: '<%= config.app %>/js/index.js',
                    //     dest: '<%= config.dist %>/js/index.js'
                    // }
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: '**/*.js',
                        dest: '<%= config.dist %>/',
                        ext: '.js',
                        extDot: 'last', // 'first'
                        flatten: true, // 去掉中间各级目录
                        rename: function(dest, src) {
                            return dest + 'js/' + src;
                        }
                    }
                ]
                //
            // 法3:
                // files: {
                //     '<%= config.dist %>/index.html': '<%= config.app %>/index.html',
                //     '<%= config.dist %>/js/index.js': ['<%= config.app %>/js/index.js']
                // }
            }
        },

        clean: {
            dist: {
                // 法1: 数组
                // src: ['<%= config.dist %>/index.html', '<%= config.dist %>/js/index.js']
                //
                // 法2: global -> *匹配除'/'任意字符; ?匹配除'/'外的一个字符; **匹配任意数量任意字符; {a,b}.js 匹配a.js和b.js; !对当前需求取反;
                src: ['<%= config.dist %>/**/*'],
                // filter: 'isFile'
                // filter: function(filepath) {
                //     return (!grunt.file.isDir(filepath));
                // },
                // 命中.开头文件: eg: **/index.html, 若dot:true, 则可命中.index.html
                // dot: true,
                // 若matchBase为true,则a?b只命中/xyz/123/acb, 不命中/xyz/acb/123
                // matchBase: true,
            }
        }
    });
}