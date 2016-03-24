/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['angular-ta-multi-select/**/*.module.js', 'angular-ta-multi-select/**/*.js', '!angular-ta-multi-select/**/*_test.js'],
  srcJade:'angular-ta-multi-select/template',
  srcSass:'angular-ta-multi-select/sass',
  tests: 'angular-ta-multi-select/**/*_test.js',
  buildFolder: 'dist',
  buildJsFilename: 'angular-ta-multi-select.js',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();'

};