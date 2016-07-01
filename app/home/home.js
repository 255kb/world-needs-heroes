'use strict';

angular.module('wnh.home', ['ngRoute', 'wnh.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'Auth', 'Database', 'Utils', function ($scope, Auth, Database, Utils) {
        var getTimeframeName = function (timeframe) {
                for (var index = 0; index < $scope.timeframes.length; index++) {
                    if ($scope.timeframes[index].filter === timeframe) {
                        return $scope.timeframes[index].title;
                    }
                }
            },
            increaseLimit = function () {
                $scope.page++;
                $scope.limit = $scope.page * Utils.itemsPerPage;
            },
            resetLimit = function () {
                $scope.page = 1;
                $scope.limit = $scope.page * Utils.itemsPerPage;
            };

        resetLimit();

        $scope.playofList = [];
        $scope.timeframes = [
            {filter: 'week', title: 'Last week'},
            {filter: 'day', title: 'Today'},
            {filter: 'all', title: 'Overall'}
        ];

        $scope.heroes = Utils.heroesList;
        $scope.currentTimeframe = 'week';
        $scope.currentHero = '';
        $scope.currentTimeframeName = 'Last week';

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.timeframeFilter = function (timeframe) {
            $scope.currentTimeframe = timeframe;
            $scope.currentTimeframeName = getTimeframeName(timeframe);
        };

        $scope.heroFilter = function (hero) {
            $scope.currentHero = hero;
        };

        $scope.showMore = function () {
            increaseLimit();
        };

        $scope.$watch('currentTimeframe', function (newFilters, oldFilters) {
            resetLimit();
            $scope.playofList = [];
            
            Database.getPlayof($scope.currentTimeframe).on('child_added', function (post) {
                var postObject = post.val();
                postObject.key = post.key;
                $scope.$apply(function () {
                    $scope.playofList.push(postObject);
                });
            });
        });
    }]);