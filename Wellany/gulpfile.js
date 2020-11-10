const { src, dest, parallel, series, watch } = require('gulp');
      browserSync  = require('browser-sync'),
      rsync        = require('gulp-rsync'),
      del          = require('del'),
      cache        = require('gulp-cache'),
      replace      = require('gulp-replace'),
      rename       = require("gulp-rename"),
      cheerio      = require('gulp-cheerio'),
      concat       = require('gulp-concat'),
      
      //Woff2 font
      ttf2woff2    = require('gulp-ttf2woff2'),

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
      responsive   = require('gulp-responsive');
    

const changeFontFormat = () => {
    return src('app/fonts/main/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts/main'));
}
exports.changeFontFormat = changeFontFormat;
      
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
	return src('app/img/svg/*.svg')
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
        'node_modules/@cmyee/pushy/js/pushy.min.js',
        'node_modules/cleave.js/dist/cleave.min.js',
        'node_modules/cleave.js/dist/addons/cleave-phone.ru.js',
        'app/js/modernizr-custom.js',
        //'node_modules/wowjs/dist/wow.min.js',
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



const quality = 80;

const imgresponsive1x = async () => {
    return src('app/img/_source/**/*.{png,jpg,jpeg,webp,raw}')
        .pipe(newer('app/img/@1x'))
        .pipe(responsive({
            '**/*': { width: '50%', quality: quality }
        })).on('error', function (e) { console.log(e) })
        .pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
        .pipe(dest('app/img/@1x'))
}
exports.imgresponsive1x = imgresponsive1x;

const imgresponsive2x = async () => {
    return src('app/img/_source/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(dest('app/img/@2x'))
}
exports.imgresponsive2x = imgresponsive2x;
exports.images = series(imgresponsive1x, imgresponsive2x, bsReload)


const cleanImg = () => {
    return del(['app/img/@*'], { force: true })
}
exports.cleanimg = cleanImg;


const buildcopy = () => {
	return src([ 
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
        'app/img/**/*',
        'app/fonts/**/*',
		'app/**/*.html',
		'app/*.php',
        'app/.htaccess',
        'app/*.{png,xml,ico,webmanifest,svg}'
		], { base: 'app' }) 
	.pipe(dest('dist')) 
}


const cleandist = () => {
	return del('dist/**/*', { force: true }) 
}
exports.cleandist = cleandist;

const startwatch = () => {
    watch(['app/scss/**/*.scss','app/blocks/**/*'], styles);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch(['app/js/script.js', 'app/js/libs.min.js', '!app/**/*.min.js'], scripts);
}

exports.default = parallel(styles, scripts, jslibs, browsersync, startwatch);
exports.build = series(cleandist, styles, scripts, buildcopy);