var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprites');
var filter = require('gulp-filter');
var svg2png = require('gulp-svg2png');

gulp.task('svg-sprite', function () {
    return gulp.src('img/svg/svg/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest('img/svg/sprite'))
        .pipe(filter('**/*.svg'))
        .pipe(svg2png())
        .pipe(gulp.dest('img/svg/sprite'));
});
gulp.task('svg-symbols', function () {
    return gulp.src('img/svg/svg/*.svg')
        .pipe(svgSprite({
            svg: {
                sprite: 'sprite.svg'
            },
            preview: {
                sprite: 'index.html'
            },
            mode: 'symbols'
        }))
        .pipe(gulp.dest('img/svg/symbols'));
});

gulp.task('default', ['svg-sprite', 'svg-symbols']);