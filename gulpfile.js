// Include gulp & del
var gulp = require('gulp'); 
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');
var fc2json = require('gulp-file-contents-to-json');
var modify = require('gulp-modify');
var minifyHTML = require('gulp-minify-html');

var dirs = {
    source: 'src',
    staging: 'staging',
    release: 'dist'
}

// Clean
gulp.task('clean', function (cb) {
    del([dirs.release], cb);
});

// Copy files
gulp.task('copy:html', function() {
    return gulp.src(dirs.source+'/*.html')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:images', function() {
    return gulp.src(dirs.source+'/images/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:extras', function() {
    return gulp.src(dirs.source+'/extras/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:scripts', function() {
    return gulp.src([
            dirs.source+'/vendor/jquery/dist/jquery.min.js',
            dirs.source+'/vendor/backbone/backbone-min.js',
            dirs.source+'/vendor/bootstrap/dist/css/bootstrap.min.css',
            dirs.source+'/vendor/bootstrap/dist/js/bootstrap.min.js',
            dirs.source+'/vendor/underscore/underscore-min.js',
            dirs.source+'/vendor/requirejs/require.js',
            dirs.source+'/vendor/mustache.js/mustache.js',
            dirs.source+'/vendor/font-awesome/css/font-awesome.min.css',
            dirs.source+'/vendor/font-awesome/fonts/**',
            dirs.source+'/vendor/backbone-mustache-auth/index.js',
            dirs.source+'/js/**/*'
        ]).pipe(copy(dirs.release, {prefix: 1}));
});
// Copy dummy data
gulp.task('copy:dummy', function() {
    return gulp.src(dirs.source+'/js/Dummy/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});


// Lint Tasks
gulp.task('lint:before', function() {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('lint:after', ['minify'], function() {
    return gulp.src([
            dirs.release+'/js/built.min.js',
            dirs.release+'/js/built.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Mustache template concat
gulp.task('mustache', function(){
    gulp.src(dirs.source+'/templates/**/*')
        //.pipe(minifyHTML())
        .pipe(fc2json('templates.js'))
        .pipe(modify({
            fileModifier: function(file, contents) {
                    return "Templates = "+contents;
                }
        }))
        .pipe(gulp.dest(dirs.release+'/templates'));
});

// Concatenate & Minify JS
gulp.task('concat', function() {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(concat('built.js'))
        .pipe(gulp.dest(dirs.release+'/js'));
});
gulp.task('minify', function() {
    return gulp.src(dirs.release+'/js/built.js')
        .pipe(rename('built.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.release+'/js'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(dirs.source+'/css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(dirs.release+'/css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(dirs.source+'/*.html', ['copy:html']);
    gulp.watch(dirs.source+'/js/**/*', ['copy:scripts', 'lint:before']);
    gulp.watch(dirs.source+'/css/**/*', ['sass']);
    gulp.watch(dirs.source+'/templates/**/*', ['mustache']);
    gulp.watch(dirs.source+'/js/Dummy/*', ['copy:dummy']);
});

// Build and release tasks
gulp.task('release', function(callback){
    runSequence('build', ['concat', 'minify', 'lint:after'], callback);
}); 
gulp.task('build', function(callback){
    runSequence('clean', ['copy:images', 'copy:dummy', 'copy:html', 'copy:scripts', 'copy:extras', 'sass', 'lint:before', 'mustache'], callback);
}); 
gulp.task('default', ['build', 'watch']);