// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hfs', ['ionic', 'hfs.controllers', 'ngCordova', 'ionic.cloud', 'angular.filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "05b530fa"
    }
  });
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AuthCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.inventory', {
      url: '/inventory',
      views: {
        'menuContent': {
          templateUrl: 'templates/inventory.html'
        }
      }
    })
  .state('app.category', {
    url: '/inventory/:category',
    views: {
      'menuContent': {
        templateUrl: 'templates/category.html'
      }
    }
  })
  .state('app.model', {
    url: '/inventory/:category/:model',
    views: {
      'menuContent': {
        templateUrl: 'templates/model.html'
      }
    }
  })
    .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html'
        }
      }
    })

    .state('app.news-item', {
      url: '/news/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/news-item.html'
        }
      }
    })

    .state('app.service', {
      url: '/service',
      views: {
        'menuContent': {
          templateUrl: 'templates/service.html'
        }
      }
    })

  .state('app.parts', {
    url: '/parts',
    views: {
      'menuContent': {
        templateUrl: 'templates/parts.html'      }
    }
  })

  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html'      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html'      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
