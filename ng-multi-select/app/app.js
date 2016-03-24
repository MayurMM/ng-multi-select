angular.module('app',['ngRoute','ng-multi-select']);
angular.module('app').config(function($locationProvider,$routeProvider) {
    $routeProvider.when(
        '/',{
            templateUrl:'m'
        }

    )
})