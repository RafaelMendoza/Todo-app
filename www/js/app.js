// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todo-app', ['ionic', 'LocalStorageModule'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

app.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('todo-app');
});

app.controller('main', function ($scope, $ionicModal, localStorageService){

  var taskData = [ {content:'task', title: 'teste'}, {content:'task2', title: 'teste2'} ];
  localStorageService.set(taskData, taskData);

  $scope.tasks = [];

  $scope.task = {  };

  $ionicModal.fromTemplateUrl('templates/new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    // alert("Abrindo modal");
    $scope.newTaskModal = modal;
  });
  
  $scope.getTasks = function () {
    // alert("getting tasks");
    if(localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData);
      console.log($scope.tasks);
    } else {
      $scope.tasks = [];
    }
  }

  $scope.openTaskModal = function () {
    $scope.newTaskModal.show();
  }

  $scope.closeTaskModal = function () {
    $scope.newTaskModal.hide();
  }

  $scope.createTask = function () {
    // alert("creating task");
    console.log($scope.task);
    $scope.tasks.push($scope.task);
    localStorageService.set(taskData, $scope.task);
    $scope.task = {};

    $scope.newTaskModal.hide();
  }

  $scope.removeTask = function (index) {
    // alert("removing task");
    console.log($scope.tasks);
    $scope.tasks.splice(index,1);
    localStorageService.set(taskData, $scope.tasks);
  }

  $scope.completeTask = function (index) {
    // alert("completing task");
    if(index !== 1)
    {
      $scope.tasks[index].completed = true;
    }

    localStorageService.set(taskData, $scope.tasks);
  }

});