angular.module('mainControllers', []).controller('mainController', ['$scope', '$http',
    function($scope, $http){
        $scope.transactions = [];
        $http.get('http://localhost:1337/info').success(function(data){
            for(var key in data){
                $scope.transactions.push(data[key]);
            }
        });
    }]);