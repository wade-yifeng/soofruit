var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js:common', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/angular.js',
            'static/scripts/angular-route.js',
            'static/scripts/ng-file-upload-shim.js',
            'static/scripts/ng-file-upload.js',
            'static/scripts/jquery.js',
            'static/scripts/socket.io.js'
        ])
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});

gulp.task('js:custom', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'packs/**/client/routes.js',
            'packs/**/client/controllers/*.js',
            'static/scripts/orders/**/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('site.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js:common', 'js:custom'], function () {
    gulp.watch([
        'static/scripts/angular.js',
        'static/scripts/angular-route.js',
        'static/scripts/ng-file-upload-shim.js',
        'static/scripts/ng-file-upload.js',
        'static/scripts/jquery.js',
        'static/scripts/socket.io.js',
        'packs/**/client/routes.js',
        'packs/**/client/controllers/*.js',
        'static/scripts/orders/**/*.js'
    ], ['js:common', 'js:custom']);
});