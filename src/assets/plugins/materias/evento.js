function iniciaEvento() {
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.showMe = false;
        $scope.myFunc = function() {
            $scope.showMe = !$scope.showMe;
        }
        $scope.showMe1 = false;
        $scope.myFunc1 = function() {
            $scope.showMe1 = !$scope.showMe1;
        }
        $scope.showMe2 = true;
        $scope.myFunc2 = function() {
            $scope.showMe2 = !$scope.showMe2;
        }
    });

}