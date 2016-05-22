angular.module('mainControllers', []).controller('mainController', ['$scope', '$http',
    function($scope, $http){
        $scope.hello = 'Hello World';
    }]);