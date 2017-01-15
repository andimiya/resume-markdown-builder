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
  .pipe(gulp.dest('./build/html'));
});

gulp.task('styles', function () {
  return gulp.src('./app/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'))
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/*.scss', ['styles']);
});

gulp.task('default', ['server', 'handlebars', 'styles', 'sass:watch'])



// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var refresh = require('gulp-livereload');
// var nodemon = require('gulp-nodemon');
// var livereloadport = 35729;
//
// gulp.task('server', function () {
//
//   // restart server if app.js changes
//   nodemon({ script: 'app.js' })
//     .on('restart', function () {
//       console.log('going to restart server!')
//       setTimeout(function(){
//         console.log('restarted server!')
//         refresh.changed("app.js");
//       },500);
//     });
//
// });
//
// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass( { errLogToConsole: true } ))
//     .pipe(gulp.dest('./public/css'));
// });
//
//
// gulp.task('watch', function() {
//   // listen for livereload
//   refresh.listen(livereloadport);
//
//   gulp.watch('./sass/**/*.scss', ['sass']);
//
//   // Livereload when jade templates, or static assets change
//   gulp.watch([
//     './public/**/*',
//     'views/**/*.jade'], refresh.changed);
//
// });
//
// gulp.task('default', ['server','watch','sass']);
