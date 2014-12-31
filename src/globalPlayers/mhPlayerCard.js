angular.module('matchHubApp')
	.directive('mhPlayerCard', function() {
		return {
			restrict: 'EA',
			templateUrl: '_playerCard.html',
			scope: {
				player: '='
			},
			controller: function($scope, $modal){
				$scope.displayEdit = function(player){
					window.console.log('EDITING PLAYER: ' + JSON.stringify(player));
					$modal.open({
						templateUrl: 'globalPlayerEdit.html',
						controller: 'EditGlobalPlayerCtrl as editPlayerVm',
						resolve: {
							player: function(){
								return player;
							}
						}
					});

					return false;
				};
			}
		};
	});
