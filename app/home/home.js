'use strict';

angular.module('wnh.home', ['ngRoute', 'wnh.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'Database', 'Utils', function ($scope, Database, Utils) {
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
        $scope.currentFilters = {
            timeframe: 'week',
            hero: ''
        };
        $scope.currentFiltersNames = {
            timeframe: 'Last week'
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.timeframeFilter = function (timeframe) {
            $scope.currentFilters.timeframe = timeframe;
            $scope.currentFiltersNames.timeframe = getTimeframeName(timeframe);
        };

        $scope.heroFilter = function (hero) {
            $scope.currentFilters.hero = hero;
        };

        $scope.showMore = function () {
            increaseLimit();
        };

        $scope.$watchCollection('currentFilters', function (newFilters, oldFilters) {
            resetLimit();
            
            Database.getPlayof($scope.currentFilters.timeframe).on('child_added', function (post) {
                $scope.$apply(function () {
                    var postObject = post.val();
                    postObject.key = post.key;
                    $scope.playofList.push(postObject);
                })
            });
        });
    }]);