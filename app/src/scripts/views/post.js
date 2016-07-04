angular.module('wnh.post', ['ngRoute', 'wnh.services'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/post/:postId', {
      templateUrl: '../../views/post.html',
      controller: 'PostCtrl'
    });
  }])

  .controller('PostCtrl', ['$rootScope', '$scope', '$routeParams', 'Auth', 'Database', function ($rootScope, $scope, $routeParams, Auth, Database) {
    var playofId = $routeParams.postId;

    $scope.inProgress = true;
    $scope.playof = null;

    Database.getPlayof(playofId).then(function (playof) {
      $scope.$apply(function () {
        if (playof.val()) {
          $scope.playof = playof.val();
          $scope.playof.key = playof.key;
          $scope.inProgress = false;
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
