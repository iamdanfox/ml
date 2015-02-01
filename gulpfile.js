var gulp = require('gulp'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs');


gulp.task('jscs', function() {
  return gulp.src('scripts/*.jsx')
    .pipe(react({
      stripTypes: true
    })) // strips types, doesn't transpile 6 to 5.
    .pipe(jscs({
      esnext: true,
      configPath: '.jscs.json'
    }))
});

gulp.task('lint', function() {
  return gulp.src('scripts/*.jsx')
    .pipe(react({
      stripTypes: true
    })) // strips types, doesn't transpile 6 to 5.
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('default'))
})
