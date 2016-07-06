angular.module('wnh.components', ['wnh.services'])
  .component('wnhPost', {
    templateUrl: 'views/components/post.html',
    controller: ['$rootScope', '$scope', 'Database', 'Auth', 'Dialogs', 'YoutubePlayers', 'Utils', function ($rootScope, $scope, Database, Auth, Dialogs, YoutubePlayers, Utils) {
      var checkVote = function () {
        Database.hasVote($scope.playof.key).then(function (userVote) {
          if (userVote.val()) {
            $scope.hasVote = true;
          }
        });
      };

      $scope.playof = this.playof;
      $scope.dialogs = Dialogs;
      $scope.voteIsHover = false;
      $scope.hasVote = false;
      $scope.author = null;
      $scope.currentUser = Auth.getUser();

      $scope.shareProviders = [{id: 'facebook', name: 'Facebook'}];

      $scope.shareData = {
        text: 'Check this amazing Play of the game with ' + Utils.heroesList[$scope.playof.hero].name,
        url: 'https://worldneedsheroes.com/post/' + $scope.playof.key,
        hashtags: 'WorldNeedsHeroes,Overwatch'
      };

      $scope.openMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };

      $scope.vote = function () {
        if (Auth.getUser()) {
          Database.vote($scope.playof.key, $scope.hasVote).then(function () {
            $scope.hasVote = !$scope.hasVote;
            if ($scope.hasVote) {
              $scope.playof.votesCount++;
              ga('send', 'event', 'playof', 'add_vote');
            } else {
              $scope.playof.votesCount--;
              ga('send', 'event', 'playof', 'remove_vote');
            }
          }).catch(function (error) {
            //TODO handle failures / retry
          });
        } else {
          Dialogs.showLoginDialog();
        }
      };

      //on init fetch post author profile
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

      $rootScope.$on('authChanged', function (event, user) {
        $scope.currentUser = user;
        if (user) {
          checkVote();
        } else {
          $scope.hasVote = false;
        }
      });
    }],
    bindings: {
      playof: '='
    }
  });
