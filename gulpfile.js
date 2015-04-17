var gulp = require("gulp");
var browserSync = require("browser-sync");
var browserify = require("browserify");
var source = require('vinyl-source-stream');


gulp.task("browserify", function() {
    return browserify("./app.js")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./"));
});


gulp.task("browser-sync", function() {
    browserSync({
        files: ["**"],
        exclude: ["./idea/**"],
        port: "5000",
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("default", ["browser-sync"]);