var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

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

gulp.task('watch', ['js'], function () {
    gulp.watch(sourcePath + '**/*.js', ['js'])
});
