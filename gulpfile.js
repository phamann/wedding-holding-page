var gulp = require('gulp');
var sass = require('gulp-sass');
var svgo = require('gulp-svgo');
var base64 = require('gulp-base64');
var uglify = require('gulp-uglify');
var cssshrink = require('gulp-cssshrink');
var livereload = require('gulp-livereload');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var SRC = './static/src/';
var DIST = './dist/';

gulp.task('js', function() {
    gulp.src(SRC + 'js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('template', ['sass'], function() {
   gulp.src('template/**/*')
        .pipe(inject(gulp.src(DIST + 'css/head.css'), {
            starttag: '<style>',
            endtag: '</style>',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
       .pipe(inject(gulp.src(DIST + 'js/circles.js'), {
           starttag: '<script>',
           endtag: '</script>',
           transform: function (filePath, file) {
               return file.contents.toString('utf8')
           }
       }))
       .pipe(gulp.dest(DIST));
});

gulp.task('sass', ['svgo'], function () {
    gulp.src(SRC + 'css/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'none'
        }))
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
    gulp.watch(SRC + 'js/**/*.js', ['lint', 'js']);
    gulp.watch('template/**/*', ['template']);
});

gulp.task('dist', ['sass', 'template', 'js']);
gulp.task('default', ['sass', 'template', 'lint', 'js', 'watch']);