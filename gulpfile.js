var gulp = require('gulp');
var sass = require('gulp-sass');
var svgo = require('gulp-svgo');
var base64 = require('gulp-base64');
var uglify = require('gulp-uglify');
var cssshrink = require('gulp-cssshrink');
var livereload = require('gulp-livereload');

var SRC = './static/src/';
var DIST = './dist/';

gulp.task('js', function() {
    gulp.src(SRC + 'js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('template', function() {
   gulp.src('template/**/*')
       .pipe(gulp.dest(DIST));
});

gulp.task('sass', function () {
    gulp.src(SRC + 'css/**/*.scss')
        .pipe(sass())
        .pipe(base64({
            baseDir: DIST,
            extensions: ['svg'],
            debug: true
        }))
        .pipe(cssshrink())
        .pipe(gulp.dest(DIST + 'css/'));
});

gulp.task('svgo', function () {
    gulp.src(SRC + 'img/**/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest(DIST + 'img/'));
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(DIST + '**/*', livereload.changed);
    gulp.watch(SRC + 'img/**/*.svg', ['svgo']);
    gulp.watch(SRC + 'css/**/*.scss', ['sass']);
    gulp.watch(SRC + 'js/**/*.js', ['js']);
    gulp.watch('template/**/*', ['template']);
});

gulp.task('default', ['template', 'svgo', 'sass', 'js', 'watch']);