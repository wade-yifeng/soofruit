var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

gulp.task('css', function () {
    return gulp.src('assets/styles/*.css')
        .pipe(concat('site.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('assets/styles/*.css', ['css']);
});