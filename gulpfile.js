var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat      	= require('gulp-concat'),
	uglify      	= require('gulp-uglifyjs'),
	cssnano     	= require('gulp-cssnano'),
	rename      	= require('gulp-rename'),
	del         	= require('del'),
	imagemin   	 	= require('gulp-imagemin'),
	pngquant    	= require('imagemin-pngquant');
	cache       	= require('gulp-cache');
	autoprefixer	= require('gulp-autoprefixer');
	includer        = require("gulp-x-includer");


/*gulp.task("include", function(){
	console.log(111);
    return gulp.src(["app/*.html"])
    		.pipe(includer())
    		.pipe(gulp.dest("app/build/"));

});*/




// Переводим sass в css
gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});


// Сжимаем и минимизируем js библиотеки

// !!! ВСЕ CSS БИБЛИОТЕКИ ЗАПИСЫВАЮТСЯ
// В ФАЙЛЕ APP/SASS/LIBS.SASS !!!

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});


//  Переименовываем и минимизируем css библиотеки
gulp.task('css-libs',['sass'], function(){
	return gulp.src('app/css/libs.css')
	// Сжимаем файл
	.pipe(cssnano()) 
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest('app/css'));
})


// Обновление страницы браузера
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: true
	});
});

// Удаляем старый собранный проект
gulp.task('clean', function(){
	return del.sync('dist');
});
// Очищаем cache картинок
gulp.task('clear-cache', function(){
	return cache.clearAll();
})

// Сжимаем картинки
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{
			removeViewBox: false
		}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
})


// Смотрим обновленные файлы
	// Второй аргумент, запускаются таски до таска watch
gulp.task('watch',['browser-sync', 'include', 'sass', 'css-libs', 'scripts'], function(){
	// Первый аргумент - путь, в котором мы ищим изменяемые файлы
	// Второй аргумент - в массиве перечесляем название тасков, которые будут выполняться
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/img/**/*.svg', browserSync.reload);
});

// Собираем проект
gulp.task('build',['clean', 'img', 'sass', 'scripts'], function(){
	
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css'
		])
		.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'));

})