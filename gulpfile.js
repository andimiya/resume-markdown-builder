'use strict';

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('start', function() {
  nodemon({script: 'server.js'})
    .on('restart', function() {
      console.log('restarting server');
      setTimeout(function() {
        console.log('server restarted');
      }, 500);
    });
});

gulp.task('markdown', function() {
  return gulp.src('./app/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('public'));
});

gulp.task('scss', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('public'))
});

gulp.task('watch', function() {
  gulp.watch('./app/*.md', ['markdown']);
  gulp.watch('./app/scss/*.scss', ['scss']);
})

gulp.task('default', ['start', 'markdown', 'scss', 'watch'], function() {
  console.log('tasks started');
});
