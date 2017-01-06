'use strict';

var build = require('gulp-build');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
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

gulp.task('templates', function(){
  gulp.src('source/templates/*.hbs')
  .pipe(handlebars())
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(declare({
    namespace: 'MyApp.templates',
    noRedeclare: true, // Avoid duplicate declarations
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('build/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['server', 'templates', 'sass', 'sass:watch'])



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
