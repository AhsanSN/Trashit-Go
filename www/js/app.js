angular.module('homeMenu', ['ionic'])

  .controller('homeMenuCtrl', function ($scope) {



    // quit app
    $scope.quitApp = function () {
      console.log("quit")
      ionic.Platform.exitApp();
    };

    //signup
    $scope.formPhoneNumber = function (name, phonenumber) {

      var aboutMeStorage = {
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
    $scope.aboutMeStorage = aboutMeStorage

    window.localStorage.setItem("aboutMeStorage", JSON.stringify(aboutMeStorage));

      console.log("formPhoneNumber")
      console.log("name", name)
      console.log("phonenumber", phonenumber)

      //after auth
      var retrievedAboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
      retrievedAboutMeStorage.phoneNumber = phonenumber;
      retrievedAboutMeStorage.name = name;
      console.log("edited value",retrievedAboutMeStorage)
      window.localStorage.setItem("aboutMeStorage", JSON.stringify(retrievedAboutMeStorage))

      //if validated
      $("#home").fadeOut()
      $("#accountCreated").fadeIn()

      //after 2 sec
      //window.location = "/index.html"
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
      window.localStorage.setItem("number", JSON.stringify({ 'one': 1, 'two': 2, 'three': 3 }));
      var retrievedObject = localStorage.getItem('number');

      console.log(localStorage.getItem('number'))
      console.log("changing")

      var a = JSON.parse(retrievedObject)
      a.one = 742
      console.log("a",a)
      window.localStorage.setItem("number", JSON.stringify(a))
      console.log(localStorage.getItem('number'));
    }

    //$scope.test();

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

