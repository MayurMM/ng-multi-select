angular.module('multiSelectApp',['ng-multi-select','ngRoute']);
angular.module('app').config(function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',
        {
            templateUrl: '/app/main/main',
            controller: 'mainController'
        })
});
