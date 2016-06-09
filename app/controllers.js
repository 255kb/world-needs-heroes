'use strict';

angular.module('wnh.controllers', [])
    .controller('PostCtrl', ['$scope', '$mdDialog', 'Auth', '$firebaseObject', 'Database', function ($scope, $mdDialog, Auth, $firebaseObject, Database) {

        $scope.showLoginPopup = function (event) {
            $mdDialog.show({
                controller: function DialogController($scope, $mdDialog, $firebaseAuth) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.login = function () {
                        Auth.$signInAnonymously().then(function () {
                            $mdDialog.hide();
                        }).catch(function (error) {
                            //TODO display error
                            $scope.error = error;
                        });
                    };
                },
                templateUrl: 'loginDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.post = function () {
            if (Auth.getUser() && $scope.videoLink) {
                var videoId = $scope.videoLink.match(//i);
                console.log(videoId)
                Database.newPost({youtubeId: videoId[1]});
            } else {
                $scope.showLoginPopup();
            }
        };
    }])

    .controller('ToolbarCtrl', ['$scope', '$mdDialog', '$firebaseAuth', '$firebaseObject', function ($scope, $mdDialog, $firebaseAuth, $firebaseObject) {

    }]);