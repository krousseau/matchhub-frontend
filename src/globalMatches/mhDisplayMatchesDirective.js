angular.module('matchHubApp')
	.directive('mhDisplayMatches', function($filter) {
        var convertUtcDateToLocalDate = function(timestamp) {
			var startDateUTC = new Date(timestamp);
			var startDateLocal = new Date(startDateUTC.getTime());

			startDateLocal.setFullYear(startDateUTC.getUTCFullYear());
			startDateLocal.setMonth(startDateUTC.getUTCMonth());
			startDateLocal.setDate(startDateUTC.getUTCDate());
			startDateLocal.setHours(startDateUTC.getUTCHours());
			startDateLocal.setMinutes(startDateUTC.getUTCMinutes());

			return startDateLocal;
        };

		return {
			restrict: 'EA',
			templateUrl: '_matches.html',

			controller: function($scope) {//, element, attrs){
				$scope.isPostponed = function(match){
					return match.status === 'postponed';
				};

				// Watch the matches collection so that we can group them when it changes
				$scope.$watchCollection('matches', function (matches) {
					if(matches === undefined){
						return;
					}

					$scope.groupedMatches = {};
					var groupedMatches = {};
					matches.forEach(function(match){
						var localDateTime = convertUtcDateToLocalDate(match.date);
						var formattedDate = $filter('date')(localDateTime, 'yyyy-MM-dd');
						match.formattedTime = $filter('date')(localDateTime, 'h:mm a');
						match.localDateTime = localDateTime;

						if(match.officials.length) {
							match.officialsDisplay = match.officials.map(function(official) { return official.email; }).join(', ');
						}

						// If we don't have an entry for the date, create one
						if(!groupedMatches.hasOwnProperty(formattedDate)){
							groupedMatches[formattedDate] = {};
						}

						// If we don't have an entry for the league on the date then create one
						var league = match.leagueName;
						if(!groupedMatches[formattedDate].hasOwnProperty(league)){
							groupedMatches[formattedDate][league] = [];
						}

						groupedMatches[formattedDate][league].push(match);
					});
					$scope.groupedMatches = groupedMatches;
				});
			}
		};
	});
