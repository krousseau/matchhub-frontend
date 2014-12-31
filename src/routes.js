angular.module('matchHubApp')
.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider
		.when('/globalmatches', {controller: 'GlobalMatchesCtrl', controllerAs:'matchVm', templateUrl: 'globalmatches.html'})
		.when('/globalplayers', {controller: 'GlobalPlayersCtrl', controllerAs:'playersVm', templateUrl: 'globalplayers.html'})
		.otherwise({
			redirectTo: '/globalmatches'
		});
});
