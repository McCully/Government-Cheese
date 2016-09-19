var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap']);

myApp.config(['$routeProvider' , function($routeProvider){
    $routeProvider
    .when('/home' , {
        templateUrl: '/views/templates/home.html',
        controller: "homeController"
    })
    .when ('favorites' , {
        templateUrl: '/views/templates/favorites.html',
        controller: 'favoritesControlller'
    })
    // .when('/register' , {
    //     templateUrl: '/views/templates/register.html',
    //     controller: 'registerController'
    // })
    // .when('/signIn' ,{
    //     templateUrl: '/views/templates/signIn.html',
    //     controller: 'loginController'
    // })
    .otherwise({
        redirectTo: 'home'
    })
}]);
