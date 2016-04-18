var gulp = require('gulp');
var browserify = require('browserify');
var replace = require('gulp-replace');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify({
        entries: [
            'models/validators/validate_result.js',
            'models/validators/good.js'
        ]
    })
        .bundle()
        .pipe(source('browserified.js'))
        //替换为window.XXXXX以便将方法暴露出供客户端调用
        .pipe(replace('module.exports.ValidateGood', 'window.ValidateGood'))
        .pipe(gulp.dest('assets/'));
});

gulp.task('watch:browserify', ['browserify'], function () {
    gulp.watch('validators/*.js', ['browserify']);
});