/**
* Configuration.
*
* Project Configuration for gulp tasks.
*
* Edit the variables as per your project requirements.
*/

var project             = 'bhs-theme'; // Name

var styleSRC            = './assets/src/scss/style.scss'; // Path to main .scss file
var styleDestination    = './'; // Path to place the compiled CSS file
// Default set to root folder
var vendorStyleSRC = ['./node_modules/font-awesome/css/font-awesome.min.css', './node_modules/bootstrap/dist/css/bs4-bootstrap.min.css' ];
var vendorStyleDestination = './assets/dest/css/';
var jsVendorSRC         = ['./node_modules/tether/dist/js/tether.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', '/js/ie10-viewport-bug-workaround.js', '/js/scripts.js']; // Path to JS vendor files
var jsVendorDestination = './assets/dest/js/vendors/'; // Path to place the compiled JS vendors file
var jsVendorFile        = 'vendors'; // Compiled JS vendors file name
// Default set to vendors i.e. vendors.js


var jsCustomSRC         = './assets/src/js/custom/*.js'; // Path to JS custom scripts folder
var jsCustomDestination = './assets/dest/js/'; // Path to place the compiled JS custom scripts file
var jsCustomFile        = 'custom'; // Compiled JS custom file name
// Default set to custom i.e. custom.js

// images
var styleWatchFiles     = './assets/src/scss/**/*.scss'; // Path to all *.scss files inside css folder and inside them
//var vendorJSWatchFiles  = './assets/js/vendors/*.js'; // Path to all vendors JS files
var customJSWatchFiles  = './assets/src/js/custom/*.js'; // Path to all custom JS files

/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp         = require('gulp'), // Gulp of-course
    browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
    reload       = browserSync.reload,

    // CSS related plugins.
    sass         = require('gulp-sass'), // Gulp pluign for Sass compilation
    autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
    concatCss    = require('gulp-concat-css'), // concat css
    minifycss    = require('gulp-uglifycss'), // Minifies CSS files
    filter       = require('gulp-filter'), // Enables you to work on a subset of the original files by filtering them using globbing
    cmq          = require('gulp-combine-media-queries'),

    // JS related plugins.
    concat       = require('gulp-concat'), // Concatenates JS files
    uglify       = require('gulp-uglify'), // Minifies JS files

    // Utility related plugins.
    rimraf       = require('gulp-rimraf'), // Helps with removing files and directories in our run tasks
    imagemin     = require('gulp-imagemin'), // Minifies PNG, JPEG, GIF and SVG images
    newer        = require('gulp-newer'), // For passing through only those source files that are newer than corresponding destination files
    plumber      = require('gulp-plumber'), // Fix node pipes, prevent them from breaking due to an error
    rename       = require('gulp-rename'), // Renames files E.g. style.css -> style.min.css
    sourcemaps   = require('gulp-sourcemaps'), // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
    cache        = require('gulp-cache'),

    notify       = require('gulp-notify'); // Sends message notification to you

/**
 * Browser Sync
 *
 * Asynchronous browser syncing of assets across multiple devices!! Watches for changes to js, image and php files
 * Although, I think this is redundant, since we have a watch task that does this already.
*/
gulp.task('browser-sync', function() {
    var files = [
            '**/*.php',
            '**/*.{png,jpg,gif}'
            ];
    browserSync.init(files, {

        // Read here http://www.browsersync.io/docs/options/

        proxy: 'http://localhost/test_wp/',


        port: 8080,

        // Tunnel the Browsersync server through a random Public URL
        // tunnel: true,

        // Attempt to use the URL "http://my-private-site.localtunnel.me"
        // tunnel: "ppress",

        // Inject CSS changes
        injectChanges: true

    });
});

/**
 * Images
 *
 * Look at src/images, optimize the images and send them to the appropriate place
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
    return  gulp.src(['./assets/src/img/**/*.{png,jpg,gif}'])
                .pipe(imagemin({ progressive: true }))
                .pipe(gulp.dest('./assets/dest/img/'))
                .pipe( notify( { message: 'Images task complete', onLast: true } ) );
});

