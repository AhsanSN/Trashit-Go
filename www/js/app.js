angular.module('homeMenu', ['ionic'])

.controller('homeMenuCtrl', function($scope) {

    $scope.aboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
    $scope.leaderboardStorage = JSON.parse(localStorage.getItem('leaderboardStorage'));
    $scope.storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    $scope.payoutStorage = JSON.parse(localStorage.getItem('payoutStorage'));
    $scope.visitingProfile = JSON.parse(localStorage.getItem('visitingProfile'));

    console.log("local st: ",$scope.leaderboardStorage)

    // quit app
    $scope.quitApp = function() {
        console.log("quit")
        ionic.Platform.exitApp();
    };

    //signup
    $scope.formPhoneNumber = function(name, phonenumber) {

        //auth here (above this)

        var aboutMeStorage = {
            "name":"User",
            "phoneNumber":"0000",
            "level":"1",
            "points":"135",
            "prod_apple":"0",
            "prod_mango":"0",
            "prod_banana":"0",
            "prod_peach":"0"
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

        // uploading user to global db
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", "https://game.anomoz.com/api/post/user_create.php");
        xmlhttp.send(JSON.stringify(retrievedAboutMeStorage));

        //if validated
        $("#home").fadeOut()
        $("#accountCreated").fadeIn()

        //after 2 sec
        window.location = "/index.html"
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
        $scope.getAllUsers();
    }

    $scope.getPerc = function() {
        return ($scope.aboutMeStorage.points % 100)
    }

    $scope.getLevel = function() {
        return ($scope.aboutMeStorage.level)
    }

    $scope.showAllUsers = function(jsonFile){
        console.log("received users: ", jsonFile)
        $scope.leaderboardStorage = jsonFile
        window.localStorage.setItem("leaderboardStorage",(jsonFile))
    }

    $scope.getAllUsers = function()
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            $scope.showAllUsers(xmlHttp.responseText)
        }
        xmlHttp.open("GET", "https://game.anomoz.com/api/post/user_read.php", true); // true for asynchronous 
        xmlHttp.send(null);
    }

    $scope.visitProfile = function(profileId){
        console.log("visiting profile: ", profileId )

        for (var i=0; i < $scope.leaderboardStorage.length; i++) {
            console.log("a")
            if ($scope.leaderboardStorage[i].id == profileId){
                console.log($scope.leaderboardStorage[i])
                window.localStorage.setItem("visitingProfile", JSON.stringify($scope.leaderboardStorage[i]))
            }
        }
        window.location = "/othersProfile.html"
    }

    $scope.test1 = function(){


        
    }



    //$scope.test1();
        // hamdard uni. babar mor. 4k chorangi . saima . 

})



//read users [get]
//https://game.anomoz.com/api/post/user_read.php

//create users [post]
//https://game.anomoz.com/api/post/user_create.php

//update users [put, post]
//https://game.anomoz.com/api/post/user_update.php
