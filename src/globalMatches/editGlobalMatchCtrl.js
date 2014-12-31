angular.module('matchHubApp')
	.controller('EditGlobalMatchCtrl', function ($scope, $modalInstance, $filter, GlobalMatchesSvc, FilterDataSvc, match) {
		this.match = match;
		this.match.time = match.localDateTime;
		this.match.day = $filter('date')(this.match.localDateTime, 'MM/dd/yyyy');
		$scope.today = new Date();
		$scope.datepickerState = {
			isOpen: false
		};

		$scope.venues = FilterDataSvc.getVenueFilterData();
		$scope.venues.forEach(function(venue){
			if(venue.venueId === match.venue){
				$scope.matchVenue = venue;
			}
		});

		$scope.officials = FilterDataSvc.getOfficialsFilterData();

		var numOfficials = match.officials.length;
		for(var i = 0; i < numOfficials; i++){
			this.match['official' + i] = match.officials[i].email;
		}

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.datepickerState.isOpen = true;
		};

		this.save = function() {
			var savedMatch = {
				matchId: this.match.id,
				matchVenue: this.match.venue,
				editTime: $filter('date')(this.match.time, 'shortTime'),
				matchDate: $filter('date')(this.match.day, 'MM/dd/yyyy'),
				postpone: this.match.status === 'postponed',
				'matchTeam_home': 'rank_' + this.match.homeRank,
				'matchTeam_away': 'rank_' + this.match.awayRank,
				leagueId: this.match.league,
				seasonId: this.match.season,
				'official_0': this.match.official0,
				'official_1': this.match.official1,
				'official_2': this.match.official2
			};
			GlobalMatchesSvc.saveMatch(savedMatch)
				.then(function(resp){
					window.console.log(JSON.stringify(resp));
					if(resp.data.status !== 'error'){
						$modalInstance.close(savedMatch);
					}
				});
		};

		this.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	});
