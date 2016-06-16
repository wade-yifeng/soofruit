var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('css:app', function () {
    return gulp.src('static/styles/app/*.css')
        .pipe(concat('app.css'))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('assets'));
});

gulp.task('css:common', ['css:app'], function () {
    return gulp.src('static/styles/*.css')
        .pipe(concat('common.css'))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css:common'], function () {
    gulp.watch('static/styles/**/*.css', ['css:common']);
});