angular.module('homeMenu', ['ionic'])

.controller('homeMenuCtrl', function($scope) {

    $scope.aboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
    $scope.leaderboardStorage = JSON.parse(localStorage.getItem('leaderboardStorage'));
    $scope.storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    $scope.payoutStorage = JSON.parse(localStorage.getItem('payoutStorage'));

    // quit app
    $scope.quitApp = function() {
        console.log("quit")
        ionic.Platform.exitApp();
    };

    //signup
    $scope.formPhoneNumber = function(name, phonenumber) {

        //auth here (above this)

        var aboutMeStorage = {
            "name": "User",
            "phoneNumber": "0000",
            "level": 1,
            "points": 135,
            "products": {
                "seedbombs": [{
                    "name": "apple",
                    "quantity": 0,
                    "imageUrl": "www.google.com"
                }, {
                    "name": "mango",
                    "quantity": 0,
                    "imageUrl": "www.google.com"
                }, {
                    "name": "banana",
                    "quantity": 0,
                    "imageUrl": "www.google.com"
                }, {
                    "name": "peach",
                    "quantity": 0,
                    "imageUrl": "www.google.com"
                }]
            }
        }
        $scope.aboutMeStorage = aboutMeStorage

        window.localStorage.setItem("aboutMeStorage", JSON.stringify(aboutMeStorage));

        var payoutStorage = {
            "payouts": [{
                "head": "Get to level 5",
                "about": "Earn 2 seed bombs."
            }, {
                "head": "Get to level 8",
                "about": "Earn 3 seed bombs."
            }, {
                "name": "Get to level 12",
                "about": "Earn 5 seed bombs."
            }]
        }

        $scope.payoutStorage = payoutStorage;

        window.localStorage.setItem("payoutStorage", JSON.stringify(payoutStorage));

        //store

        var storeStorage = {
            "products": [{
                "name": "apple",
                "about": "very good",
                "points": "12"
            }, {
                "name": "mango",
                "about": "too awesome",
                "points": "312"
            }, {
                "name": "banana",
                "about": "yummy",
                "points": "74"
            }]
        }

        $scope.storeStorage = storeStorage;

        window.localStorage.setItem("storeStorage", JSON.stringify(storeStorage));

        //leaderboard

        var leaderboardStorage = {
            "people": [{
                "name": "John",
                "level": "12"
            }, {
                "name": "Anna",
                "level": "3"
            }, {
                "name": "Peter",
                "level": "23"
            }]
        }

        $scope.leaderboardStorage = leaderboardStorage

        window.localStorage.setItem("leaderboardStorage", JSON.stringify(leaderboardStorage));

        console.log("formPhoneNumber")
        console.log("name", name)
        console.log("phonenumber", phonenumber)

        //after auth
        var retrievedAboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
        retrievedAboutMeStorage.phoneNumber = phonenumber;
        retrievedAboutMeStorage.name = name;
        console.log("edited value", retrievedAboutMeStorage)
        window.localStorage.setItem("aboutMeStorage", JSON.stringify(retrievedAboutMeStorage))

        //if validated
        $("#home").fadeOut()
        $("#accountCreated").fadeIn()

        //after 2 sec
        //window.location = "/index.html"
    }
    $scope.checkHomeRedirect = function() {
        var retrievedAboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
        if (retrievedAboutMeStorage.name == "User") {
            console.log("redirect")
            window.location = "/signup.html"
        } else {
            document.getElementById("home").style.display = "block";
            console.log(" no redirect")
        }
    }

    $scope.test = function() {
        window.localStorage.setItem("number", JSON.stringify({
            'one': 1,
            'two': 2,
            'three': 3
        }));
        var retrievedObject = localStorage.getItem('number');

        console.log(localStorage.getItem('number'))
        console.log("changing")

        var a = JSON.parse(retrievedObject)
        a.one = 742
        console.log("a", a)
        window.localStorage.setItem("number", JSON.stringify(a))
        console.log(localStorage.getItem('number'));
    }

    //$scope.test();

    $scope.getPerc = function() {
        return ($scope.aboutMeStorage.points % 100)
    }

    $scope.getLevel = function() {
        return ($scope.aboutMeStorage.level)
    }

})