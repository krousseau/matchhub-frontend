var gulp       = require('gulp')
var sass       = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var plumber    = require('gulp-plumber')
var rimraf     = require('gulp-rimraf')
var pkg        = require('../package.json');

gulp.task('css', ['css:clean'], function () {
  return gulp.src(pkg.paths.source.css)
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pkg.paths.dest.css))
})

gulp.task('css:debug', function () {
  return gulp.src(pkg.paths.source.css)
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pkg.paths.dest.cssdebug))
})

gulp.task('css:watch', ['css:debug'], function () {
  gulp.watch('css/*.scss', ['css:debug'])
});

gulp.task('css:clean', function() {
  return gulp.src(pkg.paths.dest.css, { read: false })
    .pipe(rimraf({ force: true }));
});