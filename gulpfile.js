var gulp = require('gulp');
var exec = require('gulp-exec');
var webserver = require('gulp-webserver');
var del = require('del');

var input_md = 'index.p.md';
var output_github = 'index_github.md';
var output_html = 'index.html';
var output_pdf = 'index.pdf';
var beamer_header = 'pandoc-beamer-header.tex';

gulp.task('pandoc', function() {
  gulp.src('./' + input_md)
    .pipe(exec(`pandoc ${input_md} -s -f markdown -t markdown_github -o ${output_github}`))
    .pipe(exec(`pandoc ${input_md} -s -f markdown -t revealjs -o ${output_html}`));
});

gulp.task('beamer', function() {
  gulp.src('./' + input_md)
    .pipe(exec(`pandoc ${input_md} -t beamer --latex-engine=lualatex -o ${output_pdf} -V theme:Singapore -H ${beamer_header}`));
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

gulp.task('clean', function(cb) {
  var files = [output_github, output_html];
  del(files, cb);
});

gulp.task('default', ['pandoc', 'watch', 'webserver']);
