var gulp       = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cache        = require('gulp-cache');

gulp.task('sass', function(){
    return gulp.src('dist/sass/index.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('css', function() {
    return gulp.src('dist/cssLibs/**/*.css')
    .pipe(concat('libs.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('app/css'))
});

gulp.task('scripts', function() {
    return gulp.src([
            'dist/js/jquery.js',
            'dist/js/mask.js',
            'dist/js/particles.js',
            'dist/js/index.js'
        ])
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('dist/sass/**/*.sass', ['sass']);
    gulp.watch('dist/sass/**/*.sass', browserSync.reload);

    gulp.watch('dist/js/**/*.js', ['scripts']);
    gulp.watch('dist/js/**/*.js', browserSync.reload);

    gulp.watch('dist/cssLibs/**/*.css', ['css']);
    gulp.watch('dist/cssLibs/**/*.css', browserSync.reload);

    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['sass', 'scripts', 'css', 'clear', 'watch']);