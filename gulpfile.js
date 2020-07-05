const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const server = require('gulp-express');
const fs = require('fs');

gulp.task('server', function () {    
    gulp.src('src/**/index.pug').pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('data/index.json'));
    })).pipe(pug()).pipe(gulp.dest('./static/'));
    server.run(['app.js']);    

    gulp.watch(['src/**/*.pug'], function(event){      
      gulp.src('src/**/index.pug').pipe(data(function(file) {
        return JSON.parse(fs.readFileSync('data/index.json'));
      })).pipe(pug()).pipe(gulp.dest('./static/'));
      event();
    });
});

gulp.task('build', function() {
    gulp.src('src/**/index.pug').pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('data/index.json'));
    })).pipe(pug()).pipe(gulp.dest('./static/'));  
});