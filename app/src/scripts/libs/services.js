angular.module('wnh.services', [])
  .factory('Utils', ['$mdToast', function ($mdToast) {
    return {
      heroesList: {
        'ana': {id: 'ana', name: 'Ana'},
        'bastion': {id: 'bastion', name: 'Bastion'},
        'dva': {id: 'dva', name: 'D.VA'},
        'genji': {id: 'genji', name: 'Genji'},
        'hanzo': {id: 'hanzo', name: 'Hanzo'},
        'junkrat': {id: 'junkrat', name: 'Junkrat'},
        'lucio': {id: 'lucio', name: 'Lúcio'},
        'mccree': {id: 'mccree', name: 'Mccree'},
        'mei': {id: 'mei', name: 'Mei'},
        'mercy': {id: 'mercy', name: 'Mercy'},
        'pharah': {id: 'pharah', name: 'Pharah'},
        'reaper': {id: 'reaper', name: 'Reaper'},
        'reinhardt': {id: 'reinhardt', name: 'Reinhardt'},
        'roadhog': {id: 'roadhog', name: 'Roadhog'},
        'soldier76': {id: 'soldier76', name: 'Soldier: 76'},
        'sombra': {id: 'sombra', name: 'Sombra'},
        'symmetra': {id: 'symmetra', name: 'Symmetra'},
        'torbjorn': {id: 'torbjorn', name: 'Torbjörn'},
        'tracer': {id: 'tracer', name: 'Tracer'},
        'widowmaker': {id: 'widowmaker', name: 'Widowmaker'},
        'winston': {id: 'winston', name: 'Winston'},
        'zarya': {id: 'zarya', name: 'Zarya'},
        'zenyatta': {id: 'zenyatta', name: 'Zenyatta'}
      },
      timeframesList: [
        {filter: 'week', title: '7 days', icon: 'view_week'},
        {filter: 'day', title: 'Last day', icon: 'view_day'},
        {filter: 'all', title: 'Overall', icon: 'history'}
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

  .factory('Header', ['$window', function ($window) {
    return {
      setTitle: function (title) {
        $window.document.title = title;
      },
      setMeta: function (meta, description) {
        $window.document.querySelector('meta[name="' + meta + '"]').setAttribute('content', description);
      }
    };
  }])

  .factory('DataFilters', ['$rootScope', function ($rootScope) {
    var currentTimeframe = 'all', currentHero = '';

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

  .factory('Dialogs', ['$mdDialog', '$q', 'Auth', 'Database', function ($mdDialog, $q, Auth, Database) {
    return {
      showLoginDialog: function () {
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
                    dialogs.showProfileDialog(true);
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
      showProfileDialog: function (onboarding) {
        var clickOutsideToClose = true,
          promisesArray = [];

        if (onboarding) {
          clickOutsideToClose = false;
        } else {
          promisesArray.push(Database.getProfile(Auth.getUser().uid));
        }

        $q.all(promisesArray).then(function (promisesResultsArray) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', 'Database', function ($scope, $mdDialog, Database) {
              if (promisesResultsArray.length) {
                $scope.profile = {
                  displayName: promisesResultsArray[0].val().name || '',
                  battleTag: promisesResultsArray[0].val().battletag || ''
                };
              }

              if (onboarding) {
                $scope.title = 'Complete your profile';
              } else {
                $scope.title = 'Edit your profile';
              }

              $scope.save = function () {
                Database.saveProfile({
                  name: $scope.profile.displayName,
                  battletag: $scope.profile.battleTag,
                  picture: Auth.getUser().photoURL,
                  onboarding: true
                }, function () {
                  ga('send', 'event', 'user', 'onboarding');
                });

                $mdDialog.hide();
              };
            }],
            templateUrl: './views/dialogs/profileDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: clickOutsideToClose
          })
            .then(function (answer) {
              //dialog validated
            }, function () {
              //dialog cancelled
            });
        });
      },
      showPostDialog: function (edit, playof) {
        if (Auth.getUser()) {
          $mdDialog.show({
            controller: ['$scope', '$mdDialog', '$location', 'Utils', 'Youtube', 'Database', function ($scope, $mdDialog, $location, Utils, Youtube, Database) {
              $scope.edit = edit;
              $scope.heroesList = Utils.heroesList;
              $scope.invalidId = false;
              $scope.post = {
                videoLink: '',
                hero: (playof && playof.hero) || '',
                description: (playof && playof.description) || ''
              };

              $scope.videoLinkChange = function () {
                $scope.invalidId = false;
              };

              $scope.save = function () {
                if ($scope.post.hero) {
                  var data = {hero: $scope.post.hero};
                  if ($scope.post.description) {
                    data.description = $scope.post.description;
                  }

                  Database.updatePost(playof.key, data).then(function () {
                    playof.hero = data.hero;
                    playof.description = data.description || '';
                    ga('send', 'event', 'playof', 'edit_post');
                    $mdDialog.hide();
                    Utils.showToast('Modifications saved');
                  }).catch(function (error) {
                    Utils.showToast('Error, please try again later');
                  });

                }
              };

              $scope.newPost = function () {
                if ($scope.post.videoLink && $scope.post.hero) {
                  var regex = $scope.post.videoLink.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i), videoId = null;
                  if (regex && regex[1].length === 11) {
                    videoId = regex[1];
                  } else {
                    videoId = $scope.post.videoLink;
                  }

                  if (videoId && videoId.length === 11) {
                    //check if valid id with YT API
                    Youtube.getVideoInfo(videoId).then(function successCallback(response) {
                      if (response.data.items.length) {
                        var data = {youtubeId: videoId, hero: $scope.post.hero};
                        if ($scope.post.description) {
                          data.description = $scope.post.description;
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
      updatePost: function (key, data) {
        if (Auth.getUser()) {
          return firebaseDatabaseInstance.ref('posts/' + key).update(data);
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
