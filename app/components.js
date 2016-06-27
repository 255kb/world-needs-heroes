'use strict';

angular.module('wnh.components', ['wnh.services'])
    .component('wnhPost', {
        templateUrl: 'post.html',
        controller: function ($scope, Database, Auth) {
            $scope.playof = this.playof;

            $scope.vote = function () {
                Database.vote($scope.playof.$id, $scope.hasVote).then(function () {
                    //TODO update UI
                }).catch(function (error) {
                    //TODO handle failures / retry                        
                });
                $scope.hasVote = !$scope.hasVote;
            };

            $scope.hasVote = false;
            $scope.author = null;

            //on init fetch vote state
            this.$onInit = function () {
                if (Auth.getUser()) {
                    Database.hasVote($scope.playof.$id).then(function (userVote) {
                        if (userVote.val()) {
                            $scope.hasVote = true;
                        }
                    });
                }

                Database.getProfile($scope.playof.userId).then(function (author) {
                    if (author.val()) {
                        $scope.author = author.val();
                    }
                });
            };

            $scope.$on('youtube.player.ready', function ($event, player) {
                //$scope.ytplayer.playVideo();
            });
        },
        bindings: {
            playof: '='
        }
    });