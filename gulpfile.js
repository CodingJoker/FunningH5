var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
// 静态服务器
var options = {
    fe:{
        src:'FE'
    }
}
gulp.task('server',['sass'], function() {
    browserSync.init({
        server: {
            baseDir:options.fe.src,
        },
        ui: {
            port: 8080
        },
        open: "external",
        startPath:"/tpls/share_bad_friends.html"
    });
    gulp.watch([options.fe.src + "/tpls/*.html"]).on('change',browserSync.reload);
    gulp.watch([options.fe.src + "/js/*.js",options.fe.src + "/third_party/**" ,options.fe.src + "/img/**"]).on('change',browserSync.reload);
    gulp.watch(options.fe.src + "/scss/*.scss",['sass']);
});
gulp.task('sass', function() {
    return gulp.src(options.fe.src + "/scss/*.scss")
        .pipe(sass())
        .on('error', function(err) {
         console.log('Sass Error!', err.message);
         this.emit('end');
        })
        .pipe(gulp.dest(options.fe.src + "/css"))
        .pipe(browserSync.reload({stream: true}));
});

