angular.module('matchHubApp')
	.controller('GlobalPlayersCtrl', function ($scope, $routeParams, $modal, FilterDataSvc, GlobalPlayersSvc) {
		var pageNum = 0,
			searchTerm = '';

		var getPlayers = function(){
			GlobalPlayersSvc.fetch(pageNum, searchTerm, FilterDataSvc.getActiveFilters()).then(function (response) {
				window.console.log('PLAYERS RESP: ' + JSON.stringify(response));
				$scope.teams = response.teams;
				$scope.disablePrevPage = pageNum === 0;
				$scope.disableNextPage = !GlobalPlayersSvc.areMorePagesAvailable();
			});
		};
		getPlayers();

		$scope.prevPage = function(){
			pageNum--;
			getPlayers(pageNum);
		};

		$scope.nextPage = function(){
			pageNum++;
			getPlayers(pageNum);
		};

		$scope.selectAllPlayers = function(){
			var newValue = !$scope.allPlayersSelected();

			$scope.players.forEach(function(match){
				match.isSelected = newValue;
			});
		};

		$scope.activatePlayerFilter = function(){
			$scope.areFiltersActive = !$scope.areFiltersActive;
		};

		$scope.$watch('search', function (searchStr) {
			if (searchStr === undefined) {
				return 0;
			}

			// Reset the paging and perform the search
			pageNum = 0;
			searchTerm = searchStr;
			getPlayers();
		});

		$scope.applyFilters = function(){
			getPlayers();
		};
	});
