const gulp = require('gulp');
const pug = require('gulp-pug-i18n');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const fs = require('fs');



function deploy() {
  const datas = {
    index: require('./data/index.json'),
    index_old: require('./data/index2020.json'),
    power: require('./data/power.json')
  };
  console.log(datas);
  gulp.src('src/**/index.pug')    
    .pipe(pug({
      data: datas,
      i18n: {
        default: 'zh-TW',
        locales: 'src/locale/*.yml', // locales: en.yml, de.json,
        filename: '{{basename}}{-{{lang}}}{-{{region}}}.html'
      }
    }))
    .pipe(gulp.dest('./static/'))
    .pipe(sitemap({ siteUrl: 'https://sch001.g0v.tw' }))
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

  gulp.watch(['src/**/*.pug', 'data/*.json'], function (event) {
    deploy();
    event();
  });
});