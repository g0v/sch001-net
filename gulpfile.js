const gulp = require('gulp');
const pug = require('gulp-pug-i18n');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const fs = require('fs');



function deploy() {
  let build_time = new Date().getTime();
  console.log(build_time);
  const datas = {
    timestamp: build_time,
    index: require('./data/index.json'),
    index_old: require('./data/index2020.json'),
    power: require('./data/power.json'),
    ssr2021: require('./data/ssr2021.json')
  };
  gulp.src('src/**/index.pug')    
    .pipe(pug({
      data: datas,
      i18n: {
        default: 'zh-TW',
        locales: 'src/locale/*.yml', // locales: en.yml, de.json,
        filename: '{{basename}}{-{{lang}}}{-{{region}}}.html',
        namespace: '$i18n'
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
    host: '0.0.0.0',
    livereload: true,
    root: 'static'
  })
  deploy();

  gulp.watch(['src/**/*.pug', 'data/*.json'], function (event) {
    deploy();
    event();
  });
});