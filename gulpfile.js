import gulp from "gulp"
import imagemin from "gulp-imagemin"
import less from 'gulp-less'
import cssmin from 'gulp-clean-css'
import mmq from 'gulp-merge-media-queries'
import browserSync from 'browser-sync'
import uglify from 'gulp-uglify'

gulp.task('less', function () {
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 
  'node_modules/simple-jscalendar/source/jsCalendar.css',
  'node_modules/choices.js/public/assets/styles/choices.min.css',
  'node_modules/swiper/swiper-bundle.css',
  './resources/less/*.less'])
        .pipe(less())
        .pipe(mmq())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/inputmask/dist/inputmask.min.js', 
  'node_modules/simple-jscalendar/source/jsCalendar.js',
  'node_modules/simple-jscalendar/source/jsCalendar.lang.ru.js',
  'node_modules/choices.js/public/assets/scripts/choices.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
  './resources/js/*.js'])
    .pipe(uglify ())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream())
});

gulp.task('html', function(){
  return gulp.src([
    './resources/*.html',
    ]).pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});

gulp.task('images', function(){
  return gulp.src([
    './resources/images/**/*',
    ]).pipe(imagemin()).pipe(gulp.dest('./dist/images/')).pipe(browserSync.stream())
});

gulp.task('watch', function () {
  gulp.watch(['./resources/less/**/*.less'], gulp.series('less'), browserSync.reload)
  gulp.watch(['./resources/js/**/*.js'], gulp.series('js'), browserSync.reload)
  gulp.watch(['./resources/*.html'], gulp.series('html'), browserSync.reload)
  gulp.watch(['./resources/images/**/*'], gulp.series('images'), browserSync.reload)
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