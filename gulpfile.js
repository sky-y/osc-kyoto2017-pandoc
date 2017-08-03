var gulp = require('gulp');
var exec = require('gulp-exec');
var webserver = require('gulp-webserver');

var input_md = 'index.p.md';
var output_github = 'index_github.md';
var output_html = 'index.html';

gulp.task('pandoc', function() {
  gulp.src('./' + input_md)
    .pipe(exec(`pandoc ${input_md} -s -f markdown -t markdown_github -o ${output_github}`))
    .pipe(exec(`pandoc ${input_md} -s -f markdown -t revealjs -o ${output_html}`));
});

gulp.task('watch', function() {
  gulp.watch('./' + input_md, ['pandoc']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: 8000,
      open: true
    }));
});

gulp.task('default', ['watch', 'webserver']);
