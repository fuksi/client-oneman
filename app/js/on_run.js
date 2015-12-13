'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    $rootScope.pageTitle = 'Peace plz! ';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
    }
  });

}

module.exports = OnRun;