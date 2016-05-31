var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    shell = require('gulp-shell');

// Compile Stylesheets
gulp.task('css', function () {
  var processors = [ autoprefixer({browsers: ['last 1 version']}) ];
    return gulp.src('./scss/all.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('sinatra', shell.task([
  'ruby server.rb'
]));

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch', 'sinatra']);
