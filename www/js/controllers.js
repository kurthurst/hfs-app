var hfs = angular.module('hfs.controllers', ['ionic.cloud']);

hfs.controller('AuthCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

hfs.controller('HomeCtrl', function($ionicSlideBoxDelegate, $scope){

  $scope.options = {
    loop: true,
    effect: 'fade',
    speed: 500
  }

  $scope.$on("$ionicSlices.sliderInitialized", function(event, data){
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.activeIndex;
  $scope.previousIndex = data.previousIndex;
});
});

hfs.controller('BarcodeScannerController', function($scope, $cordovaBarcodeScanner){
  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData){
      $scope.sn = imageData.text;
      alert($scope.sn);
    }, function(error){
      console.log('An error occurred -> ' + error);
    });
  };
});

hfs.controller('SliderController', function($scope, $http){
  $http({
    method: 'GET',
    url: 'api/?home-slider'
  }).then(function success(res){
    console.log(res.data);
    $scope.inventorySlides = res.data;
  }, function error(res){
    console.log('error: ' + res)
  });
});

// filter for removing dashes in category names

hfs.filter('removeDashes', function() {
  return function(item) {
    return item.replace(/-/g, " ");
  }
});
hfs.filter('addDashes', function() {
  return function(item) {
    return item.replace(/ /g, "-");
  }
});

hfs.controller('InventoryCountsController', function($scope, $http){
  $http({
    method: 'GET',
    url: 'api/?inventory-counts'
  }).then(function success(res){
    console.log(res.data);
    $scope.inventoryCounts = res.data;
  }, function error(res){
    console.log('error: ' + res)
  });
});

hfs.controller('InventoryCategoryController', function($scope, $http, $stateParams){
  $scope.category = $stateParams.category;
  $scope.url = 'api/?inventory-models/' + $scope.category; 
  $http({
    method: 'GET',
    url: $scope.url
  }).then(function success(res){
    console.log(res.data);
    $scope.categoryCounts = res.data;
  }, function error(res){
    console.log('error: ' + res)
  });
});
hfs.controller('InventoryModelController', function($scope, $http, $stateParams){
  $scope.model = $stateParams.model;
  $scope.category = $stateParams.category;
  $scope.url = 'api/?' + $scope.category + '/' + $scope.model; 
  $http({
    method: 'GET',
    url: $scope.url
  }).then(function success(res){
    console.log(res.data);
    $scope.modelList = res.data;
  }, function error(res){
    console.log('error: ' + res)
  });
});