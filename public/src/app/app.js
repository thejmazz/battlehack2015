'use strict';

angular.module('smser', ['ui.router', 'lumx'])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
        templateUrl: 'app/templates/core.html'
    })
    .state('main.home', {
        url: '/',
        templateUrl: 'app/pages/home/home.html',
        controller: 'HomeCtrl'
    })
    .state('main.paypalsuccess', {
      url: '/paypalsuccess',
      templateUrl: 'app/pages/success/success.html',
      controller: 'SuccessCtrl'
    });
})

.controller('BodyCtrl', ['$scope', function($scope) {

}]);
