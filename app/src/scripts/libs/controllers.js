angular.module('wnh.controllers', ['wnh.services'])
  .controller('ToolbarCtrl', ['$rootScope', '$scope', 'Auth', 'Database', 'Utils', 'Dialogs', 'DataFilters', function ($rootScope, $scope, Auth, Database, Utils, Dialogs, DataFilters) {
    $scope.auth = Auth;
    $scope.dialogs = Dialogs;
    $scope.dataFilters = DataFilters;
    $scope.currentUser = null;
    $scope.timeframes = Utils.timeframesList;
    $scope.heroes = Utils.heroesList;
    $scope.currentTimeframe = DataFilters.getTimeframe();
    $scope.currentHero = DataFilters.getHero();

    $scope.openMenu = function ($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.getTimeframeName = function (timeframe) {
      for (var i = 0; i < $scope.timeframes.length; i++) {
        if (timeframe === $scope.timeframes[i].filter) {
          return $scope.timeframes[i].title;
        }
      }
    };

    $rootScope.$on('authChanged', function (event, user) {
      $scope.currentUser = user;
    });

    $rootScope.$on('dataFiltersTimeframeChanged', function (event, timeframe) {
      $scope.currentTimeframe = timeframe;
    });

    $rootScope.$on('dataFiltersHeroChanged', function (event, hero) {
      $scope.currentHero = hero;
    });
  }]);
