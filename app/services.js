'use strict';

angular.module('wnh.services', [])

    .factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
        var firebaseAuthInstance = $firebaseAuth(),
            firebaseUser = null;

        firebaseAuthInstance.$onAuthStateChanged(function (user) {
            firebaseUser = user;
        });

        return {
            getInstance: function () {
                return firebaseAuthInstance;
            },
            getUser: function () {
                return firebaseUser;
            },
            providerLogin: function (providerName) {
                var provider = new firebase.auth[providerName + 'AuthProvider']();
                return firebaseAuthInstance.$signInWithPopup(provider);
            }
        };
    }])

    .factory('Database', ['Auth', '$firebaseArray', function (Auth, $firebaseArray) {
        var firebaseDatabaseInstance = firebase.database();

        return {
            getProfile: function (userId) {
                var currentUserId = (Auth.getUser() && Auth.getUser().uid) || userId;

                if (currentUserId) {
                    return firebaseDatabaseInstance.ref('profile/' + currentUserId).once('value');
                }
            },
            saveProfile: function (data) {
                if (Auth.getUser()) {
                    firebaseDatabaseInstance.ref('profile/' + Auth.getUser().uid).update(data);
                }
            },
            newPost: function (data) {
                if (Auth.getUser()) {
                    data.userId = Auth.getUser().uid;
                    var newPost = firebaseDatabaseInstance.ref('posts').push();
                    newPost.set(data);
                    //add to profile posts
                    firebaseDatabaseInstance.ref('profile/' + Auth.getUser().uid + '/posts/' + newPost.key).set(true);
                }
            },
            vote: function (postId, alreadyVoted) {
                if (Auth.getUser()) {
                    return firebaseDatabaseInstance.ref('votes/' + postId + '/' + Auth.getUser().uid).set(alreadyVoted ? null : firebase.database.ServerValue.TIMESTAMP);
                }
            },
            hasVote: function (postId) {
                if (Auth.getUser()) {
                    return firebaseDatabaseInstance.ref('votes/' + postId + '/' + Auth.getUser().uid).once('value');
                }
            },
            getPlayof: function (filters) {
                //TODO filter
                //TODO get voted or not (add to item)
                return $firebaseArray(firebaseDatabaseInstance.ref('posts'));
            }
        };
    }]);
