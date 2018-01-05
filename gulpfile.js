var cp          = require('child_process');
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
var pixelstorem = require('postcss-pixels-to-rem');


// PostCSS tasks
gulp.task('css', function() {
  var postcss       = require('gulp-postcss')
  var sourcemaps    = require('gulp-sourcemaps')

  return gulp.src('src/index.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ require('precss'), require('autoprefixer'), pixelstorem({base: 16, unit:"rem", exclude: ["box-shadow"]}) ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('_site/build/') )
    .pipe(browserSync.reload({stream:true}))
    .pipe( gulp.dest('build/') )
})

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( 'jekyll' , ['build', '--baseurl='], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['css', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: './_site'
        }
    });
});

// Watch for change
gulp.task('watch', function () {
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch(['./**/*.html', './**/*.md', '!./_site/**/*'], ['jekyll-rebuild']);
});

// Default task for 'gulp' command
gulp.task('default',['css', 'browser-sync', 'watch'])
