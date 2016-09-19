myApp.controller('loginController', ['$scope', '$http', '$location', '$modal' , function($scope, $http, $location , $modal) {

  $scope.open = function() {
    var modalInstance = $modal.open({
      templateUrl: '../views/templates/signIn.html',
      controller: modalInstanceCtrl
    });
  };

}]);

myApp.controller('ModelInstanceCtrl' , ['$scope' , '$modalInstance' , function($scope, $modalInstance){
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.message = '';
  
  $scope.login = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      $scope.message = "Enter your username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          console.log('redirecting to home page');
          $location.path('/home');
        } else {
          console.log('failure: ', response);
          $scope.message = "Wrong!!";
        }
      });
    }
  }
}])
