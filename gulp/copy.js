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

gulp.task('copy:templates', ['copy:fonts', 'copy:images'], function () {
    return gulp.src([
            'app/templates/**/*.html'
        ])
        //.pipe(minifyhtml())
        .pipe(gulp.dest('views/'));
});

gulp.task('watch:html', ['copy:templates'], function () {
    gulp.watch([
        'app/templates/**/*.html'
    ], ['copy:templates']);
});