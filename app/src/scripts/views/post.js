angular.module('wnh.post', ['ngRoute', 'wnh.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/post/:postId', {
      templateUrl: '../../views/post.html',
      controller: 'PostCtrl'
    });
  }])

  .controller('PostCtrl', ['$rootScope', '$scope', '$routeParams', 'Auth', 'Database', 'Utils', 'Youtube', 'Header', function ($rootScope, $scope, $routeParams, Auth, Database, Utils, Youtube, Header) {
    var playofId = $routeParams.postId;

    $scope.inProgress = true;
    $scope.playof = null;

    Database.getPlayof(playofId).then(function (playof) {
      $scope.$apply(function () {
        if (playof.val()) {
          $scope.playof = playof.val();
          $scope.playof.key = playof.key;
          $scope.inProgress = false;

          var heroName = Utils.heroesList[playof.hero] && Utils.heroesList[playof.hero].name;

          Header.setTitle('Play of the game with ' + heroName + ' - World Needs Heroes');
          Header.setMeta('description', 'Discover and vote for this amazing Overwatch play of the game with ' + heroName + ' on World Needs Heroes');
        } else {
          $scope.inProgress = false;
          $scope.playof = null;
        }
      });
    }).catch(function (error) {
      $scope.$apply(function () {
        $scope.inProgress = false;
        $scope.playof = null;
      });
    });
  }]);
