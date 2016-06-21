var gulp          = require('gulp');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var ngAnnotate    = require('gulp-ng-annotate');
var sourcemaps    = require('gulp-sourcemaps');
// var minifyhtml = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var addStream     = require('add-stream');

var prepareTemplates = function() {
  return gulp.src('app/templates/**/*.html')
        //.pipe(minifyhtml())
        .pipe(templateCache());
};

gulp.task('js:app', function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/app/*.js',
            'app/services/*.js',
            'app/controllers/*.js',
            'app/app.js'
        ])
        .pipe(sourcemaps.init())    //Debug需要
        .pipe(ngAnnotate())         //uglify需要
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('app.js'))
        //.pipe(uglify())           //生产环境需要
        .pipe(sourcemaps.write())   //Debug需要
        .pipe(gulp.dest('assets'));
});

gulp.task('js:common', ['js:app'], function () {
    return gulp.src([
            //必须按顺序将内容压缩进去,否则不能正常执行
            'static/scripts/jquery-3.0.0.js',
            'static/scripts/angular.js',
            'static/scripts/angular-ui-router.js',
            'static/scripts/swiper.js'
        ])
        .pipe(concat('common.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js:common'], function () {
    gulp.watch([
        'static/scripts/jquery-3.0.0.js',
        'static/scripts/angular.js',
        'static/scripts/angular-ui-router.js',
        'static/scripts/swiper.js',
        'static/scripts/app/*.js',
        'app/services/*.js',
        'app/controllers/*.js',
        'app/app.js'
    ], ['js:common']);
});