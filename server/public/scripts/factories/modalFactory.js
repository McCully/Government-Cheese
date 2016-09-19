myApp.factory('ModalFactory' ,['$uibModal', function($uibModal) {

  return {
    openMenuModal: function(templateLink, windowAnimation) {

      var modalObj = $uibModal.open({
        templateUrl: templateLink,
        backdrop: 'static',
        windowClass: windowAnimation,
        controller: function($scope,$modalInstance){
          $scope.ok = function(id){
            $modalInstance.close();
          },
           $scope.cancel = function(){
              $modalInstance.dismiss('cancel');
            }
        }





      });
    }
  }
}]);
