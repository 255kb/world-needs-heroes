'use strict';

angular.module('wnh.services', [])

    .factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
        var firebaseAuthInstance = $firebaseAuth(), 
            firebaseUser = null;

        firebaseAuthInstance.$onAuthStateChanged(function (user) {
            firebaseUser = user;
        });
        
        return {
            getUser: function () {
                return firebaseUser;
            }
        };
    }])
    
    .factory('Database', ['Auth', '$firebaseObject', function (Auth, $firebaseObject) {
        var firebaseDatabaseInstance = firebase.database();
        
        return {
            newPost: function (data) {
                if (Auth.getUser()) {
                    data.author = {uid: Auth.getUser().uid};
                    firebaseDatabaseInstance.ref('posts').push().set(data);                    
                }
            },
            getPlayof: function (filter) {
                //TODO filter
                return $firebaseObject(firebaseDatabaseInstance.ref('posts'));
            }
        };
    }]);
