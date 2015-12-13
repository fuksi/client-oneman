'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SearchService($q, $http, AppSettings) {

  var service = {};

  function pathConstructor(type, paramsArray) {
    var result = type;
    paramsArray.forEach(function(el) { 
      result = result + "/" +  el; 
    });

    return result;
  }

  service.simpleQuery = function(type, paramsArray) {
    var deferred = $q.defer();
    var path = pathConstructor(type, paramsArray);

    $http.jsonp(AppSettings.apiUrl + "simple/" + path + '?callback=JSON_CALLBACK', {
    }).success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  service.adhocQuery = function(type, paramsArray) {
    var deferred = $q.defer();
    var path = pathConstructor(type, paramsArray);

    $http.jsonp(AppSettings.apiUrl + "adhoc/" + path + '?callback=JSON_CALLBACK', {
    }).success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  return service;



}

servicesModule.service('SearchService', SearchService);