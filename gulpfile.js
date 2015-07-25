var gulp = require('gulp');
var svgSprite = require("gulp-svg-sprites");
var filter = require('gulp-filter');
var svg2png = require('gulp-svg2png');

gulp.task('svg-backgrounds', function () {
    return gulp.src('svg/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest("dist/backgrounds")) // Write the sprite-sheet + CSS + Preview
        .pipe(filter("svg/*.svg"))  // Filter out everything except the SVG file
        .pipe(svg2png())           // Create a PNG
        .pipe(gulp.dest("dist/backgrounds"));
});
gulp.task('svg-symbols', function () {
    return gulp.src('svg/*.svg')
        .pipe(svgSprite({
            svg: {
                sprite: "sprite.svg"
            },
            preview: {
                sprite: "index.html"
            },
            mode: "symbols"
        }))
        .pipe(gulp.dest("dist/symbols"));
});

gulp.task('default', ['svg-backgrounds', 'svg-symbols']);
