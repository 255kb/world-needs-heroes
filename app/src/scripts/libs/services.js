angular.module('wnh.services', [])
  .factory('Utils', ['$mdToast', function ($mdToast) {
    return {
      heroesList: {
        'multi': {id: 'multi', name: 'Multiple heroes'},
        'genji': {id: 'genji', name: 'Genji'},
        'mccree': {id: 'mccree', name: 'Mccree'},
        'pharah': {id: 'pharah', name: 'Pharah'},
        'reaper': {id: 'reaper', name: 'Reaper'},
        'soldier76': {id: 'soldier76', name: 'Soldier: 76'},
        'tracer': {id: 'tracer', name: 'Tracer'},
        'bastion': {id: 'bastion', name: 'Bastion'},
        'hanzo': {id: 'hanzo', name: 'Hanzo'},
        'junkrat': {id: 'junkrat', name: 'Junkrat'},
        'mei': {id: 'mei', name: 'Mei'},
        'torbjorn': {id: 'torbjorn', name: 'Torbjörn'},
        'widowmaker': {id: 'widowmaker', name: 'Widowmaker'},
        'dva': {id: 'dva', name: 'D.VA'},
        'reinhardt': {id: 'reinhardt', name: 'Reinhardt'},
        'roadhog': {id: 'roadhog', name: 'Roadhog'},
        'winston': {id: 'winston', name: 'Winston'},
        'zarya': {id: 'zarya', name: 'Zarya'},
        'lucio': {id: 'lucio', name: 'Lúcio'},
        'mercy': {id: 'mercy', name: 'Mercy'},
        'symmetra': {id: 'symmetra', name: 'Symmetra'},
        'zenyatta': {id: 'zenyatta', name: 'Zenyatta'}
      },
      timeframesList: [
        {filter: 'week', title: 'Last 7 days'},
        {filter: 'day', title: 'Last day'},
        {filter: 'all', title: 'Overall'}
      ],
      itemsPerPage: 5,
      overallLimit: 300,
      showToast: function (message) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .hideDelay(4000)
        );
      }
    };
  }])

  .factory('DataFilters', ['$rootScope', function ($rootScope) {
    var currentTimeframe = 'week', currentHero = '';

    return {
      getTimeframe: function () {
        return currentTimeframe;
      },
      getHero: function () {
        return currentHero;
      },
      setTimeframe: function (timeframe) {
        currentTimeframe = timeframe;
        $rootScope.$broadcast('dataFiltersTimeframeChanged', timeframe);
      },
      setHero: function (hero) {
        currentHero = hero;
        $rootScope.$broadcast('dataFiltersHeroChanged', hero);
      }
    };
  }])

  .factory('YoutubePlayers', [function () {
    var youtubePlayersArray = [];

    return {
      registerPlayer: function (playerInstance) {
        youtubePlayersArray.push(playerInstance);
      },
      pauseAllPlayers: function (currentPlayerInstance) {
        youtubePlayersArray.forEach(function (player) {
          if (player.id !== currentPlayerInstance.id && player.getPlayerState() === 1) {
            player.pauseVideo();
          }
        });
      }
    };
  }])

  .factory('Youtube', ['$http', function ($http) {
    var youtubeApiKey = 'AIzaSyAyY4cymf3FIT7lOGltKv1WthHZlR7npkI',
      youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';

    return {
      getVideoInfo: function (videoId) {
        return $http({
          method: 'GET',
          url: youtubeApiUrl + 'videos?id=' + videoId + '&key=' + youtubeApiKey + '&fields=items(id,snippet(title,thumbnails))&part=snippet'
        });
      }
    };
  }])

  .factory('Auth', ['$rootScope', '$firebaseAuth', function ($rootScope, $firebaseAuth) {
    var firebaseAuthInstance = $firebaseAuth(),
      firebaseUser = null;

    firebaseAuthInstance.$onAuthStateChanged(function (user) {
      firebaseUser = user;
      $rootScope.$broadcast('authChanged', user);
    });

    return {
      logout: function () {
        return firebaseAuthInstance.$signOut();
      },
      getUser: function () {
        return firebaseUser;
      },
      providerLogin: function (providerName) {
        var provider = new firebase.auth[providerName + 'AuthProvider']();

        if (providerName === 'Facebook') {
          return firebaseAuthInstance.$signInWithRedirect(provider);
        } else {
          return firebaseAuthInstance.$signInWithPopup(provider);
        }
      }
    };
  }])

  .factory('Dialogs', ['$mdDialog', 'Auth', function ($mdDialog, Auth) {
    return {
      showLoginDialog: function (event) {
        var dialogs = this;

        $mdDialog.show({
          controller: ['$scope', '$mdDialog', 'Auth', 'Database', function ($scope, $mdDialog, Auth, Database) {
            $scope.hide = function () {
              $mdDialog.hide();
            };

            $scope.login = function (providerName) {
              Auth.providerLogin(providerName).then(function (result) {
                ga('send', 'event', 'user', 'register');
                $mdDialog.hide();
                Database.getProfile(result.user.uid).then(function (userProfile) {
                  var profile = userProfile.val();
                  if (!profile || (profile && !profile.onboarding)) {
                    dialogs.showOnboardingDialog();
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
          }],
          templateUrl: './views/dialogs/loginDialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true
        })
          .then(function (answer) {
            //dialog validated
          }, function () {
            //dialog cancelled
          });
      },
      showOnboardingDialog: function (event) {
        $mdDialog.show({
          controller: ['$scope', '$mdDialog', 'Database', function ($scope, $mdDialog, Database) {
            $scope.onboard = function () {
              Database.saveProfile({
                name: $scope.onboarding.displayName,
                battletag: $scope.onboarding.battleTag,
                picture: Auth.getUser().photoURL,
                onboarding: true
              }, function () {
                ga('send', 'event', 'user', 'onboarding');
              });
              
              $mdDialog.hide();
            };
          }],
          templateUrl: './views/dialogs/onboardingDialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: false
        })
          .then(function (answer) {
            //dialog validated
          }, function () {
            //dialog cancelled
          });
      },
      showPostDialog: function (event) {
        if (Auth.getUser()) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', '$location', 'Utils', 'Youtube', 'Database', function ($scope, $mdDialog, $location, Utils, Youtube, Database) {
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

                        var newPost = Database.newPost(data);

                        if (newPost) {
                          ga('send', 'event', 'playof', 'post');
                          $location.path('/post/' + newPost);
                          Utils.showToast('Your play of the game has been posted');
                        } else {
                          Utils.showToast('Error, please try again later');
                        }

                        $mdDialog.hide();
                      } else {
                        $scope.invalidId = true;
                      }
                    }, function errorCallback(error) {
                      Utils.showToast('Error, please try again later');
                    });
                  } else {
                    $scope.invalidId = true;
                  }
                }
              };

              $scope.hide = function () {
                $mdDialog.hide();
              };
            }],
            templateUrl: './views/dialogs/postDialog.html',
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
          this.showLoginDialog();
        }
      }
    };
  }])

  .factory('Database', ['Auth', 'Utils', function (Auth, Utils) {
    var firebaseDatabaseInstance = firebase.database();

    return {
      getProfile: function (userId) {
        return firebaseDatabaseInstance.ref('profile/' + userId).once('value');
      },
      saveProfile: function (data, callback) {
        if (Auth.getUser()) {
          firebaseDatabaseInstance.ref('profile/' + Auth.getUser().uid).update(data, callback);
        }
      },
      newPost: function (data) {
        if (Auth.getUser()) {
          data.userId = Auth.getUser().uid;
          data.votesCount = 0;
          data.postedAt = firebase.database.ServerValue.TIMESTAMP;

          var newPost = firebaseDatabaseInstance.ref('posts').push();
          newPost.set(data).then(function (result) {
            //add to profile posts
            firebaseDatabaseInstance.ref('profile/' + Auth.getUser().uid + '/posts/' + newPost.key).set(true);
          });

          return newPost.key;
        }
      },
      vote: function (postId, alreadyVoted) {
        if (Auth.getUser()) {
          //fetch current counter
          return firebaseDatabaseInstance.ref('posts/' + postId + '/votesCount').once('value').then(function (currentCount) {
            var updates = {};

            if (alreadyVoted) {
              updates['posts/' + postId + '/votesCount'] = currentCount.val() - 1;
              updates['votes/' + postId + '/' + Auth.getUser().uid] = null;
            } else {
              updates['posts/' + postId + '/votesCount'] = currentCount.val() + 1;
              updates['votes/' + postId + '/' + Auth.getUser().uid] = firebase.database.ServerValue.TIMESTAMP;
            }

            return firebaseDatabaseInstance.ref().update(updates);
          });
        }
      },
      hasVote: function (postId) {
        if (Auth.getUser()) {
          return firebaseDatabaseInstance.ref('votes/' + postId + '/' + Auth.getUser().uid).once('value');
        }
      },
      getPlayofList: function (timeframe) {
        var postsRef = firebaseDatabaseInstance.ref('posts'),
        //start in past, end now (timestamp order is inverted)
          startTime = 0, endTime = moment().valueOf();

        if (timeframe === 'all') {
          return postsRef.orderByChild('votesCount').limitToLast(Utils.overallLimit);
        } else if (timeframe === 'day') {
          startTime = moment().subtract(1, 'days').valueOf();
        } else if (timeframe === 'week') {
          startTime = moment().subtract(7, 'days').valueOf();
        }

        return postsRef.orderByChild('postedAt').startAt(startTime).endAt(endTime);
      },
      getPlayof: function (playofId) {
        return firebaseDatabaseInstance.ref('posts/' + playofId).once('value');
      }
    };
  }]);
