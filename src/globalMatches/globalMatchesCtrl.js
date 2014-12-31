angular.module('matchHubApp')
	.controller('GlobalMatchesCtrl', function ($scope, $routeParams, $modal, FilterDataSvc, GlobalMatchesSvc) {
		var pageNum = 0,
			searchTerm = '';

		var getMatches = function(){
			GlobalMatchesSvc.fetch(pageNum, searchTerm, FilterDataSvc.getActiveFilters()).then(function (response) {
				$scope.matches = response.result.matches;
				$scope.disablePrevPage = pageNum === 0;
				$scope.disableNextPage = !GlobalMatchesSvc.areMorePagesAvailable();
			});
		};
		getMatches();

		$scope.prevPage = function(){
			pageNum--;
			getMatches(pageNum);
		};

		$scope.nextPage = function(){
			pageNum++;
			getMatches(pageNum);
		};

		$scope.selectAllMatches = function(){
			var newValue = !$scope.allMatchesSelected();

			$scope.matches.forEach(function(match){
				match.isSelected = newValue;
			});
		};

		$scope.allMatchesSelected = function(){
			if(!$scope.matches){
				return false;
			}

			var allSelected = true;
			$scope.matches.forEach(function(match){
				if(!match.isSelected){
					allSelected = false;
					return;
				}
			});
			return allSelected;
		};

		this.numMatchesSelected = function(){
			if(!$scope.matches){
				return 0;
			}

			var numSelected = 0;
			$scope.matches.forEach(function(match){
				if(match.isSelected){
					numSelected++;
					return;
				}
			});
			return numSelected;
		};

		$scope.canBulkEdit = function(){
			if(!$scope.matches){
				return false;
			}

			var canEdit = false,
				seasonId = -1;
			$scope.matches.forEach(function(match){
				if(match.isSelected){
					canEdit = seasonId === -1 || seasonId === match.season;
					seasonId = match.season;
				}
			});
			return canEdit;
		};

		$scope.activateMatchFilter = function(){
			$scope.areFiltersActive = !$scope.areFiltersActive;
		};

		this.displayEdit = function(match){
			var editModal = $modal.open({
				templateUrl: 'globalMatchEdit.html',
				controller: 'EditGlobalMatchCtrl as editMatchVm',
				resolve: {
					match: function(){
						return match;
					}
				}
			});
			editModal.result.then(function (editedMatch) {
				window.console.log('MATCH: ' + JSON.stringify(editedMatch));
				getMatches();
			});

			return false;
		};

		this.postpone = function(match){
			window.console.log('postponing' + JSON.stringify(match));
		};

		$scope.displayBulkEdit = function(){
			$modal.open({
				templateUrl: 'globalMatchesBulkEdit.html',
				controller: 'BulkEditGlobalMatchesCtrl as editMatchesVm',
				resolve: {
					matches: function(){
						return $scope.matches.filter(function(match){
							if(match.isSelected){
								return true;
							}
						});
					}
				}
			});

			return false;
		};

		$scope.$watch('search', function (searchStr) {
			if (searchStr === undefined) {
				return 0;
			}

			// Reset the paging and perform the search
			pageNum = 0;
			searchTerm = searchStr;
			getMatches();
		});

		$scope.applyFilters = function(){
			getMatches();
		};
	});
