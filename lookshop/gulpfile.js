const gulp         = require('gulp'),
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
      responsive   = require('gulp-responsive'),
      resizer      = require('gulp-images-resizer');


      gulp.task('resize', function() {
        return gulp.src('app/img/*')
        .pipe(resizer({
                // format: "png",
                width: "200%",
                quality: 90
            }))
        .pipe(gulp.dest('app/img/_source'));
    });
    

      
// Local Server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	});
});
function bsReload(done) { browserSync.reload(); done(); }


// Creating, minif svg spite
gulp.task('svg', function () {
    return gulp.src('app/images/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{removeViewBox: false}]
        }))
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
        .pipe(gulp.dest('app/images/svg/sprite'));
});


//Sass
gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
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
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


//Css libs
// gulp.task('css-libs', function(){
//     return gulp.src([
//       'node_modules/normalize.css/normalize.css',
//     //   'node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
//     // 'node_modules/bootstrap/scss/bootstrap.scss',
//       'node_modules/slick-carousel/slick/slick.css',
//       'node_modules/animate.css/animate.min.css'
//     ])
//       .pipe(sourcemaps.init())
//       .pipe(sass({
//         outputStyle: 'compressed'
//     }).on('error', sass.logError))
//       .pipe(concat('libs.min.css'))
//       .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
//       .pipe(sourcemaps.write('.'))
//       .pipe(gulp.dest('app/css'))
//       .pipe(browserSync.reload({stream: true}));
//   });


// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});


//JS custom
gulp.task('scripts', function () {
    return gulp.src('app/js/script.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/js/'))
        .pipe(browserSync.reload({stream: true}));
});

//JS Libs
gulp.task('jslibs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
        'node_modules/vanilla-lazyload/dist/lazyload.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/selectize/dist/js/standalone/selectize.js',
        'node_modules/object-fit-images/dist/ofi.js',
        //'node_modules/@cmyee/pushy/js/pushy.min.js',
        //'node_modules/cleave.js/dist/cleave.min.js',
        //'node_modules/cleave.js/dist/addons/cleave-phone.ru.js',
        'app/js/modernizr-custom.js',
        //'node_modules/wowjs/dist/wow.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});


gulp.task('clear', function (callback) {
    return cache.clearAll();
});


// Responsive Images
var quality = 80; // Responsive images quality

// Produce @1x images
gulp.task('img-responsive-1x', async function() {
	return gulp.src('app/images/_source/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/images/@1x'))
		.pipe(responsive({
			'**/*': { width: '50%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('app/images/@1x'))
});
// Produce @2x images
gulp.task('img-responsive-2x', async function() {
	return gulp.src('app/images/_source/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/images/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('app/images/@2x'))
});
gulp.task('img', gulp.series('img-responsive-1x', 'img-responsive-2x', bsReload));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['app/images/@*'], { force: true })
});



//Export to dist folder
gulp.task('export', async function() {
    let buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'));

    let buildFonts = gulp.src('app/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'));

    let buildFiles = gulp.src(['app/.htaccess', 'app/mail.php', 'app/*.{png,xml,ico,webmanifest,svg}'])
    .pipe(gulp.dest('dist'));

    let buildJs = gulp.src(['app/js/**/*','!app/js/script.js']) 
    .pipe(gulp.dest('dist/js'));

    let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
    
    let buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function(done){
    del.sync('dist');
    done();
});

gulp.task('watch', function (done) {
    gulp.watch(['app/scss/**/*.scss','app/blocks/**/*'], gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch(['app/js/script.js', 'app/js/libs.min.js'], gulp.parallel('scripts'));
});

gulp.task('build', gulp.series('clean', 'export'));
gulp.task('default', gulp.parallel('sass', 'scripts', 'jslibs','browser-sync', 'watch'));


// Deploy
gulp.task('rsync', function() {
	return gulp.src('app/')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});



var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'app/logos.svg',
		dest: 'app',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#000000',
				margin: '28%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#603cba',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'app/index.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('app'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});