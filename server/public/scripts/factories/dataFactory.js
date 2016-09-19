myApp.factory('DataFactory' , ['$http', function($http){
  var selectedIngredientsArr = [];
  var recipeResults;
  var initRecipeResults;



  function postFave(faveRecipe) {
    $http({
      method: 'POST',
      url: '/faveData',
      data: {
        id: faveRecipe.recipeId,
        img: faveRecipe.srcImg,
        srcUrl: faveRecipe.srcUrl,
        title: faveRecipe.title,
        f2fUrl: faveRecipe.f2fUrl
      }
    }).then(function(response) {
      console.log( "response" , response.data);
    });
    return postFave;
  }

  var recipesGet = function(selectedingredientsArr){
    $http.get('/recipes', {
    params: {text: selectedIngredientsArr}}).then(function(response){
      recipeResults = response.data.recipes;
      console.log("factory results ", recipeResults);
      return recipeResults;
      // console.log("recipe GET " , $scope.recipeResults.length , $scope.recipeResults);
    });
  };

  var initRecipes = function(){
    $http.get('/initRecipes').then(function(response){
      console.log('init ', response);
      initRecipeResults = response.data.recipes;
      console.log("factory results ", initRecipeResults);
      // console.log("recipe GET " , $scope.recipeResults.length , $scope.recipeResults);
    });
  };

   var addIngredient = function(ingredientSelected){
     console.log("added ingredient: " , ingredientSelected);
    selectedIngredientsArr.push(ingredientSelected);
    console.log("factory array ", selectedIngredientsArr);
    // console.log("ingredients to search " , selectedIngredientsArr);
    };

  return{
    ingredientArray: selectedIngredientsArr,

    postToDatabase: function(faveRecipe){
      postFave(faveRecipe);
      return postFave;

    },

    initialRecipes: function(){
      return initRecipes();
    },

    initialRecipesResults: function(){
      return initRecipeResults;
    },

    recipeResult: function(){
      return recipeResults;
    },

    getRecipes: function(selectedIngredientsArr){
      return recipesGet(selectedIngredientsArr);
    },


    addIngredient: function(ingredient){
      return addIngredient(ingredient);
    }
  };

}]);
