var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
});

// Compile Stylesheets
gulp.task('css', function () {
  var processors = [ autoprefixer({browsers: ['last 1 version']}) ];
    return gulp.src('./scss/all.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'))
        .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch', 'connect']);
