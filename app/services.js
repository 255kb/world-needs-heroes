'use strict';

angular.module('wnh.services', [])
    .factory('Utils', [function () {
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
            itemsPerPage: 5,
            overallLimit: 300
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

    .factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
        var firebaseAuthInstance = $firebaseAuth(),
            firebaseUser = null;

        firebaseAuthInstance.$onAuthStateChanged(function (user) {
            firebaseUser = user;
        });

        return {
            getUser: function () {
                return firebaseUser;
            },
            providerLogin: function (providerName) {
                var provider = new firebase.auth[providerName + 'AuthProvider']();
                return firebaseAuthInstance.$signInWithPopup(provider);
            }
        };
    }])

    .factory('Database', ['Auth', 'Utils', function (Auth, Utils) {
        var firebaseDatabaseInstance = firebase.database();

        return {
            getProfile: function (userId) {
                return firebaseDatabaseInstance.ref('profile/' + userId).once('value');
            },
            saveProfile: function (data) {
                if (Auth.getUser()) {
                    firebaseDatabaseInstance.ref('profile/' + Auth.getUser().uid).update(data);
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
            getPlayof: function (timeframe) {
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
            }
        };
    }]);
