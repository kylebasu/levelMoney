angular.module('mainControllers', []).controller('mainController', ['$scope', '$http',
    function($scope, $http){
        $scope.transactions = [];
        $scope.donuts = 'Exclude donuts';
        $scope.cc = 'Exclude CC payments';

        $scope.getData = function(route){
            $scope.transactions =[];
            $http.get('http://localhost:1337/' + route).success(function(data){
                for(var key in data){
                    $scope.transactions.push(data[key]);
                }
            });
        };

        $scope.donutHandler = function(){
            if($scope.donuts === 'Exclude donuts'){
                $scope.donuts = 'Include donuts';
                $scope.getData('donuts');
            }else{
                $scope.donuts = 'Exclude donuts';
                $scope.getData('info');
            }
        };

        $scope.ccHandler = function(){
            if($scope.cc === 'Exclude CC payments'){
                $scope.cc = 'Include CC payments';
                $scope.getData('credit');
            } else {
                $scope.cc = 'Exclude CC payments';
                $scope.getData('info');
            }
        };
        
        $scope.getData('info');
    }]);