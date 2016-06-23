'use strict';

angular.module('wnh.filters', ['wnh.services'])
    .filter('heroName', ['Utils', function (Utils) {
        return function (heroCode) {
            return Utils.heroesList[heroCode] && Utils.heroesList[heroCode].name;
        };
    }]);