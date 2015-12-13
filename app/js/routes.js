'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'StudentCtrl as student',
    templateUrl: 'student.html',
    title: 'Student'
  })
  .state('Teacher', {
    url: '/teacher',
    controller: 'TeacherCtrl as teacher',
    templateUrl: 'teacher.html',
    title: 'Teacher'
  });

  $urlRouterProvider.otherwise('/');

  cfpLoadingBarProvider.includeBar = false;
}

module.exports = Routes;