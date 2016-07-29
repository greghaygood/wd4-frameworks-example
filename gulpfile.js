var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

var onError = function(err) {
	console.log('An error occurred:', gutil.colors.magenta(err.message));
	gutil.beep();
	this.emit('end');
};

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

});

gulp.task('scss', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(sass())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});

gulp.task('server', ['scss', 'browser-sync'], function() {
	gulp.watch('scss/**/*.scss', ['scss']);
	gulp.watch(['**/*.html', 'css/**/*.css']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss']);

