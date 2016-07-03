'use strict';

angular.module('wnh.controllers', [])
    .controller('ToolbarCtrl', ['$scope', '$mdDialog', 'Auth', 'Database', function ($scope, $mdDialog, Auth) {
        var showLoginDialog = function (event) {
            $mdDialog.show({
                controller: function DialogController($scope, $mdDialog, Auth, Database) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.login = function (providerName) {
                        Auth.providerLogin(providerName).then(function (result) {
                            $mdDialog.hide();
                            Database.getProfile(result.user.uid).then(function (userProfile) {
                                var profile = userProfile.val();
                                if (!profile || (profile && !profile.onboarding)) {
                                    showOnboardingDialog();
                                }
                            });
                        }).catch(function (error) {
                            //TODO show error
                            /*// Handle Errors here.
                             var errorCode = error.code;
                             var errorMessage = error.message;
                             // The email of the user's account used.
                             var email = error.email;
                             // The firebase.auth.AuthCredential type that was used.
                             var credential = error.credential;
                             // ...*/
                        });
                    };
                },
                templateUrl: 'loginDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    //dialog validated
                }, function () {
                    //dialog cancelled
                });
        };

        var showOnboardingDialog = function (event) {
            $mdDialog.show({
                controller: function DialogController($scope, $mdDialog, Database) {
                    $scope.onboard = function () {
                        Database.saveProfile({
                            name: $scope.onboarding.displayName,
                            battletag: $scope.onboarding.battleTag,
                            picture: Auth.getUser().photoURL,
                            onboarding: true
                        });
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'onboardingDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            })
                .then(function (answer) {
                    //dialog validated
                }, function () {
                    //dialog cancelled
                });
        };


        $scope.showPostDialog = function (event) {
            if (Auth.getUser()) {
                $mdDialog.show({
                    controller: function DialogController($scope, $mdDialog, Utils, Youtube, $mdToast, Database) {
                        $scope.heroesList = Utils.heroesList;
                        $scope.invalidId = false;
                        $scope.newPost = {
                            videoLink: '',
                            hero: ''
                        };

                        $scope.videoLinkChange = function () {
                            $scope.invalidId = false;
                        };

                        $scope.post = function () {
                            if ($scope.newPost.videoLink && $scope.newPost.hero) {
                                var regex = $scope.newPost.videoLink.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i), videoId = null;
                                if (regex && regex[1].length === 11) {
                                    videoId = regex[1];
                                } else {
                                    videoId = $scope.newPost.videoLink;
                                }

                                if (videoId && videoId.length === 11) {
                                    //check if valid id with YT API
                                    Youtube.getVideoInfo(videoId).then(function successCallback(response) {
                                        if (response.data.items.length) {
                                            var data = {youtubeId: videoId, hero: $scope.newPost.hero};
                                             if ($scope.newPost.description) {
                                             data.description = $scope.newPost.description;
                                             }
                                             Database.newPost(data);
                                            
                                            //TODO redirect to single item page
                                            
                                            $mdDialog.hide();
                                        } else {
                                            $scope.invalidId = true;
                                        }
                                    }, function errorCallback(error) {
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .textContent('Error, please try again later')
                                                .hideDelay(3000)
                                        );
                                    });
                                } else {
                                    $scope.invalidId = true;
                                }
                            }
                        };

                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'postDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true
                })
                    .then(function (answer) {
                        //dialog validated
                    }, function () {
                        //dialog cancelled
                    });
            } else {
                showLoginDialog();
            }

        };
    }]);