'use strict';

var path = require('path'),
    gulp = require('gulp'),
    extend = require('extend'),
    karma = require('karma').server,
    karmaConfig = require('./karma.conf'),
    config = require('./build.conf.js'),
    cssMinify = require('gulp-minify-css'),
    plugins = require('gulp-load-plugins')(),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    addStream = require('add-stream');

var ciMode = false;


gulp.task('css-minify', function () {
    gulp.src(config.buildFolder+'/*.css')
        .pipe(cssMinify())
        //.pipe(concat('style.min.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest(config.buildFolder))
    ;
});

function prepareTemplates() {
    return gulp.src('angular-multi-select/template/**/*.html')
        //.pipe(minify and preprocess the template html here)
        .pipe(angularTemplateCache({ module:'angular-multi-select'}));
}
gulp.task('clean', function () {
  return gulp.src(config.buildFolder, {read: false})
      .pipe(plugins.clean());
});

var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src(config.srcSass+'//*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.buildFolder));
});
gulp.task('scripts', function () {

  return gulp.src(config.srcJs)


    // package
      .pipe(addStream.obj(prepareTemplates()))
      .pipe(plugins.concat(config.buildJsFilename))
      .pipe(plugins.header(config.closureStart))
      .pipe(plugins.footer(config.closureEnd))
      .pipe(plugins.header(config.banner))
      .pipe(gulp.dest(config.buildFolder))
      .pipe(plugins.filesize())

    // minify
      .pipe(plugins.uglify())
      .pipe(plugins.rename({ extname: '.min.js' }))
      .pipe(gulp.dest(config.buildFolder))
      .pipe(plugins.filesize())
      .on('error', plugins.util.log);

});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src(config.srcJade+'//*.jade')
      .pipe(jade({
        locals: YOUR_LOCALS
      }))
      .pipe(gulp.dest(config.srcJade))
});

gulp.task('test', function () {

  karmaConfig({
    set: function (testConfig) {

      extend(testConfig, {
        singleRun: ciMode,
        autoWatch: !ciMode,
        browsers: ['PhantomJS']
      });

      karma.start(testConfig, function (exitCode) {
        plugins.util.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
      });
    }
  });
});

gulp.task('watch', function () {
  return gulp.watch(config.srcJs, ['scripts']);
});

gulp.task('ci', function () {
  ciMode = true;
  return gulp.start(['clean','sass','templates','css-minify','scripts']);
});

gulp.task('default', ['scripts']);