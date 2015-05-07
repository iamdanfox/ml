var gulp = require('gulp'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs');


gulp.task('watch', function() {
    gulp.watch("scripts/*.jsx", ["jshint", "jscs"]);
});


gulp.task('jscs', function() {
  return gulp.src('scripts/*.jsx')
    .pipe(react({
      stripTypes: true
    }))
    .pipe(jscs({
      esnext: true,
      "requireCurlyBraces": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "try",
        "catch"
      ],
      "requireOperatorBeforeLineBreak": true,
      "requireCamelCaseOrUpperCaseIdentifiers": true,
      "maximumLineLength": {
        "value": 130,
        "allowComments": true,
        "allowRegex": true
      },
      "validateIndentation": 2,
      // "validateQuoteMarks": "\"",
      "disallowMultipleLineStrings": true,
      "disallowMixedSpacesAndTabs": true,
      "disallowSpaceAfterPrefixUnaryOperators": true,
      "disallowMultipleVarDecl": true,
      "disallowKeywordsOnNewLine": ["else"],
      "requireSpaceAfterKeywords": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "return",
        "try",
        "catch"
      ],
      "requireSpaceBeforeBinaryOperators": [
        "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
        "&=", "|=", "^=", "+=",
        "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
        "|", "^", "&&", "||", "===", "==", ">=",
        "<=", "<", ">", "!=", "!=="
      ],
      "requireSpaceAfterBinaryOperators": true,
      "requireSpacesInConditionalExpression": true,
      "requireSpacesInForStatement": true,
      "requireLineFeedAtFileEnd": true,
      "requireSpacesInFunctionExpression": {
          "beforeOpeningCurlyBrace": true
      },
      "disallowSpacesInAnonymousFunctionExpression": {
          "beforeOpeningRoundBrace": true
      },
      "disallowSpacesInsideObjectBrackets": "all",
      "disallowSpacesInsideArrayBrackets": "all",
      "validateJSDoc": {
        "checkParamNames": true,
        "requireParamTypes": true
      },
      "disallowNewlineBeforeBlockStatements": true
    }))
});

gulp.task('jshint', function() {
  return gulp.src('scripts/*.jsx')
    .pipe(react({
      stripTypes: true
    }))
    .pipe(jshint({
      esnext: true,
      "bitwise": true,
      "camelcase": false,
      "curly": true,
      "eqeqeq": true,
      "forin": true,
      "freeze": true,
      "indent": 2,
      "latedef": true,
      "loopfunc": true,
      "maxcomplexity": 4,
      "maxdepth": 3,
      "maxparams": 6,
      "maxstatements": 10,
      "newcap": true,
      "noarg": true,
      "node": true,
      "noempty": true,
      "nonbsp": true,
      "nonew": true,
      "plusplus": true,
      "predef": [ "window", "document", "Worker", "self" ],
      "strict": true,
      "undef": true,
      "unused": true,
      // "quotmark": "double",
    }))
    .pipe(jshint.reporter('default'))
})
