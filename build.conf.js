/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['ng-multi-select/**/*.module.js', 'ng-multi-select/**/*.js', '!ng-multi-select/**/*_test.js'],
  srcJade:'ng-multi-select/template',
  srcSass:'ng-multi-select/sass',
  tests: 'ng-multi-select/**/*_test.js',
  buildFolder2:'../../demoApp/public/vendor/ng-multi-select/dist',
  buildFolder: 'dist',
  buildJsFilename: 'ng-multi-select.js',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();'

};