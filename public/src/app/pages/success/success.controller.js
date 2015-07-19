'use strict';

var baseUrl = 'http://45.55.193.224/';

angular.module('smser')

.controller('SuccessCtrl', ['$scope', '$location', function($scope, $location) {

    var paymentId = $location.search().paymentId;
    console.log(paymentId);
    var token = $location.search().token;
    console.log(token);
    var PayerID = $location.search().PayerID;
    console.log(PayerID);


    $.get(baseUrl + 'api/purchase/success?paymentId=' + paymentId + '&token=' + token + '&PayerID=' + PayerID).done(function(data){
      console.log(data);
    })

    $scope.success = function() {
      alert('sdsdsd');
    }

}]);
