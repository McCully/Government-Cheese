myApp.controller('homeController', ['$scope', '$http', '$location', 'DataFactory','$uibModal' , '$rootScope' , function($scope, $http, $location , DataFactory, $uibModal, $rootScope) {
  console.log("home controller up!");
  $scope.dataFactory = DataFactory;
  $scope.selectedIngredientsArr = []
  $scope.ingredientSelected = '';
  console.log($scope.$selectedIngredientsArr)


  $scope.toggleFaved = function() {
    // console.log(recipeResults.recipe_id);
    var faveRecipe = {
      recipeId: $scope.recipeResults.recipe_id,
      srcImg: $scope.recipeResults.image_url,
      srcUrl: $scope.recipeResults.src_url,
      title: $scope.recipeResults.title,
      f2fUrl: $scope.recipeResults.f2f_url
    };
    console.log(faveRecipe);
    $scope.dataFactory.postToDatabase(faveRecipe);
  };


  $scope.del = function(ingredient){
    var index = $scope.selectedIngredientsArr.indexOf(ingredient);
    $scope.selectedIngredientsArr.splice(index,1);
    console.log($scope.selectedIngredientsArr);
    if($scope.selectedIngredientsArr.length < 1){
      $http.get('/initRecipes').then(function(response){
        $scope.recipeResults = response.data.recipes;
      });

    } else{
      $http.get('/recipes', {
        params: {text: $scope.selectedIngredientsArr}}).then(function(response){
        $scope.recipeResults = response.data.recipes

      });
    }
  }


    if($scope.recipeResults === undefined ){
      console.log($scope.recipeResults);
      $http.get('/initRecipes').then(function(response){
        $scope.recipeResults = response.data.recipes;
        console.log($scope.recipeResults);
      });
    } else {
      $scope.recipeResults = response.data.recipes;
    };
  $scope.clear = function(){
    $scope.selectedIngredientsArr = [];
    $http.get('/initRecipes').then(function(response){
      $scope.recipeResults = response.data.recipes;
      console.log($scope.recipeResults);
    });

  }



  $scope.addIngredient = function(ingredientSelected){
    $scope.selectedIngredientsArr.push(ingredientSelected);
    console.log("ingredients to search " , $scope.selectedIngredientsArr);
    $http.get('/recipes', {
          params: {text: $scope.selectedIngredientsArr}}).then(function(response){
      $scope.recipeResults = response.data.recipes
      console.log("1 " , $scope.recipeResults);
      // console.log("recipe GET " , $scope.recipeResults.length , $scope.recipeResults);
    });
  }

  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {

          $location.path("/home");
      }
  });

//Log out
  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      $rootScope.currentUserLoggedIn = false;
      console.log('logged out');
      $location.path("/home");
    });
  };
//Sign Modal
  $scope.openLogin = function() {
    var loginModalInstance = $uibModal.open({
    templateUrl: '../views/templates/signIn.html',
    controller: loginController,
    });

  };
  //Main Register Modal
  $scope.openReg = function(){
    var regModalInstance = $uibModal.open({
      templateUrl: '../views/templates/register.html',
      controller: registerController,
    });
  };
}]);

//Login Controller for modal
var loginController = function($scope , $uibModalInstance, $http, $location , $uibModal, $rootScope){
  console.log("login controller up!");


  $scope.closeLoginModal = function(){
    $uibModalInstance.dismiss('cancel');
  };

  //Secondary Register modal
  $scope.openRegg = function(){
    var modalInstance = $uibModal.open({
      templateUrl: '../views/templates/register.html',
      controller: registerController,
    });

  };

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
          $rootScope.currentUserLoggedIn = true;
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
};

//Register Controller for modal
var registerController = function($scope , $uibModalInstance, $http , $location , $rootScope) {
  console.log("register controller up!");

  $scope.closeReggModal = function(){
    $uibModalInstance.dismiss('cancel');
  };
  $scope.user = {
      username: '',
      password: ''
    };
  $scope.message = '';

  $scope.registerUser = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      $scope.message = "Choose a username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/register', $scope.user).then(function(response) {
        $rootScope.currentUserLoggedIn = true;
        console.log('success');
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        $scope.message = "Please try again."
      });
    };
  }

}
