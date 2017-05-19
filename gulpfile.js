'use strict';

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');
var gap = require('gulp-append-prepend');

gulp.task('watch-files', function() {
  gulp.watch('./app/*.md', ['markdown']);
  gulp.watch('./app/scss/*.scss', ['scss']);
});

gulp.task('markdown', function() {
  gulp.src('./app/*.md')
    .pipe(markdown())
    .pipe(gap.prependText('<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="https://devleague-resumes.airshipcms.io/assets/styles/default.css"><link rel="stylesheet" type="text/css" href="styles.css"><link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet"><title>Andrea Takamiya</title><meta name="description" content="Resume for Andrea Takamiya, Junior Full Stack Javascript Developer, Product Manager, Project Manager, and Digital Marketer." /><meta name="robots" content="index,follow" /><meta name="keywords" content="Andrea, Takamiya, Andrea Takamiya, resume, Javascript developer, digital marketing, advertising, project manager, product owner" /></head>'))
    .pipe(gap.appendText('</html>'))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('public'));
});

gulp.task('open', function () {
  gulp.src('./public/index.html')
    .pipe(open({uri: 'http://localhost:8282'}));
});

gulp.task('public-server', function (){
  connect.server({
    root: './public',
    port: 8282,
    livereload: true
  });
});

gulp.task('default', ['scss', 'public-server', 'open', 'watch-files']);
