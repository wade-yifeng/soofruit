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
    return gulp.src([
            'mobile/templates/**/*.html',
            'admin/templates/**/*.html'
        ])
        .pipe(rename({dirname: 'views'}))
        .pipe(minifyhtml())
        .pipe(gulp.dest('./'));
});

gulp.task('watch:html', ['copy:templates'], function () {
    gulp.watch([
        'mobile/templates/**/*.html',
        'admin/templates/**/*.html'
    ], ['copy:templates']);
});