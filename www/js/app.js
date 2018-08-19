angular.module('homeMenu', ['ionic'])

  .controller('homeMenuCtrl', function ($scope) {



    // quit app
    $scope.quitApp = function () {
      console.log("quit")
      ionic.Platform.exitApp();
    };

    //signup
    $scope.formPhoneNumber = function (name, phonenumber) {

      $scope.aboutMeStorage = {
      "name": "User",
      "phoneNumber": "0000",
      "level": 1,
      "points": 100,
      "products": {
        "seadbombs": [{
          "apple": {
            "quantity": 0,
            "imageUrl": "www.google.com"
          },
          "mango": {
            "quantity": 0,
            "imageUrl": "www.google.com"
          },
          "banana": {
            "quantity": 0,
            "imageUrl": "www.google.com"
          },
          "peach": {
            "quantity": 0,
            "imageUrl": "www.google.com"
          }
        }]
      }
    }
    window.localStorage.setItem("aboutMeStorage", JSON.stringify(aboutMeStorage));

      console.log("formPhoneNumber")
      console.log("name", name)
      console.log("phonenumber", phonenumber)

      var retrievedAboutMeStorage = localStorage.getItem('aboutMeStorage');
      console.log(JSON.parse(retrievedObject).one)


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

    $scope.leaderboardStorage = leaderboardStorage

      window.localStorage.setItem("leaderboardStorage", JSON.stringify(leaderboardStorage));

      //store


    var storeStorage = {
      "products": [{
          "name": "apple",
          "about": "very good",
          "points": "12"
        },
        {
          "name": "mango",
          "about": "too awesome",
          "points": "312"
        },
        {
          "name": "banana",
          "about": "yummy",
          "points": "74"
        }
      ]
    }

    $scope.storeStorage = storeStorage;

      window.localStorage.setItem("storeStorage", JSON.stringify(storeStorage));


    //payouts


    var payoutStorage = {
      "payouts": [{
          "head": "Get to level 5",
          "about": "Earn 2 seed bombs."
        },
        {
          "head": "Get to level 8",
          "about": "Earn 3 seed bombs."
        },
        {
          "name": "Get to level 12",
          "about": "Earn 5 seed bombs."
        }
      ]
    }

    $scope.payoutStorage = payoutStorage;

      window.localStorage.setItem("payoutStorage", JSON.stringify(payoutStorage));

 })

