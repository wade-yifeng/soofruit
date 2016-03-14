var gulp = require('gulp');
var fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task)
});

gulp.task('build', ['js', 'js:ng', 'css', 'copytemplates']);
gulp.task('watch', ['watch:js', 'watch:css', 'watch:html']);
gulp.task('dev', ['watch', 'dev:server']);

gulp.task('default', ['dev']);