angular.module('wnh.main', ['ngRoute', 'wnh.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '../../views/main.html',
      controller: 'MainCtrl'
    });
  }])

  .controller('MainCtrl', ['$rootScope', '$scope', 'Auth', 'Database', 'Utils', 'DataFilters', 'Header', function ($rootScope, $scope, Auth, Database, Utils, DataFilters, Header) {
    var initLimit = function () {
        $scope.page = 1;
        $scope.limit = $scope.page * Utils.itemsPerPage;
      },
      fetchData = function (event, timeframe) {
        initLimit();
        Header.setTitle('Vote for the best play of the game - World Needs Heroes');
        Header.setMeta('description', 'Check the latest Overwatch play of the game and vote for the best one on World Needs Heroes');
        $scope.playofList = [];

        Database.getPlayofList(timeframe).on('child_added', function (post) {
          var postObject = post.val();
          postObject.key = post.key;
          $scope.$apply(function () {
            $scope.playofList.push(postObject);
          });
        });
      };

    $scope.playofList = [];
    $scope.currentHero = DataFilters.getHero();

    $scope.showMore = function () {
      $scope.page++;
      $scope.limit = $scope.page * Utils.itemsPerPage;
    };

    initLimit();
    fetchData();

    $rootScope.$on('dataFiltersTimeframeChanged', fetchData);

    $rootScope.$on('dataFiltersHeroChanged', function (event, hero) {
      initLimit();
      $scope.currentHero = hero;
    });
  }]);
