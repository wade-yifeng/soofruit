var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/angular.js',
            'static/scripts/angular-route.js',
            'static/scripts/jquery.js',
            'static/scripts/socket.io.js',
            'static/scripts/site/**/*.js'
        ])
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});

gulp.task('js:ng', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'packs/**/client/routes/*.js',
            'packs/**/client/controllers/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('ng.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js', 'js:ng'], function () {
    gulp.watch([
        'static/scripts/angular.js',
        'static/scripts/angular-route.js',
        'static/scripts/jquery.js',
        'static/scripts/socket.io.js',
        'static/scripts/site/**/*.js',
        'packs/**/client/routes/*.js',
        'packs/**/client/controllers/*.js'
    ], ['js', 'js:ng']);
});