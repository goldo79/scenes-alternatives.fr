var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

function buildPages() {
  // Copy all assets files
  gulp
    .src(['public/**'])
    .pipe(gulp.dest('dist/'))

  // Load artists dataset
  var artists = require('./summertek2-artists.json')

  // Build index page
  return gulp
    .src(['templates/*.html.twig', '!templates/base.html.twig'])
    .pipe($.twig({ data: { artists } }))
    .pipe($.rename('index.html'))
    .pipe(gulp.dest('dist/'))
}

gulp.task('clean', gulp.series(() => 
  gulp
    .src('dist/*')
    .pipe($.cleanDir('./dist'))
))

gulp.task('default', gulp.series(['clean'], buildPages))

gulp.task('watch', gulp.series(['default'], () => 
    $.watch(['templates', 'public', 'summertek2-artists.json'], buildPages)
))
