// 引入模块
let gulp = require("gulp");
// let concat = require("gulp-concat");
let connect = require("gulp-connect");
let cssmin = require("gulp-cssmin");
let imagemin = require("gulp-imagemin");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");

// 页面引入
gulp.task("htmldoc",()=>{
	return gulp.src(["src/doc/**/*.html"])
				.pipe(gulp.dest("dist"))
				.pipe(connect.reload());
})


// sass 编译
gulp.task("sass",()=>{
	return gulp.src(["src/sass/index.scss","src/sass/register.scss","src/sass/login.scss","src/sass/goodslist.scss","src/sass/details.scss","src/sass/cartlist.scss"])
				.pipe(sass().on("erroe",sass.logError))
				.pipe(gulp.dest("dist/css"))
				.pipe(connect.reload());
})
// 压缩css
gulp.task("mincss",()=>{
	return gulp.src(["dist/css/*.css","!dist/css/*.min.css"])
				.pipe(cssmin())
				.pipe(rename({suffix:".min"}))
				.pipe(gulp.dest("dist/css"));
})


// js编译
gulp.task("script",()=>{
	return gulp.src("./src/module/**/*.js")
				.pipe(gulp.dest("dist"))
				.pipe(connect.reload());
})
// 压缩js
gulp.task("minjs",()=>{
	return gulp.src(["dist/js/*.js","!dist/js/*.min.js"])
				.pipe(uglify())
				.pipe(rename({suffix:".min"}))
				.pipe(gulp.dest("dist/js"));
})

// 图片压缩
gulp.task("minimg",()=>{
	return gulp.src("src/images/*")
				.pipe(imagemin())
				.pipe(gulp.dest("dist/images"))
				.pipe(connect.reload());
})
//监听
gulp.task("watch",()=>{
	gulp.watch("src/sass/*.scss",["sass","mincss"]);
	gulp.watch("src/module/**/*.js",["script","mincss"]);
	gulp.watch("src/images/*.(jpg|png|gif)",["minimg"]);
	gulp.watch(["src/doc/**/*.html"],["htmldoc"]);
})
// 服务器
gulp.task("serve",()=>{
	connect.server({
		root:'dist',
		port:8888,
		livereload:true
	})
})
// 默认任务
gulp.task("default",["watch","serve"])