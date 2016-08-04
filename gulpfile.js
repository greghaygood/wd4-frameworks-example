var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


var onError = function(err) {
	console.log('An error occurred:', gutil.colors.magenta(err.message));
	gutil.beep();
	this.emit('end');
};

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('minify-css', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cleanCSS({}))
	.pipe(sourcemaps.write())
	.pipe(rename(function(path) {
		path.extname = '.min.css'
	}))
	.pipe(gulp.dest('css'));
});

gulp.task('scss', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});

gulp.task('server', ['scss', 'browser-sync'], function() {
	gulp.watch('scss/**/*.scss', ['scss', 'minify-css']);
	gulp.watch(['**/*.html', 'css/**/*.css']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss', 'minify-css']);
});

gulp.task('default', ['scss', 'minify-css']);

