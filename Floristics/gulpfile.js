const { src, dest, parallel, series, watch } = require('gulp'),
      browserSync  = require('browser-sync'),
      del          = require('del'),
      cache        = require('gulp-cache'),
      replace      = require('gulp-replace'),
      rename       = require("gulp-rename"),
      cheerio      = require('gulp-cheerio'),
      concat       = require('gulp-concat'),
      
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
      resizer      = require('gulp-images-resizer'),
      imagemin     = require('gulp-imagemin')



const resize = () => {
    return src('app/img/*.jpg')
        .pipe(resizer({
                // format: "png",
                width: 88,
                height: 75,
                quality: 90
            }))
        .pipe(dest('app/img/thumb'));
}
exports.resize = resize;
   

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
	return src('app/images/svg/*.svg')
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
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
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
        // 'node_modules/jquery/dist/jquery.min.js',
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
        'node_modules/@babel/polyfill/dist/polyfill.min.js',
        'node_modules/object-fit-images/dist/ofi.js',
        'node_modules/tiny-slider/dist/tiny-slider.js',
        'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
        // 'node_modules/vanilla-lazyload/dist/lazyload.min.js',
        // 'node_modules/slick-carousel/slick/slick.min.js',
        // 'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
        // 'node_modules/@cmyee/pushy/js/pushy.min.js',
        // 'node_modules/cleave.js/dist/cleave.min.js',
        // 'node_modules/cleave.js/dist/addons/cleave-phone.ru.js',
        'app/js/modernizr-custom.js',
        // 'node_modules/wowjs/dist/wow.min.js',
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
    return src('app/images/**/*') 
    .pipe(newer('app/images/**/*')) 
    .pipe(imagemin()) 
    .pipe(dest('dist/images')) 
}
exports.images = images;

const cleanImg = () => {
    return del(['dist/images/**/*'], { force: true })
}
exports.cleanimg = cleanImg;



const buildcopy = () => {
	return src([ 
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
        'app/fonts/**/*',
		'app/**/*.html',
		'app/*.php',
        'app/.htaccess',
        'app/*.{png,xml,ico,webmanifest,svg}'
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
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
exports.build = series(cleandist, styles, scripts, images, buildcopy);
