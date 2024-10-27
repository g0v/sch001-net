const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const data = require('gulp-data');
const connect = require('gulp-connect');
const sitemap = require('gulp-sitemap');

function buildScss() {
  gulp.src('src/scss/**/*.scss')
    .pipe(data((file) => {
      console.log("[build] " + file['history']);
    }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./static/styles'))
    .pipe(connect.reload());
}

function buildPug() {
  let build_time = new Date().getTime();
  gulp.src('src/pug/**/index.pug')
    .pipe(data((file) => {
      console.log("[build] " + file['history']);
      const result = {
        timestamp: build_time,
        index: require('./data/index.json'),
        index_old: require('./data/index2020.json'),
        power2020: require('./data/power2020.json'),
        power2021: require('./data/power2021.json'),
        power2022: require('./data/power2022.json'),
        power_ai: require('./data/power_ai.json'),
        ssr2021: require('./data/ssr2021.json')
      };
      return result;
    }))
    .pipe(pug())
    .pipe(gulp.dest('./static/'))
    .pipe(sitemap({
      siteUrl: 'https://sch001.g0v.tw',
      images: true
    }))
    .pipe(gulp.dest('./static/'))
    .pipe(connect.reload());
}

gulp.task('build', async() => {
  await buildScss();
  await buildPug();
});

gulp.task('server', function () {
  connect.server({
    port: 3000,
    livereload: true,
    host: '::',
    root: 'static'
  });
  buildScss();
  buildPug();

  gulp.watch(['src/**/*.scss'], function (cb) {
    buildScss();
    cb();
  });
  gulp.watch(['src/**/*.pug', 'src/**/*.scss', 'static/assets/js/*.js', 'data/*.json'], function (cb) {
    buildPug();
    cb();
  });
});