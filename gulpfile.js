var gulp 	= require('gulp');
var uglify 	= require('gulp-uglify');
var sass 	= require('gulp-sass');

//Insert all front dependencies
gulp.task('inject', function(){
	var wiredep = require('wiredep').stream;
	var inject	= require('gulp-inject');

	var injectSrc = gulp.src(['./public/assets/css/*.css', './public/lib/materialize/css/*.css','./public/lib/socket.io/*.js', './public/lib/materialize/js/bin/materialize.min.js', './public/assets/js/*.js', './app/**/*.js'], {read: false});

	var injectOptions = {
		addRootSlash: false
		//ignorePath: '/public'
	};

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib'
		//ignorePath: '../../public'
	};

	return gulp.src('./index.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./'));
});

//Minified js files
gulp.task('jsmin', function(){
	return gulp.src('./app/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/app'));
});

//Compile Sass files
gulp.task('styles', function(){
	gulp.src(['./sass/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/lib/materialize/css'));
});

//Watch Sass files
gulp.task('autoSass', function(){
	gulp.watch(['./sass/*.scss', './sass/**/*.scss', './sass/**/**/*.scss'], ['styles']);
});