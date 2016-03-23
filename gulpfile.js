// Include gulp & del
var gulp = require('gulp');
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');
var fc2json = require('gulp-file-contents-to-json');
var modify = require('gulp-modify');
var mustache = require('gulp-mustache');
var fs = require('fs');

// Read config file
var config = {},
    pathname = '';

define = function(d){ config = d; }
c = require('./src/js/config.js');
eval(c);

m = fs.readFileSync('./src/js/main.js', 'utf-8');
m = m.substring(m.indexOf('require.config')+15, m.indexOf('});')+1);

config.main = eval('(' + m + ')');

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
// Copy files
gulp.task('copy:html', function () {
    return gulp.src([dirs.source+'/*.html'])
        .pipe(mustache(config))
        .pipe(gulp.dest(dirs.release));
});
gulp.task('copy:images', function() {
    return gulp.src(dirs.source+'/images/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:scripts', function() {

    var vendorPaths = Object.keys(config.main.paths).map(function(k) {
        return dirs.source+'/'+config.main.paths[k]+'.js'
    });

    var otherPaths = [
        dirs.source+'/js/**/*'
    ];

    return gulp.src(vendorPaths.concat(otherPaths)).pipe(copy(dirs.release, {prefix: 1}));
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
    runSequence('clean', ['copy:images', 'copy:dummy', 'copy:html', 'copy:scripts', 'sass', 'mustache'], callback);
});
gulp.task('build', function(callback){
    runSequence('clean', ['copy:images', 'copy:dummy', 'copy:html', 'copy:scripts', 'sass', 'lint:before', 'mustache'], callback);
});
gulp.task('default', ['build', 'watch']);