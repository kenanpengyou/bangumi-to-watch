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
        })];

    return gulp.src(["./stylesheets/src/*.css**", "!./stylesheets/src/fontello.css"])
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./stylesheets/dest"))
        .pipe(filter("*.css"))
        .pipe(reload({stream: true}))
});

// Javascript process.
gulp.task("browserify", function() {
    var uglifyConfig = {
        mangle: false,
        compress: false,
        preserveComments: "all"
    };

    return browserify("./javascripts/src/bangumi.js")
        .bundle()
        .pipe(source("bangumi.js"))
        .pipe(buffer())
        .pipe(uglify(uglifyConfig))
        .pipe(gulp.dest("./javascripts/dest"));
});

gulp.task("reload-js", ["browserify"], reload);

// Auto refresh.
gulp.task("browser-sync", ["postcss", "browserify"], function() {
    browserSync.init({
        port: "5000",
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./javascripts/src/*.js", ["reload-js"]);
    gulp.watch("./stylesheets/src/*.css", ["postcss"]);
    gulp.watch("./index.html", reload);
});

gulp.task("dev", ["browser-sync"]);
gulp.task("default", ["dev"]);