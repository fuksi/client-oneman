'use strict';

var controllersModule = require('./_index');

function TeacherCtrl($scope, $http, AppSettings, SearchService, ChartService) {
	var vm = this;

	/*
	 * At init, populate input with all courses
	 */
  	SearchService.simpleQuery("all", ["fullListTeachersAndCourses"])
	.then(function(result) {
    	vm.teachersAndCourses = result;
    }, function() {});

	/*
	 * Case : Show from a course all the students' attendance, their no of courses taking at the same time, their grade
	 * Data needed:
	 *   - students id from a course as labels
	 *   - their grade of that courses
	 *   - no of courses they're taking
	 */

	function createPerformanceChartByCourse(course_id) {
		SearchService.simpleQuery("single", ["courseParticipantList", course_id])
		.then(function(studentList) {
			// Constucting labels
			var labels = [];
			studentList.forEach(function(el) {
				labels.push(el.student_id);
			});
			// Getting grades of these student
			SearchService.adhocQuery("withCondition", ["singleCourseGradeAllStudents", course_id])
			.then(function(gradesObj) {
				// Constructing firstDataSource
				var firstDataSource = [];
				gradesObj.forEach(function(el) {
					if (el.grade === 6) { el.grade = 1;}
					firstDataSource.push(el.grade);
				});
				// Get number of courses these student are taking
				console.log(labels);
				SearchService.adhocQuery("withCondition", ["numberOfCoursePerStudentLimited", orConditionConstructor(labels, "e.student_id")]).
				then(function(noOfCourses) {
					// Construct secondDataSource
					var secondDataSource = [];
					noOfCourses.forEach(function(el) {
						secondDataSource.push(el.count);
					});
					// Get grade for all students
					SearchService.adhocQuery("withCondition", ["singleCourseAttendanceAllStudents", course_id])
					.then(function(attendance) {
						// Constructing thirdDataSource
						var thirdDataSource = [];
						attendance.forEach(function(el) {
							thirdDataSource.push(el.count);
						});
						// We got all the data needed, let's construct the chart
						ChartService.populateAttendanceChart('.teacher-chart-container', 5000, labels, thirdDataSource, firstDataSource, secondDataSource);
					}, function() {});
				}, function() {});
			}, function() {});
		}, function() {});
	}

    // Watch select input to change chart as student change
    $scope.$watch("selectedCourse", function(newVal) {
        if (newVal !== undefined) { // At page init this event will also be triggered
            createPerformanceChartByCourse(newVal);
        }
    });

    /*
     * Helper function to generate params for query
     */
    function orConditionConstructor(elements, delimiter) {
        var temp = elements.slice();
        temp.forEach(function(el,i,arr) {
            arr[i] = delimiter + " = " + arr[i];
        });
        return temp.join(" OR ");
    }
}

controllersModule.controller('TeacherCtrl', TeacherCtrl);