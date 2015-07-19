'use strict';

angular.module('smser', ['ui.router', 'lumx'])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
        templateUrl: 'app/templates/main.html'
    })
    .state('main.home', {
        url: '/',
        templateUrl: 'app/pages/home/home.html',
        controller: 'HomeCtrl'
    });
})

.controller('BodyCtrl', ['$scope', function($scope) {

}]);
