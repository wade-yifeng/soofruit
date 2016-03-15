var gulp = require('gulp');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

gulp.task('cssadmin', function () {
    return gulp.src('static/styles/admin/**/*.css')
        .pipe(concat('admin.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('assets'));
});

gulp.task('cssmobile', function () {
    return gulp.src('static/styles/mobile/**/*.css')
        .pipe(concat('mobile.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('assets'));
});

gulp.task('css', ['cssadmin', 'cssmobile'], function () {
    return gulp.src('static/styles/*.css')
        .pipe(concat('site.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('static/styles/**/*.css', ['css']);
});