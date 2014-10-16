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
var clean = require('gulp-clean');

var SRC = './static/';
var DIST = './dist/';

gulp.task('clean', function () {
    return gulp.src(DIST + '/*', {read: false})
        .pipe(clean());
});

gulp.task('js', ['clean'], function() {
    gulp.src(SRC + 'js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST + 'js/'));

    gulp.src('jspm_packages/**/*.js')
        .pipe(gulp.dest(DIST + 'js/packages/'));

    gulp.src('config.js')
        .pipe(uglify())
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('template', ['clean', 'sass'], function() {
    gulp.src('client/**/*.html')
        .pipe(gulp.dest(DIST));

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

gulp.task('sass', ['clean', 'svgo'], function () {
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

gulp.task('svgo', ['clean'], function () {
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

gulp.task('dist', ['clean', 'sass', 'template', 'js']);
gulp.task('default', ['clean', 'sass', 'template', 'lint', 'js']);