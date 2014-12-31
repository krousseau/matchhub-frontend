'use strict';
var gulp       = require('gulp')
var concat     = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate')
var plumber    = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var uglify     = require('gulp-uglify')
var eslint     = require('gulp-eslint')
var templates  = require('gulp-angular-templatecache')
var rimraf     = require('gulp-rimraf')
var bower      = require('gulp-bower');
var pkg        = require('../package.json');

gulp.task('js', ['js:eslint', 'js:clean'], function () {
  return gulp.src(pkg.paths.source.js)
    .pipe(sourcemaps.init())
	    .pipe(plumber())
	    .pipe(concat('app.js'))
	    .pipe(ngAnnotate())
	    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pkg.paths.dest.js));
});


gulp.task('js:debug', ['js:eslint', 'js:libs:debug'], function () {
  return gulp.src(pkg.paths.source.js)
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pkg.paths.dest.jsdebug));
});

gulp.task('js:templates', ['js:clean'], function () {
    gulp.src('templates/**/*.html')
        .pipe(templates('templates.js', { standalone: true }))
        .pipe(gulp.dest(pkg.paths.dest.js));
});

gulp.task('js:templates:debug', function () {
    gulp.src('templates/**/*.html')
        .pipe(templates('templates.js', { standalone: true }))
        .pipe(gulp.dest(pkg.paths.dest.jsdebug));
});

gulp.task('js:bower', function() {
  return bower()
    .pipe(gulp.dest('assets/'))
});

gulp.task('js:copy', ['js:clean', 'js:bower'], function(){
	return gulp.src('assets/**/*.js')
		.pipe(gulp.dest(pkg.paths.dest.js))
});

gulp.task('js:libs:debug', ['js:bower'], function(){
  return gulp.src('assets/**/*.js')
    .pipe(gulp.dest(pkg.paths.dest.jsdebug))
});

gulp.task('js:eslint', function () {
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('js:watch', ['js:debug'], function () {
  gulp.watch('src/**/*.js', ['js:debug'])
});

gulp.task('js:templates:watch', ['js:templates:debug'], function () {
  gulp.watch('templates/**/*.html', ['js:templates:debug'])
});


gulp.task('js:clean', function() {
  return gulp.src(pkg.paths.dest.js, { read: false })
    .pipe(rimraf({ force: true }));
});