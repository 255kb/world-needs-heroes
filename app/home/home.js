'use strict';

angular.module('wnh.home', ['ngRoute', 'wnh.services', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'Database', '$sce', function ($scope, Database, $sce) {
        $scope.tabs = [
            {filter: 'day', title: 'Today'},
            {filter: 'week', title: 'Last week'},
            {filter: 'month', title: 'Last month'},
            {filter: 'all', title: 'Overall'}
        ];
        
        $scope.currentFilter = 'day';
                
        $scope.setFilter = function (filter) {
            $scope.currentFilter = filter;
        };

        $scope.getIframeSrc = function (youtubeId) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + youtubeId);
        };

        $scope.vote = function (playOfId) {
            Database.newVote(playOfId);
        };
        
        $scope.playofList = Database.getPlayof($scope.currentFilter);
    }]);