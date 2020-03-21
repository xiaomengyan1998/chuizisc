/*
第三方插件
gulp-scss
gulp-minify-css
gulp-rename
*/
//把sass文件=>css文件=>压缩=>min.css

const gulp = require("gulp");
const minifyCss= require("gulp-minify-css");
const  scss = require("gulp-sass");
const rename = require("gulp-rename");

//index.scss=>index.css=>index.min.css
gulp.task("scss",function(){
    return gulp.src("stylesheet/index.scss") 
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

 //处理list.scss
 gulp.task("listscss",function(){
    return gulp.src("stylesheet/list.scss") 
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("list.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

//批量处理
gulp.task("scssAll",function(){
    return gulp.src("stylesheet/*.{scss,sass}")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

//阿里图标库
gulp.task("icon",function(){
    return gulp.src("iconfont/**/*")
    .pipe(gulp.dest("dist/iconfont"))
    .pipe(connect.reload())
})

//处理js
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

//处理php
gulp.task("phps",function(){
    return gulp.src("*.php" )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

//处理.html
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())

})
//处理数据json
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})
//处理图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})
//一次进行多个任务
gulp.task("build",["copy-html","images","data","scssAll","scss","scripts","icon" ,"listscss","phps" ],function(){
    console.log("建立成功");
})


//编写监听
gulp.task("watch",function(){
     gulp.watch("*.html",["copy-html"]);
     gulp.watch("images/**/*",["images"]);
     gulp.watch(["*.json","!package.json"],["data"]);
     gulp.watch("stylesheet/index.scss",["scss"]);
     gulp.watch("stylesheet/*.{scss,sass}",["scssAll"]);
     gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("stylesheet/list.scss",["listscss"])
     gulp.watch("iconfont/**/*",["icon"])
     gulp.watch("*.php",["phps"]);

})
//建立服务器
const connect = require("gulp-connect");
gulp.task("server",function(){
     connect.server({
         root:"dist",//指定服务器的根目录
         port:8886,//locahost  8886
         livereload:true//启动实时监测
     })
})
 
//同时执行watch server 默认设置，执行gulp
gulp.task("default",["server","watch"]);