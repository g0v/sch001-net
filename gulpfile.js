const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('pug', () => {
  return gulp
    .src('src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./static/'));
});