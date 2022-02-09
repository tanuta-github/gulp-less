
import gulp from "gulp"
import imagemin from "gulp-imagemin"
import less from 'gulp-less'
import cssmin from 'gulp-clean-css'
import mmq from 'gulp-merge-media-queries'
import browserSync from 'browser-sync'
import uglify from 'gulp-uglify'

gulp.task('less', function () {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', './src/less/*.less'])
        .pipe(less())
        .pipe(mmq())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','./src/js/*.js'])
    .pipe(uglify ())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream())
});

gulp.task('html', function(){
  return gulp.src([
    './src/*.html',
    ]).pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});

gulp.task('images', function(){
  return gulp.src([
    './src/assets/**/*',
    ]).pipe(imagemin()).pipe(gulp.dest('./dist/assets/')).pipe(browserSync.stream())
});

gulp.task('watch', function () {
  gulp.watch(['./src/less/**/*.less'], gulp.series('less'), browserSync.reload)
  gulp.watch(['./src/js/**/*.js'], gulp.series('js'), browserSync.reload)
  gulp.watch(['./src/*.html'], gulp.series('html'), browserSync.reload)
  gulp.watch(['./src/assets/**/*'], gulp.series('images'), browserSync.reload)
});

gulp.task('browser-sync', function() { 
	browserSync({ 
    injectChanges: true,
		server: {
			baseDir: 'dist' 
		},
		notify: false 
	});
});

gulp.task('build', gulp.parallel('html', 'js', 'less', 'images'))

gulp.task('default', gulp.parallel('browser-sync', 'watch'))