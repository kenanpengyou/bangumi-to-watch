var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload      = browserSync.reload;
var browserify = require("browserify");
var buffer = require('vinyl-buffer');
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var filter      = require('gulp-filter');
var autoprefixer = require('autoprefixer-core');
var postcssSimpleVars = require("postcss-simple-vars");
var postcssMixins = require("postcss-mixins");
var postcssNested = require("postcss-nested");
var postcssImport = require("postcss-import");
var colorFunction = require("postcss-color-function");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');

// Css process.
gulp.task("postcss", function(){
    var processors = [
        postcssImport,
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        colorFunction(),
        autoprefixer({
            browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"]
        })];

    return gulp.src(["./stylesheets/src/*.css", "!./stylesheets/src/fontello.css"])
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./stylesheets/dest"))
        .pipe(filter("*.css"))
        .pipe(reload({stream: true}));
});

// Javascript process.
gulp.task("browserify", function() {
    var b = browserify({
        entries: "./javascripts/src/bangumi.js",
        debug: true
    }),
        uglifyConfig = {
        mangle: false,
        compress: false,
        preserveComments: "all"
    };

    return b.bundle()
        .pipe(source("bangumi.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify(uglifyConfig))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./javascripts/dest"));
});

gulp.task("reload-js", ["browserify"], function(){
    //reload();
});

// Auto refresh.
gulp.task("browser-sync", ["postcss", "browserify"], function() {
    browserSync.init({
        port: "5000",
        server: {
            baseDir: "./"
        },
        notify: true,
        ghostMode: false
    });

    gulp.watch("./javascripts/src/**/*.js", ["reload-js"]);
    gulp.watch("./stylesheets/src/*.css", ["postcss"]);
    gulp.watch("./index.html", reload);
});

gulp.task("dev", ["browser-sync"]);
gulp.task("default", ["dev"]);
