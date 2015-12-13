'use strict';
/* global Chart */
/* global angular */
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function StudentCtrl($scope, $http, AppSettings, SearchService, ChartService) {
  var vm = this;

    /*
     * At init, populate select input with list of students
     */
    SearchService.simpleQuery("all", ["student"])
    .then(function(rows) {
        vm.allStudents = rows;
    }, function() {});


    /*
     * Case : Show a student's attendance comparing to course's occurences
     * Data needed: 
     *  - student attendance per course
     *  - related course no of occurences
     *  - grades
     */
    function createAttendanceChartByStudent(student_id) {
        SearchService.adhocQuery("withCondition", ["attendanceSingleStudent", student_id])
        .then(function(attendance) {
            // Construct first data source - attendace count
            var firstDataSource = [];
            attendance.forEach(function(el) { firstDataSource.push(el.count); });
            // Get list of courses
            var courses = [];
            var labels = [];
            attendance.forEach(function(el) { courses.push(el.course_id); labels.push(el.name); });
            // Get occurences
            SearchService.adhocQuery("withCondition", ["multipleCourseTotalOccurent", orConditionConstructor(courses, "course_id")])
            .then(function(courseOccurences) {
                // Get second data soucre - occurence count
                var secondDataSource = [];
                courseOccurences.forEach(function(el) { secondDataSource.push(el.count); });
                // Get third data source - grades
                SearchService.adhocQuery("withCondition", ["courseResultSingleStudent", student_id])
                .then(function(grades) {
                    // Get second data soucre - occurence count
                    console.log(grades);
                    var thirdDataSource = [];
                    grades.forEach(function(el) { 
                        if (el.grade === 6) { el.grade = 1; }
                        thirdDataSource.push(el.grade); 
                    });
                    // When got all data needed, construct chart
                    ChartService.populateAttendanceChart('.student-chart-container',1000, labels, firstDataSource, secondDataSource, thirdDataSource);
                }, function() {}); 
                // When got all data needed, construct chart
            }, function() {}); 
        }, function() {});
    }

    // Watch select input to change chart as student change
    $scope.$watch("selectedStudent", function(newVal) {
        if (newVal !== undefined) { // At page init this event will also be triggered
            $scope.selectedStudentName = angular.element(angular.element("#selectStudent option:selected")[0]).text().split(" ").slice(1).join(" ");
            createAttendanceChartByStudent(newVal);
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

controllersModule.controller('StudentCtrl', StudentCtrl);