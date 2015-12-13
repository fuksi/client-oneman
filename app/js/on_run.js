'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    $rootScope.pageTitle = 'Jeez, just one man';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
    }
  });

}

module.exports = OnRun;