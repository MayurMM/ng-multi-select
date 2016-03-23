/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['angular-multi-select/**/*.module.js', 'angular-multi-select/**/*.js', '!angular-multi-select/**/*_test.js'],
  srcJade:'angular-multi-select/template',
  srcSass:'angular-multi-select/sass',
  tests: 'angular-multi-select/**/*_test.js',
  buildFolder: 'dist',
  buildJsFilename: 'angular-multi-select.js',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();'

};