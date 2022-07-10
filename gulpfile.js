const gulp = require('gulp');
const pug = require('gulp-pug');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');
const data = require('gulp-data');
const fs = require('fs');



function deploy() {
  let build_time = new Date().getTime();
  console.log(build_time);
  gulp.src('src/**/index.pug')    
    .pipe(data((file) => {
      console.log("[build] " + file['history']);
      const result = {
        timestamp: build_time,
        index: require('./data/index.json'),
        index_old: require('./data/index2020.json'),
        power2020: require('./data/power2020.json'),
        power2021: require('./data/power2021.json'),
        ssr2021: require('./data/ssr2021.json')
      };
      return result;
    }))
    .pipe(pug({
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