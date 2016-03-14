var gulp = require('gulp');
var fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task)
});

gulp.task('build', ['js', 'js:ng', 'css']);
gulp.task('watch', ['watch:js', 'watch:css']);
gulp.task('dev', ['watch', 'copytemplates', 'dev:server']);

gulp.task('default', ['dev']);