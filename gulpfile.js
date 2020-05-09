// 引入gulp模块（本地安装的gulp），这个模块的代码就在 node_modules文件夹下
let g = require("gulp");
//压缩html
let htmlmin = require("gulp-htmlmin");
//压缩css
let cssmin = require("gulp-clean-css");
//压缩JS
let uglify = require("gulp-uglify");
//合并文件
let concat = require("gulp-concat");
//搭建服务器
let connect = require("gulp-connect");
//sass
let sass = require("gulp-sass");

g.task("watch-all",async ()=>{
    g.watch(["./www/**/*","!./www/*.scss"], async () => {
        g.src(["./www/**/*", "!./www/*.scss"])
        .pipe(g.dest("./dist/"));
    });

    g.watch("./www/*.html", async () => {
        g.src("./www/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            // removeComments: true,
            // collapseBooleanAttributes: true, 
            // ​removeEmptyAttributes: true,
            // ​removeScriptTypeAttributes: true,
            // ​removeStyleLinkTypeAttributes: true,
            // ​minifyJS: true, 
            // ​minifyCSS: true
        }))
        .pipe(g.dest("./dist/"));
    });
    //压缩CSS
    g.watch("./www/css/*.css", async () => {
        g.src("./www/css/*.css")
        .pipe(cssmin())
        .pipe(g.dest("./dist/css"));
    });
    //压缩JS
    g.watch("./www/js/*.js", async () => {
        g.src("./www/js/*.js")
            .pipe(uglify())
            .pipe(g.dest("./dist/js"));
    });
});

g.task('sassgo', function () {
    g.watch("./www/*.scss", async () => {
        g.src("./www/*.scss")
        .pipe(sass())
        .pipe(g.dest("./dist/css"));
    });
});


g.task('server', function () {
    connect.server({
        root: './dist',
        livereload: true
    });
});

