'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function StudentCtrl($http, AppSettings, SearchService) {
  var vm = this;

/*    SearchService.simpleQuery("all", ["student"])
    .then(function(rows) {
        vm.rows = rows;
        console.log(rows);
      },
      function() {
        console.log('Data retrieval failed.');
      });

    SearchService.simpleQuery("single", ["courseTotalAttendance", 10986])
    .then(function(rows) {
        vm.rows = rows;
        console.log(rows);
      },
      function() {
        console.log('Data retrieval failed.');
      });
*/
SearchService.adhocQuery("noCondition", ["numberOfCoursePerStudent"])
    .then(function(rows) {
        vm.rows = rows;
        console.log(rows);
      },
      function() {
        console.log('Data retrieval failed.');
      });
}

controllersModule.controller('StudentCtrl', StudentCtrl);