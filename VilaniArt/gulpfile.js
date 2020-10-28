const { optipng } = require('gulp-imagemin');

const { src, dest, parallel, series, watch } = require('gulp'),
      browserSync  = require('browser-sync'),
      del          = require('del'),
      cache        = require('gulp-cache'),
      replace      = require('gulp-replace'),
      rename       = require("gulp-rename"),
      cheerio      = require('gulp-cheerio'),
      concat       = require('gulp-concat'),

      //html
      htmlmin      = require('gulp-htmlmin'),
      
      //css
      sass         = require('gulp-sass'),
      cleancss     = require('gulp-clean-css'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      
      //js
      uglify       = require('gulp-uglify-es').default,
      babel        = require('gulp-babel'),
      
      //svg
      svgSprite    = require('gulp-svgsprite'),
      svgmin       = require('gulp-svgmin'),

      //img
      newer        = require('gulp-newer'),
      imagemin     = require('gulp-imagemin');

const browsersync = () => {
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    })
}
exports.browsersync = browsersync;

const bsReload = (done) => {
    browserSync.reload(); 
    done();
}


const svg = () => {
	return src(['app/img/svg/*.svg', '!app/img/svg/logo.svg'])
	.pipe(svgmin({js2svg: {pretty: true}, plugins: [{removeViewBox: false}]}))
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: {
			xmlMode: true
		}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite())
	.pipe(rename({
		basename: 'sprite',
		extname: '.svg'
	}))
	.pipe(dest('app/img/svg/sprite'));
}
exports.svg = svg;


const styles = () => {
    return src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) 
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream()) 
}
exports.styles = styles;


const scripts = () => {
    return src('app/js/script.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream()) 
}
exports.scripts = scripts;



const jslibs = () => {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
        'node_modules/vanilla-lazyload/dist/lazyload.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/object-fit-images/dist/ofi.js',
        'node_modules/@cmyee/pushy/js/pushy.min.js',
		'node_modules/jquery-pjax/jquery.pjax.js',
		'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/Modernizr/modernizr-custom.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'));
}
exports.jslibs = jslibs;


const clear = () => {
    return cache.clearAll();
}
exports.clear = clear;


function images() {
    return src(['app/img/**/*', '!app/img/svg/**/*']) 
    .pipe(newer('app/img/**/*')) 
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 60, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
    ])) 
    .pipe(dest('dist/img')) 
}
exports.images = images;

const cleanImg = () => {
    return del(['dist/img/**/*'], { force: true })
}
exports.cleanimg = cleanImg;


const htmlMin = () => {
	return src('app/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(dest('dist'))
}
exports.htmlMin = htmlMin;


const buildcopy = () => {
	return src([ 
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
        'app/img/svg/**/*',
        'app/fonts/**/*',
		'app/*.php',
        'app/.htaccess',
        'app/*.{png,xml,ico,webmanifest,svg}'
		], { base: 'app' }) 
	.pipe(dest('dist')) 
}


const cleandist = () => {
	return del('dist/**/*', { force: true }) 
}


const startwatch = () => {
    watch(['app/scss/**/*.scss','app/blocks/**/*'], styles);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch(['app/js/script.js', 'app/js/libs.min.js', '!app/**/*.min.js'], scripts);
}

exports.default = parallel(styles, scripts, jslibs, browsersync, startwatch);
exports.build = series(cleandist, styles, scripts, htmlMin, buildcopy);
