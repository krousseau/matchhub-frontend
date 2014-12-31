angular.module('matchHubApp')
	.controller('EditGlobalPlayerCtrl', function ($scope, $modalInstance, $filter, GlobalPlayersSvc, player) {
		this.player = player;
		this.today = new Date();
		this.datepickerState = {
			isOpen: false
		};

		this.save = function() {
			window.console.log(JSON.stringify(this.player));
			$modalInstance.close();
			// GlobalPlayersSvc.savePlayer(savedMatch)
			// 	.then(function(resp){
			// 		window.console.log(JSON.stringify(resp));
			// 		if(resp.data.status !== 'error'){
			// 			$modalInstance.close();
			// 		}
			// 	});
		};

		this.cancel = function() {
			$modalInstance.dismiss('cancel');
		};


		this.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			this.datepickerState.isOpen = true;
		};
	});
