'use strict';

angular.module('conferenceBuddyApp').factory('HttpInterceptor', function httpInterceptor($q, $window, $location) {
    return function(promise) {

        var success = function(response) {
            return response;
        };

        var error = function(response) {
            if (response.status === 401) {
                $location.url('/register');
            }
            return $q.reject(response);
        };

        return promise.then(success, error);
    };
});