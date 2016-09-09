myApp.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {

          $location.path("/home");
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }


  var key = '50314a4cdf0488cfd23dcb086e0b3cb7';
  var baseURL = 'food2fork.com/api/';
  var conversonURL = "https://json2jsonp.com/?url="
  $scope.getRecipes = function() {
    var query =  conversonURL + baseURL + 'search';
    query += '?key=' + key;
    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      $scope.results = response.data;
      console.log(request);
      console.log($scope.results.recipes[0].title);

      $scope.getAllrecipes = function() {
        for(var i = 0; i < $scope.results.recipes.length;i++){
          console.log($scope.results.recipes.length);
          $scope.allRecipes = $scope.results.recipes[0].title;
          console.log($scope.results.recipes[i]);
          console.log("recipe titles: " , $scope.allRecipe);
        }
      }
    });
  };

  // $scope.getAllrecipes = function() {
  //   getRecipes();
  //   for(var i = 0; i <= $scope.results.recipes.length;i++){
  //     $scope.allRecipes = $scope.results.recipes[i].title;
  //     console.log("recipe titles: " , $scope.allRecipe);
  //   }
  // }
  // angular.element(document).ready($scope.getRecipes);


}]);
