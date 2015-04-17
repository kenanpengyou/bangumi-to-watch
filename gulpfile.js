/**
 * This example:
 *  Shows how to plug in the details of your server.
 *  Watches & injects CSS files
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
// var sass = require('gulp-sass');

// gulp.task('sass', function() {
//     return gulp.src("./sass/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("./css"));
// });

gulp.task('browser-sync', function() {
    browserSync({
        files: ["**"],
        exclude: ["./idea/**"],
        port: "5000",
        server: {
            baseDir: "./"
        }
    });
});

// Default task to be run with `gulp`
gulp.task('default', ["browser-sync"]);