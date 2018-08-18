angular.module('homeMenu', ['ionic'])

  .factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

  .controller('homeMenuCtrl', function ($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

    // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

      //my rooms

    $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);
    task.title = "";
  };


    // quit app
    $scope.quitApp = function () {
      console.log("quit")
      ionic.Platform.exitApp();
    };

    $scope.toChatModal = function () {
      console.log("tochat modal")
      $scope.taskModal.show();
      document.getElementById('toChatDiv').style.display = 'block';
      document.getElementById('joinRoomDiv').style.display = 'none';
    }

     $scope.joinRoom = function () {
      console.log("joinRoom modal")
      $scope.taskModal.show();
      document.getElementById('toChatDiv').style.display = 'none';
      document.getElementById('joinRoomDiv').style.display = 'block';
    }

    $scope.toChat = function () {
      console.log("tochat")
      var room = Math.floor((Math.random() * 8999) + 999);
      createProject(room);
    }

    $scope.formPhoneNumber = function (name, phonenumber) {
      console.log("formPhoneNumber")
      console.log("name", name)
      console.log("phonenumber", phonenumber)
      var newProject = Projects.newProject(phonenumber);
      $scope.projects.push(newProject);
      Projects.save($scope.projects);

      //if validated
      $("#home").fadeOut()
      $("#accountCreated").fadeIn()

      //after 2 sec
      window.location = "/home.html"
    }
    $scope.checkHomeRedirect = function(){
      console.log("starting",$scope.projects.length)
      if ($scope.projects.length<1){
          console.log("redirect")
          window.location = "/signup.html"
      }
      else{
        document.getElementById("home").style.display="block";
        console.log(" no redirect")
      }
    }

    $scope.checkHomeRedirect();


    $scope.test = function(){
      $scope.projects.push("newProject");
      Projects.save($scope.projects);
      
      console.log($scope.projects);
    }

    $scope.test();

})