/**
 * Task: styles
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *      1. Gets the source scss file
 *      2. Compiles Sass to CSS
 *      3. Writes Sourcemaps for it
 *      4. Autoprefixes it and generates style.css
 *      5. Renames the CSS file with suffix .min.css
 *      6. Minifies the CSS file and generates style.min.css
 */
gulp.task('styles', function () {
    gulp.src( styleSRC )
        .pipe(plumber())
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            errLogToConsole: true,
            outputStyle: 'compact',
            //outputStyle: 'compressed',
            // outputStyle: 'nested',
            // outputStyle: 'expanded',
            precision: 10
        }))
        .pipe( sourcemaps.write( { includeContent: false } ) )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( autoprefixer(
            'last 2 version',
            '> 1%',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4' ) )
        .pipe(plumber.stop())

        //.pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss( {
            maxLineLen: 10
        }))
        .pipe( sourcemaps.write ( styleDestination ) )
        .pipe( gulp.dest( styleDestination ) )
        .pipe(browserSync.stream())
        .pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});

gulp.task('vendorCss', function () {
    gulp.src( vendorStyleSRC )
        .pipe( sass( {
            errLogToConsole: true,
            outputStyle: 'compact',
            //outputStyle: 'compressed',
            // outputStyle: 'nested',
            // outputStyle: 'expanded',
            precision: 10
        } ) )
        .pipe(concatCss("bundle.css"))

        .pipe( rename( { suffix: '.min' } ) )
        .pipe( minifycss( {
            maxLineLen: 10
        }))
        .pipe( gulp.dest( vendorStyleDestination ) )
        .pipe(reload({stream:true})) // Inject Styles when style file is created
        .pipe( notify( { message: 'TASK: "vendor styles" Completed!', onLast: true } ) )
});

/**
 * Task: vendorJS
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 *      1. Gets the source folder for JS vendor files
 *      2. Concatenates all the files and generates vendors.js
 *      3. Renames the JS file with suffix .min.js
 *      4. Uglifes/Minifies the JS file and generates vendors.min.js
 */
gulp.task( 'vendorsJs', function() {
    gulp.src( jsVendorSRC )
        .pipe( concat( jsVendorFile + '.js' ) )
        .pipe( gulp.dest( jsVendorDestination ) )
        .pipe( rename( {
            basename: jsVendorFile,
            suffix: '.min'
        }))
        .pipe( uglify() )
        .pipe( gulp.dest( jsVendorDestination ) )
        .pipe( notify( { message: 'TASK: "vendorsJs" Completed!', onLast: true } ) );
});

/**
 * Task: customJS
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *      1. Gets the source folder for JS custom files
 *      2. Concatenates all the files and generates custom.js
 *      3. Renames the JS file with suffix .min.js
 *      4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task( 'customJS', function() {
    gulp.src( jsCustomSRC )
        .pipe( concat( jsCustomFile + '.js' ) )
        .pipe( gulp.dest( jsCustomDestination ) )
        .pipe( rename( {
            basename: jsCustomFile,
            suffix: '.min'
        }))
        .pipe( uglify() )
        .pipe( gulp.dest( jsCustomDestination ) )
        .pipe( notify( { message: 'TASK: "customJs" Completed!', onLast: true } ) );
});

/**
 * Clean gulp cache
 */
 gulp.task('clear', function () {
   cache.clearAll();
 });

/**
  * Watch Tasks.
  *
  * Watches for file changes and runs specific tasks.
  */

 gulp.task( 'default', [ 'styles', 'vendorCss', 'vendorsJs', 'customJS', 'images', 'browser-sync' ], function () {
    gulp.watch( './assets/src/img/**/*', ['images'] );
    gulp.watch( './assets/src/scss/**/*.scss', [ 'styles' ] );
    gulp.watch( './assets/src/js/vendors/*.js', [ 'vendorsJs' ] );
    gulp.watch( './assets/src/js/custom/*.js', [ 'customJS', browserSync.reload ] );
 });
