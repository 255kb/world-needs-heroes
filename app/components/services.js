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
            }
        };
    }])
    
    .factory('Database', ['Auth', '$firebaseArray', function (Auth, $firebaseArray) {
        var firebaseDatabaseInstance = firebase.database();
        
        return {
            newPost: function (data) {
                if (Auth.getUser()) {
                    data.author = {uid: Auth.getUser().uid};
                    firebaseDatabaseInstance.ref('posts').push().set(data);                    
                }
            },
            newVote: function (postId) {
                if (Auth.getUser()) {
                    return firebase.database().ref('votes/' + postId + '/' + Auth.getUser().uid).set(firebase.database.ServerValue.TIMESTAMP);
                }
            },
            getPlayof: function (filter) {
                //TODO filter
                return $firebaseArray(firebaseDatabaseInstance.ref('posts'));
            }
        };
    }]);
