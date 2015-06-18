var gulp = require("gulp");
var del = require('del');
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
var csswring = require("csswring");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');

// Environment setup.
var env = {
    production: false
};

// Environment task.
gulp.task("set-production", function(){
    env.production = true;
});

// Clean.
gulp.task("clean", function(){
    del([
        './stylesheets/dest',
        './javascripts/dest'
    ]);
});

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

    if(env.production){
        processors.push(csswring());
        return gulp.src(["./stylesheets/src/*.css", "!./stylesheets/src/fontello.css"])
            .pipe(postcss(processors))
            .pipe(gulp.dest("./stylesheets/dest"));

    }else{

        return gulp.src(["./stylesheets/src/*.css", "!./stylesheets/src/fontello.css"])
            .pipe(sourcemaps.init())
            .pipe(postcss(processors))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("./stylesheets/dest"))
            .pipe(filter("*.css"))
            .pipe(reload({stream: true}));
    }
});

// Javascript process.
gulp.task("browserify", function() {
    var b = browserify({
        entries: "./javascripts/src/bangumi.js",
        debug: !env.production
    });

    if(env.production){
        return b.bundle()
            .pipe(source("bangumi.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("./javascripts/dest"));
    }else{
        return b.bundle()
            .pipe(source("bangumi.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("./javascripts/dest"));
    }
});

gulp.task("reload-js", ["browserify"], function(){
    // Indeed, reload each time javascript files changed is not so graceful.
    // reload();
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
gulp.task("release", ["set-production", "clean", "postcss", "browserify"]);
gulp.task("default", ["dev"]);
