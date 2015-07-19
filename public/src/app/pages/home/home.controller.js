'use strict';

angular.module('smser')

.controller('HomeCtrl', ['$scope', function($scope) {
    $scope.title = 'SMS';

    $scope.msgs = [{
        type: 'from',
        content: 'Welcome to smster!'
      }, {
        type: 'to',
        content: 'What is smster?? #swag'
    }, {
      type: 'from',
      content: 'smster is an sms based API for accessing online content #yolo'
    }]

    $scope.addMsg = function() {
      if ($scope.typespace.length > 0) {
        $scope.msgs.push({
          type: 'to',
          content: $scope.typespace
        });
        $scope.msgs.push({
          type: 'from',
          content: 'API response'
        })
        $scope.typespace = '';
      }
    };
}]);
