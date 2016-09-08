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
  // var recId = 35382;
  $scope.getRecipes = function() {
    var query = conversonURL + baseURL + 'get';
    query += '?key=' + key;
    query += '&rId=29159';
    var request = encodeURI(query);
    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      $scope.results = response.data;
      console.log(request);
      console.log(response.data);
    });


  };

  angular.element(document).ready($scope.getRecipes);


}]);
