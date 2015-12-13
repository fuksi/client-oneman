

'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function ChartService() {

  var service = {};

  /*
   * Helper function to populate chart
   */
  service.populateAttendanceChart = function(container, width, labelSource, firstDataSource, secondDataSource, thirdDataSource) {
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
              },
              {
                  label: "My Third dataset",
                  fillColor: "rgba(191,71,111,0.5)",
                  strokeColor: "rgba(191,71,111,0.8)",
                  highlightFill: "rgba(191,71,111,0.75)",
                  highlightStroke: "rgba(191,71,111,1)",
                  data: thirdDataSource
              }
          ]
      };

      // Create chart
      if (angular.element('#myChart')) {
          angular.element('#myChart').remove();
      }
      angular.element(container).append('<canvas id="myChart" width="' + width + '" height="700"></canvas>');
      var ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx).Bar(data, {});
  };

  return service;

}

servicesModule.service('ChartService', ChartService);