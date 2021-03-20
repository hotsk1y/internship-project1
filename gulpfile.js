const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'src/' },
    notify: false,
    online: true
  })
}

function scripts() {
  return src([
    'src/js/script.js',
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js/'))
    .pipe(browserSync.stream())
}

function styles() {
  return src(['src/scss/style.scss', 'src/css/normalize.css'])
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss(({ level: { 1: { specialComments: 0 } }, /*format: 'beautify'*/ })))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream())
}

function images() {
  return src('src/images/src/**/*')
    .pipe(newer('src/images/dest/'))
    .pipe(imagemin())
    .pipe(dest('src/images/dest/'))
}

function cleanimg() {
  return del('src/images/dest/**/*', { force: true })
}
function cleandist() {
  return del('dist/**/*', { force: true })
}

function buildcopy() {
  return src([
    'src/css/**/*.min.css', 
    'src/js/**/*.min.js', 
    'src/images/dest/**/*', 
    'src/**/*.html', 
  ], {base: 'src'})
  .pipe(dest('dist'))
}

function startwatch() {
  watch(['src/**/*.scss', '!src/**/*.min.css'], styles)
  watch(['src/**/*.js', '!src/**/*.min.js'], scripts)
  watch('src/**/*.html').on('change', browserSync.reload)
  watch('src/images/src/**/*', images)
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.build = series(cleandist, styles, scripts, images, buildcopy)

exports.default = parallel(styles, scripts, browsersync, startwatch);