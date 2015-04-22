var gulp = require("gulp");
var debug = require('gulp-debug');
var browserSync = require("browser-sync").create();
var reload      = browserSync.reload;
var browserify = require("browserify");
var postcss = require("gulp-postcss");
var filter      = require('gulp-filter');
var autoprefixer = require('autoprefixer-core');
var postcssSimpleVars = require("postcss-simple-vars");
var postcssMixins = require("postcss-mixins");
var postcssNested = require("postcss-nested");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');

// Css process.
gulp.task("postcss", function(){
    var processors = [
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        autoprefixer({
            browsers: ["last 2 versions"]
        })]

    return gulp.src("./stylesheets/src/*.css")
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./stylesheets/dest"))
        .pipe(filter("*.css"))
        .pipe(reload({stream: true}))
});

// Javascript process.
gulp.task("browserify", function() {
    return browserify("./javascripts/src/bangumi.js")
        .bundle()
        .pipe(source("bangumi_bundle.js"))
        .pipe(gulp.dest("./javascripts/dest"));
});

gulp.task("js-watch", ["browserify"], browserSync.reload);

// Auto refresh.
gulp.task("browser-sync", ["js-watch"], function() {
    browserSync({
        port: "5000",
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./javascript/*.js", ["js-watch"]);
    gulp.watch("./css/*.css", ["postcss"]);
});

gulp.task("dev", ["browser-sync"]);