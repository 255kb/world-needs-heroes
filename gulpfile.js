var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css');

var sourcePath = 'app/src/', distPath = 'app/dist/';

gulp.task('js', function () {
  gulp.src([
    sourcePath + 'scripts/vendor/*.js',
    sourcePath + 'scripts/app.js',
    sourcePath + 'scripts/libs/*.js',
    sourcePath + 'scripts/views/*.js',
    sourcePath + 'scripts/tags/*.js'
  ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distPath))
});

gulp.task('minify-css', function () {
  return gulp.src(sourcePath + 'style/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(distPath + 'style'));
});

gulp.task('watch', ['js', 'minify-css'], function () {
  gulp.watch(sourcePath + '**/*.js', ['js']);
  gulp.watch(sourcePath + '**/*.css', ['minify-css']);
});
