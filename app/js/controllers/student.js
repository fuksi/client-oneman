'use strict';
/* global Chart */
/* global angular */
var controllersModule = require('./_index');

/**
 * @ngInject
 */
function StudentCtrl($scope, $http, AppSettings, SearchService) {
  var vm = this;
  $scope.selectedStudentName = "Andrea Morris";

    /*
     * At init, populate select input with list of students
     */
    SearchService.simpleQuery("all", ["student"])
    .then(function(rows) {
        vm.allStudents = rows;
    }, function() {});


    /*
     * Case 1: Show a student's attendance comparing to course's occurences
     * Data needed: student attendance per course; related course no of occurences
     */
    function createAttendanceChartByStudent(student_id) {
        SearchService.adhocQuery("withCondition", ["attendanceSingleStudent", student_id])
        .then(function(attendance) {
            vm.attendance = attendance;
            // Construct first data source - attendace count
            var firstDataSource = [];
            attendance.forEach(function(el) {
                firstDataSource.push(el.count);
            });
            // Get list of courses
            var courses = [];
            var labels = [];
            attendance.forEach(function(el) { courses.push(el.course_id); labels.push(el.name); });
            // Get occurences
            SearchService.adhocQuery("withCondition", ["multipleCourseTotalOccurent", orConditionConstructor(courses, "course_id")])
            .then(function(courseOccurences) {
                vm.courseOccurences = courseOccurences;
                // Get second data soucre - occurence count
                var secondDataSource = [];
                courseOccurences.forEach(function(el) {
                    secondDataSource.push(el.count);
                });
                // When got all data needed, construct chart
                vm.populateAttendanceChart(labels, firstDataSource, secondDataSource);
            }, function() {}); 
        }, function() {});
    }

    // Init with 125352 by default
    createAttendanceChartByStudent(102007);
    // Watch select input to change chart as student change
    $scope.$watch("selectedStudent", function(newVal) {
        $scope.selectedStudentName = angular.element(angular.element("#selectStudent option:selected")[0]).text().split(" ").slice(1).join(" ");
        createAttendanceChartByStudent(newVal);
    });



    /*
     * Helper function to populate chart
     */
    vm.populateAttendanceChart = function(labelSource, firstDataSource, secondDataSource) {
        console.log(labelSource);
        console.log(firstDataSource);
        console.log(secondDataSource);
        var data = {
            labels: labelSource,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: firstDataSource
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: secondDataSource
                }
            ]
        };

        // Create chart
        if (angular.element('#myChart')) {
            angular.element('#myChart').remove();
        }
        angular.element('.student-chart-container').append('<canvas id="myChart" width="1000" height="700"></canvas>');
        var ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx).Bar(data, {});
    };
    
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