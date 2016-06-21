var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyhtml = require('gulp-minify-html');

gulp.task('copy:fonts', function () {
    return gulp.src('static/fonts/*.*', {base: 'static'})
        .pipe(gulp.dest('assets/'));
});

gulp.task('copy:images', function () {
    return gulp.src('static/images/**/*.*', {base: 'static'})
        .pipe(gulp.dest('assets/'));
});

gulp.task('copy:views', ['copy:fonts', 'copy:images'], function () {
    return gulp.src([
            'app/views/**/*.html'
        ])
        //.pipe(minifyhtml())
        .pipe(gulp.dest('views/'));
});

gulp.task('watch:html', ['copy:views'], function () {
    gulp.watch([
        'app/views/**/*.html'
    ], ['copy:views']);
});