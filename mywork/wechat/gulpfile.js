'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
    

gulp.task('default',function(){
	console.log("ok go");
});


gulp.task('imagemin',function(){
	gulp.src('fq/**/*',{base : 'fq'})
		.pipe(imagemin({
			progressive : true
		}))
		.pipe(gulp.dest('img/'))
})
