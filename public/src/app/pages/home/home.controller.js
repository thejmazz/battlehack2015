'use strict';

var baseUrl = 'http://45.55.193.224/';

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
        var url = $scope.typespace.replace('site ', '')

        var completeUrl = baseUrl + 'api/screen?url=' + url
        console.log(completeUrl);

        $.get(completeUrl).success(function(err,data) {
          console.log(data);

          $scope.msgs.push({
            type: 'to',
            content: $scope.typespace
          });
          // $scope.msgs.push({
          //   type: 'from',
          //   content: '<img src="' + baseUrl + data + '">'
          // })
          $scope.typespace = '';
        }).error(function(err) {
          console.log('err' + err);
        });
      }
    };
}]);
