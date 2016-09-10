var app;

(function(){
	app = angular.module('BaseApp', ['ngRoute']);

	app.controller('appController', function($scope){
		$scope.title = "Base App";
	});
})();