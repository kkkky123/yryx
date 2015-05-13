function Ctrl1($scope) {
  $scope.name = 'angular';
}
function Ctrl2($scope) {
	$scope.format = "M/d/yy h:mm:ss a";
    $scope.date = new Date();
}

//angular.module('time', [])
// Register the 'myCurrentTime' directive factory method.
// We inject $timeout and dateFilter service since the factory method is DI.
angular.module('time', []).directive('myCurrentTime', function($timeout, dateFilter) {
	// return the directive link function. (compile function not needed)
	return function(scope, element, attrs) {
		var format, // date format
			timeoutId; // timeoutId, so that we can cancel the time updates

		// used to update the UI
		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}

		// watch the expression, and update the UI on change.
		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});

		// schedule update in one second
		function updateLater() {
			// save the timeoutId for canceling
			timeoutId = $timeout(function() {
				updateTime(); // update DOM
				updateLater(); // schedule another update
			}, 1000);
		}

		// listen on DOM destroy (removal) event, and cancel the next UI update
		// to prevent updating time ofter the DOM element was removed.
		element.bind('$destroy', function() {
			$timeout.cancel(timeoutId);
		});

		updateLater(); // kick off the UI update process.
	}
});
