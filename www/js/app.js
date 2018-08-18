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
      window.localStorage.setItem('phoneNumber',phonenumber)
      window.localStorage.setItem('username',name)
      //if validated
      $("#home").fadeOut()
      $("#accountCreated").fadeIn()

      //after 2 sec
      window.location = "/home.html"
    }
    $scope.checkHomeRedirect = function(){
      console.log("starting",localStorage.getItem('phoneNumber'))
      if (localStorage.getItem('phoneNumber')==null){
          console.log("redirect")
          window.location = "/signup.html"
      }
      else{
        document.getElementById("home").style.display="block";
        console.log(" no redirect")
      }
    }

    $scope.test = function(){
      //window.localStorage.setItem("number", JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 }));
      var retrievedObject = localStorage.getItem('number');

      console.log(localStorage.getItem('number'))

      console.log(JSON.parse(retrievedObject).one)
      console.log($scope.projects);
    }

    $scope.test();

    //leaderboard

    var leaderboardStorage = {
      "people": [{
          "name": "John",
          "level": "12"
        },
        {
          "name": "Anna",
          "level": "3"
        },
        {
          "name": "Peter",
          "level": "23"
        }
      ]
    }

      window.localStorage.setItem("leaderboardStorage", JSON.stringify(leaderboardStorage));

 })

