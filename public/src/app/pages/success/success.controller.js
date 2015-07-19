'use strict';

var baseUrl = 'http://45.55.193.224/';

angular.module('smser')

.controller('SuccessCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.success = function() {
      alert('sdsdsd');
    }

}]);
