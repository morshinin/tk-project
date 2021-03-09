const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const server = browserSync.create();

const paths = {
    styles: {
        src: './dist/sass/*.scss',
        dest: './public/css/'
    }
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest))
}

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './public'
        }
    });
    done();
}

const watch = () => gulp.watch(paths.styles.src, gulp.series(styles, reload));

const dev = gulp.series(styles, serve, watch);
gulp.task('default', dev);
