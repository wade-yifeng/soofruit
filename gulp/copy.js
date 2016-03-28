/**
 * Created by Leo on 2016/3/13.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyhtml = require('gulp-minify-html');

gulp.task('copy:fonts', function () {
    return gulp.src('static/fonts/*.*', {base: 'static'})
        .pipe(gulp.dest('assets/'));
});

gulp.task('copy:imgs', function () {
    return gulp.src('static/imgs/**/*.*', {base: 'static'})
        .pipe(gulp.dest('assets/'));
});

gulp.task('copy:templates', ['copy:fonts', 'copy:imgs'], function () {
    return gulp.src('packs/**/client/templates/**/*.html')
        .pipe(rename({dirname: 'pages'}))
        .pipe(minifyhtml())
        .pipe(gulp.dest('assets/'));
});

gulp.task('watch:html', ['copy:templates'], function () {
    gulp.watch('packs/**/client/templates/**/*.html', ['copy:templates']);
});