angular.module('homeMenu', ['ionic'])

  .controller('homeMenuCtrl', function ($scope) {


    // quit app
    $scope.quitApp = function () {
      console.log("quit")
      ionic.Platform.exitApp();
    };

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
      window.localStorage.setItem("number", JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 }));
      var retrievedObject = localStorage.getItem('number');

      console.log(JSON.parse(retrievedObject).one)
      console.log($scope.projects);
    }

    $scope.test();


 })

