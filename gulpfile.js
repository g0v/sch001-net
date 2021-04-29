const gulp = require('gulp');
const pug = require('gulp-pug-i18n');
const data = require('gulp-data');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const fs = require('fs');

function deploy() {
  gulp.src('src/**/index.pug')
  .pipe(data((file) => {
    console.log("[build] "+file['history']);
    const result = {
      index: require('./data/index.json'),
      index_old: require('./data/index2020.json'),
      power: require('./data/power.json')
    };
    return result;
  }))
  .pipe(pug({
    i18n: {
      locales: 'locale/*', // locales: en.yml, de.json,
      filename: '{{basename}}.{{lang}}.html'
    }
  }))
  .pipe(gulp.dest('./static/'))
  .pipe(sitemap({siteUrl: 'https://sch001.g0v.tw'}))
  .pipe(gulp.dest('./static/'))
  .pipe(connect.reload());
}

gulp.task('server', function () {
    connect.server({
        port: 3000,
        livereload: true,
        root: 'static'
    })
    deploy();

    gulp.watch(['src/**/*.pug', 'data/*.json'], function(event){
      deploy();
      event();
    });
});