const gulp = require('gulp');
const pug = require('gulp-pug');
const server = require('gulp-express');
const browserSync = require('browser-sync').create();

gulp.task('server', function () {
    gulp.src('src/**/*.pug').pipe(pug()).pipe(gulp.dest('./static/'));
    
    server.run(['app.js']);    

    gulp.watch(['src/**/*.pug'], function(event){
      gulp.src('src/**/*.pug').pipe(pug()).pipe(gulp.dest('./static/'));
      browserSync.reload;
    });
});