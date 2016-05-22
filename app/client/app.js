var app = angular.module('levelMoneyApp', [ 'ngRoute', 'mainControllers']);

app.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'mainController'
            })
            .otherwise({
                redirectTo: '/main'
            });
    }
]);