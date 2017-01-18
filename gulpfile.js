'use strict';

var build = require('gulp-build');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var gulp = require('gulp');
// var handlebars = require('gulp-handlebars');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-compile-handlebars')(handlebars);
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap');

gulp.task('server', function () {
  nodemon({script: 'server.js'})
    .on('restart', function () {
      console.log('going to restart server!')
      setTimeout(function () {
        console.log('server restarted!')
      }, 500);
    });
});

gulp.task('handlebars', function() {
  gulp.src('./app/html/index.hbs')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('./build/html'));
});

gulp.task('styles', function () {
  return gulp.src('./app/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'))
});

gulp.task('handlebars:watch', function () {
  gulp.watch('./app/html/*.hbs', ['handlebars']);
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/*.scss', ['styles']);
});

gulp.task('default', ['server', 'handlebars', 'handlebars:watch', 'styles', 'sass:watch']);
