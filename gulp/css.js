var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('css:admin', function () {
    return gulp.src('static/styles/admin/**/*.css')
        .pipe(concat('admin.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets'));
});

gulp.task('css:mobile', function () {
    return gulp.src('static/styles/mobile/**/*.css')
        .pipe(concat('mobile.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets'));
});

gulp.task('css:common', ['css:admin', 'css:mobile'], function () {
    return gulp.src('static/styles/*.css')
        .pipe(concat('common.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css:common'], function () {
    gulp.watch('static/styles/**/*.css', ['css:common']);
});