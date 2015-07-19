'use strict';

var baseUrl = 'http://45.55.193.224/';

angular.module('smser')

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
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
    }, {
      type: 'to',
      content: 'Cool, how can I use it? #Battlehack'
    }, {
      type: 'from',
      content: 'Try entering `site http://google.com`!'
    }, {
      type: 'from',
      content: 'or `rss rssfeed.xml`!'
    }]

    $scope.addMsg = function() {
      if ($scope.typespace.length > 0) {
        var url = $scope.typespace.replace('site ', '')

        var completeUrl = baseUrl + 'api/screen?url=' + url
        console.log(completeUrl);


        $.get(completeUrl).done(function(data) {
          console.log(data);
          $scope.msgs.push({
            type: 'to',
            content: $scope.typespace
          });
          $scope.msgs.push({
            type: 'from',
            image: baseUrl + data
          })

          $scope.typespace = '';

          $scope.$digest();
        })
      }
    };

    $scope.purchase = function() {
      $.get(baseUrl + 'api/purchase').done(function(data) {
        console.log(data);

        data.links.forEach(function(link) {
          if (link.method === 'REDIRECT') {
            $scope.redirect_ready = true;
            $scope.paypal_redirect = link.href;
            $scope.$digest();
          }
        })
      })

      // $http.get(baseUrl + 'api/purchase').success(function(err, data) {
      //   console.log(data);
      // }).error(function(e) {
      //   console.log(e);
      // })
    }
}]);
