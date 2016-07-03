'use strict';

angular.module('wnh.components', ['wnh.services'])
    .component('wnhPost', {
        templateUrl: 'post.html',
        controller: function ($rootScope, $scope, Database, Auth, YoutubePlayers) {
            $scope.playof = this.playof;
            $scope.voteIsHover = false;
            $scope.hasVote = false;
            $scope.author = null;
            $scope.currentUserId = Auth.getUser() && Auth.getUser().uid;

            $scope.voteHover = function (isHover) {
                $scope.voteIsHover = isHover;
            };

            $scope.vote = function () {
                Database.vote($scope.playof.key, $scope.hasVote).then(function () {
                    $scope.hasVote = !$scope.hasVote;
                    ($scope.hasVote) ? $scope.playof.votesCount++ : $scope.playof.votesCount--;
                }).catch(function (error) {
                    //TODO handle failures / retry
                });
            };

            //on init fetch vote state
            this.$onInit = function () {
                if (Auth.getUser()) {
                    Database.hasVote($scope.playof.key).then(function (userVote) {
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
                YoutubePlayers.registerPlayer(player);
            });

            $scope.$on('youtube.player.playing', function ($event, player) {
                YoutubePlayers.pauseAllPlayers(player);
            });
        },
        bindings: {
            playof: '='
        }
    });