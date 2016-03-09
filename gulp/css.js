var gulp   = require('gulp')

gulp.task('css', function () {
  return gulp.src('styles/**/*.css')
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:css', ['css'], function () {
  gulp.watch('styles/**/*.css', ['css'])
})
