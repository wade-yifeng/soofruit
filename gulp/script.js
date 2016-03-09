var gulp   = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('js', function () {
  return gulp.src(['angular/router.js', 'controllers/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(ngAnnotate())
      .pipe(concat('ng.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
  gulp.watch('controllers/**/*.js', ['js'])
  gulp.watch('angular/router.js', ['js'])
})
