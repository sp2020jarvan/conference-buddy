'use strict';

var app = angular.module('conferenceBuddyApp', ['ngRoute', 'ngTouch', 'ngAnimate', 'ngCookies', 'ui.bootstrap']);

app.config(['$provide', '$routeProvider', '$httpProvider', function($provide, $routeProvider, $httpProvider) {

    $httpProvider.responseInterceptors.push('HttpInterceptor');

    $routeProvider.when('/', {
        templateUrl: 'views/tracks.html',
        controller: 'TrackController'
    }).when('/mytrack', {
        templateUrl: 'views/mytrack.html',
        controller: 'MyTrackController'
    }).when('/details', {
        templateUrl: 'views/details.html',
        controller: 'DetailsController'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserController'
    }).otherwise({
        redirectTo: '/'
    });

    // provides a catch-all handler for all non-catched errors
    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
        return function(exception, cause) {
            console.error(exception);
            $delegate(exception, cause);
        };
    }]);
}]);

/*
app.run(['RegistrationService', function(registrationService) {
    registrationService.init();
*/

