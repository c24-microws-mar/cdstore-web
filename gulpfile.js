'use strict';

const gulp = require('gulp');
const rimraf = require('rimraf');
const less = require('gulp-less');
const csso = require('gulp-csso');
const gulpIf = require('gulp-if');
const express = require('express');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const babelify = require('babelify');
const minimist = require('minimist');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const sequence = require('run-sequence');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const connectReload = require('connect-livereload');
const TinyShipyardClient = require('tiny-shipyard-client');
const pkg = require('./package.json');

const args = minimist(process.argv.slice(2), {
  boolean: ['minify'],
  string: ['tag']
});

const options = {
  minify: args.minify,
  serviceName: pkg.name,
  instances: 2,
  registryHost: '46.101.193.82',
  registryPort: '5000',
  shipyardUrl: 'http://46.101.245.190:8080',
  shipyardServiceKey: 'DbcGOIHQxGxgBVVT0/RYPvq7UB5t9vmhoTNO',
  versionTag: /^v?\d+\.\d+\.\d+$/.test(args.tag) ? args.tag.replace(/^v/, '') : undefined // do we have a version tag?
}

gulp.task('clean', function (done) {
  rimraf('dist', done);
});

gulp.task('scripts', function () {
  return browserify('app/main.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.error(err);
      if (livereload.server) this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpIf(options.minify, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf(livereload.server, livereload()));
});

gulp.task('styles', function () {
  return gulp.src('app/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', function (err) {
      console.error(err);
      if (livereload.server) this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(gulpIf(options.minify, csso()))
    .pipe(sourcemaps.write('.', { sourceRoot: '/source/app' }))
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf(livereload.server, livereload()));
});

gulp.task('html', function () {
  return gulp.src('app/**/*.html', { base: 'app' })
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf(livereload.server, livereload()));
});

gulp.task('build', function (done) {
  sequence('clean', ['scripts', 'styles', 'html'], done);
});

gulp.task('test', function () {
  return gulp.src('app/**/*.specs.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-register'
    }));
});

gulp.task('serve', ['build'], function (done) {
  const app = express();
  app.use(connectReload());
  app.use(express.static('dist'));
  app.listen(3000, done);
})

gulp.task('watch', ['serve'], function () {
  livereload.listen();
  gulp.watch('app/**/*.js', ['scripts', 'test']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.less', ['styles']);
});

gulp.task('dockerize', shell.task([
  `docker build -t ${options.serviceName} .`,
]));

gulp.task('push', shell.task([
  `docker run --privileged -d -p 5000:5000 -e REGISTRY_HOST="${options.registryHost}" -e REGISTRY_PORT="${options.registryPort}" rsmoorthy/registry-forwarder`,
  `docker tag ${options.serviceName} localhost:5000/${options.serviceName}:${options.versionTag}`,
  `docker push localhost:5000/${options.serviceName}:${options.versionTag}`
]));

gulp.task('deploy', function (done) {
  const client = new TinyShipyardClient(options.shipyardUrl, options.shipyardServiceKey);
  const imageName = `${options.registryHost}:${options.registryPort}/${options.serviceName}:${options.versionTag}`;
  let promise = Promise.resolve();
  for (let i = 0; i < options.instances; i += 1) promise = promise.then(() => client.createContainer(imageName));
  promise.then(() => done(), error => done(error));
});

gulp.task('ci', function (done) {
  runSequence.apply(null, options.versionTag
    ? ['test', 'build', 'dockerize', 'push', 'deploy', done]
    : ['test', 'build', 'dockerize', done]);
});

gulp.task('default', ['watch']);
