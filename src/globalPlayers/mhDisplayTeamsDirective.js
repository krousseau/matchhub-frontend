angular.module('matchHubApp')
	.directive('mhDisplayTeams', function() {
		return {
			restrict: 'EA',
			templateUrl: '_teams.html'
		};
	});
