'use strict';

var controllersModule = require('./_index');

function TeacherCtrl($http, AppSettings, SearchService) {
	var vm = this;
  	SearchService.simpleQuery("all", ["student"])
    	.then(function(rows) {
        	vm.rows = rows;
        	console.log(rows);
        },
        function() {
        	console.log('statuses retrieval failed.');
        });
}

controllersModule.controller('TeacherCtrl', TeacherCtrl);