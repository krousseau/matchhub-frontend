angular.module('matchHubApp')
	.controller('BulkEditGlobalMatchesCtrl', function ($scope, $modalInstance, $filter, GlobalMatchesSvc, FilterDataSvc, matches) {
		window.console.log('MATCHES: ' + JSON.stringify(matches));

		// this.match = match;
		// this.match.time = match.localDateTime;
		// this.match.day = $filter('date')(this.match.localDateTime, 'MM/dd/yyyy');
		// $scope.today = new Date();
		// $scope.datepickerState = {
		// 	isOpen: false
		// };

		$scope.venues = FilterDataSvc.getVenueFilterData();
		// $scope.venues.forEach(function(venue){
		// 	if(venue.venueId === match.venue){
		// 		$scope.matchVenue = venue;
		// 	}
		// });

		$scope.officials = FilterDataSvc.getOfficialsFilterData();

		// var numOfficials = match.officials.length;
		// for(var i = 0; i < numOfficials; i++){
		// 	this.match['official' + i] = match.officials[i];
		// }

		// $scope.open = function($event) {
		// 	$event.preventDefault();
		// 	$event.stopPropagation();

		// 	$scope.datepickerState.isOpen = true;
		// };

		this.save = function() {
			var matchIds = matches.map(function(match){
				return match.id;
			});

			var savedMatch = {
				matchIds: JSON.stringify(matchIds),
				matchVenue: this.matchVenue ? this.matchVenue.id : null,
				postpone: this.postpone,
				leagueId: matches[0].league,
				seasonId: matches[0].season,
				'official_0': this.official0,
				'official_1': this.official1,
				'official_2': this.official2
			};
			window.console.log('SAVING MATCHES: ' + JSON.stringify(savedMatch));
			GlobalMatchesSvc.saveMatches(savedMatch)
				.then(function(resp){
					window.console.log(JSON.stringify(resp));
					if(resp.data.status !== 'error'){
						$modalInstance.close();
					}
				});
		};

		this.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	});
