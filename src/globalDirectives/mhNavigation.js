angular.module('matchHubApp')
	.directive('mhNavigation', function() {
		return {
			restrict: 'E',
			templateUrl: '_navigation.html',
			scope: {
				isAdmin: '='
			}
		};
	});
