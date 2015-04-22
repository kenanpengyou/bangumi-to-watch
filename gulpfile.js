var gulp = require("gulp");
var debug = require('gulp-debug');
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();
var browserify = require("browserify");
var postcss = require("gulp-postcss");
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
        })
        ],
    renameConfig = {
        suffix: "_transformed"
    };

    return gulp.src("./css/*.css")
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(rename(renameConfig))
        .pipe(gulp.dest("./css"));
});

// Javascript process.
gulp.task("browserify", function() {
    return browserify("./bangumi.js")
        .bundle()
        .pipe(source("bangumi_bundle.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("js-watch", ["browserify"], browserSync.reload);


// Auto refresh.
gulp.task("browser-sync", function() {
    browserSync({
        port: "5000",
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./javascript/*.js", ["js-watch"]);

});

gulp.task("dev", ["browser-sync"]);