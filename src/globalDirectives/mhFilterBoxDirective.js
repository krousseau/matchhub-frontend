angular.module('matchHubApp')
	.directive('mhFilterBox', function() {//$filter) {
		return {
			restrict: 'EA',
			templateUrl: '_filters.html',
			scope: {
				areFiltersActive: '=',
				apply: '&'
			},
			controller: function($scope, FilterDataSvc){
				$scope.leagues = FilterDataSvc.getLeagueFilterData();
				$scope.statuses = {};

				$scope.applyFilters = function(){
					var leagueIds = [],
						seasonIds = [];
					$scope.leagues.forEach(function(league) {
						if(league.isSelected){
							leagueIds.push(league.id);
						}
						league.seasons.forEach(function(season){
							if(season.isSelected){
								seasonIds.push(season.id);
							}
						});
					});
					FilterDataSvc.setFilters(leagueIds, seasonIds, $scope.statuses);
					$scope.areFiltersActive = false;
					$scope.apply();
				};
				$scope.cancelFilter = function(){
					$scope.areFiltersActive = false;
				};
			}
		};
	});
