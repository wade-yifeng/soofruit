var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js:mobile', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/mobile/**/*.js',
            'mobile/routes.js',
            'mobile/filters.js',
            'mobile/*.svc.js',
            'mobile/*.ctrl.js'
        ])
        .pipe(sourcemaps.init())    //Debug需要
        .pipe(ngAnnotate())         //uglify需要
        .pipe(concat('mobile.js'))
        //.pipe(uglify())           //生产环境需要
        .pipe(sourcemaps.write())   //Debug需要
        .pipe(gulp.dest('assets'));
});

gulp.task('js:admin', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/admin/**/*.js',
            'admin/routes.js',
            'admin/filters.js',
            'admin/*.svc.js',
            'admin/*.ctrl.js'
        ])
        .pipe(sourcemaps.init())    //Debug需要
        .pipe(ngAnnotate())         //uglify需要
        .pipe(concat('admin.js'))
        //.pipe(uglify())           //生产环境需要
        .pipe(sourcemaps.write())   //Debug需要
        .pipe(gulp.dest('assets'));
});

gulp.task('js:common', ['js:mobile', 'js:admin'], function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/angular.js',
            'static/scripts/angular-cookies.js',
            'static/scripts/angular-ui-router.js',
            'static/scripts/ng-file-upload-shim.js',
            'static/scripts/ng-file-upload.js',
            'static/scripts/jquery.js',
            'static/scripts/bootstrap.js',
            'static/scripts/socket.io.js',
            'static/scripts/underscore.js',
            'static/scripts/site.js'
        ])
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js:common'], function () {
    gulp.watch([
        'static/scripts/angular.js',
        'static/scripts/angular-cookies.js',
        'static/scripts/angular-ui-router.js',
        'static/scripts/ng-file-upload-shim.js',
        'static/scripts/ng-file-upload.js',
        'static/scripts/jquery.js',
        'static/scripts/bootstrap.js',
        'static/scripts/socket.io.js',
        'static/scripts/underscore.js',
        'static/scripts/site.js',
        'static/scripts/mobile/**/*.js',
        'static/scripts/admin/**/*.js',
        'mobile/routes.js',
        'mobile/filters.js',
        'mobile/*.svc.js',
        'mobile/*.ctrl.js',
        'admin/routes.js',
        'admin/filters.js',
        'admin/*.svc.js',
        'admin/*.ctrl.js'
    ], ['js:common']);
});