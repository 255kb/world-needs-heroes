'use strict';

// Declare app level module which depends on views, and components
angular.module('wnh', [
  'firebase',
  'youtube-embed',
  'ngMaterial',
  'ngMessages',
  'ngRoute',
  'wnh.filters',
  'wnh.controllers',
  'wnh.components',
  'wnh.main',
  'wnh.post'
]).config(['$locationProvider', '$routeProvider', '$mdThemingProvider', '$compileProvider', function ($locationProvider, $routeProvider, $mdThemingProvider, $compileProvider) {
  var defaultHues = {
    'default': '400',
    'hue-1': '50',
    'hue-2': '200',
    'hue-3': 'A100'
  };

  $mdThemingProvider.definePalette('primary', {
    '50': '#abb9d5',
    '100': '#798fbb',
    '200': '#5570a7',
    '300': '#3d5078',
    '400': '#324363',
    '500': '#28354f',
    '600': '#1e273b',
    '700': '#131a26',
    '800': '#090c12',
    '900': '#000000',
    'A100': '#abb9d5',
    'A200': '#798fbb',
    'A400': '#324363',
    'A700': '#131a26',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 A100'
  });

  $mdThemingProvider.definePalette('accent', {
    '50': '#ffffff',
    '100': '#c1ddf0',
    '200': '#94c5e6',
    '300': '#5aa5d8',
    '400': '#4298d2',
    '500': '#2f89c6',
    '600': '#2978ad',
    '700': '#236794',
    '800': '#1d567c',
    '900': '#184563',
    'A100': '#ffffff',
    'A200': '#c1ddf0',
    'A400': '#4298d2',
    'A700': '#236794',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 A100'
  });

  $mdThemingProvider.definePalette('warn', {
    '50': '#ffffff',
    '100': '#fde5c9',
    '200': '#fbcb92',
    '300': '#f9a94d',
    '400': '#f89b30',
    '500': '#f78d12',
    '600': '#e37d08',
    '700': '#c56d07',
    '800': '#a85d06',
    '900': '#8a4c05',
    'A100': '#ffffff',
    'A200': '#fde5c9',
    'A400': '#f89b30',
    'A700': '#c56d07',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 A100'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('primary', defaultHues)
    .accentPalette('accent', defaultHues)
    .warnPalette('warn', defaultHues)
    .backgroundPalette('grey', {
      'default': '50',
      'hue-1': '100',
      'hue-2': '200',
      'hue-3': 'A100'
    });

  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});

  $compileProvider.debugInfoEnabled(false);

  // Initialize the Firebase SDK
  var config = {
    apiKey: 'AIzaSyA9mff-Z4l_jkT4rJrvwf2YyozlBxU6gRk',
    authDomain: 'world-needs-heroes.firebaseapp.com',
    databaseURL: 'https://world-needs-heroes.firebaseio.com',
    storageBucket: 'world-needs-heroes.appspot.com'
  };
  firebase.initializeApp(config);
}]);
