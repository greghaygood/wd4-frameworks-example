var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

var onError = function(err) {
	// to be filled in
};

gulp.task('scss', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(sass())
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss']);

