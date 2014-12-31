'use strict';
var fs     = require('fs')
var gulp   = require('gulp')
var pkg    = require('./package.json');

fs.readdirSync(__dirname + '/gulp').forEach(function (module) {
  require(__dirname + '/gulp/' + module)
})

gulp.task('build', ['js', 'css', 'js:templates', 'js:copy', 'html:copy', 'font:copy'])
gulp.task('default', ['js:watch', 'css:watch', 'html:watch', 'js:templates:watch', 'font:copy:debug'])
gulp.task('build:debug', ['js:debug', 'js:templates:debug', 'css:debug', 'html:copy:debug', 'font:copy:debug'])

gulp.task('html:copy', function(){
	return gulp.src(pkg.paths.source.html)
		.pipe(gulp.dest(pkg.paths.dest.html))
});

gulp.task('html:copy:debug', function(){
	return gulp.src(pkg.paths.source.html)
		.pipe(gulp.dest(pkg.paths.dest.htmlDebug))
});

gulp.task('font:copy', ['js:bower'], function(){
	return gulp.src(pkg.paths.source.font)
		.pipe(gulp.dest(pkg.paths.dest.font));
});

gulp.task('font:copy:debug', ['js:bower'], function(){
	return gulp.src(pkg.paths.source.font)
		.pipe(gulp.dest(pkg.paths.dest.fontDebug));
});

gulp.task('html:watch', ['html:copy:debug'], function () {
  gulp.watch('./*.html', ['html:copy:debug'])
});