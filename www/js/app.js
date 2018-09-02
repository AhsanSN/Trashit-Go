angular.module('homeMenu', ['ionic'])

.controller('homeMenuCtrl', function($scope) {

    $scope.aboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
    $scope.leaderboardStorage = JSON.parse(localStorage.getItem('leaderboardStorage'));
    $scope.storeStorage = JSON.parse(localStorage.getItem('storeStorage'));
    $scope.payoutStorage = JSON.parse(localStorage.getItem('payoutStorage'));
    $scope.visitingProfile = JSON.parse(localStorage.getItem('visitingProfile'));

    // quit app
    $scope.quitApp = function() {
        console.log("quit")
        ionic.Platform.exitApp();
    };

    //signup
    $scope.formPhoneNumber = function(name, phonenumber) {

        if ((name=="")||(phonenumber.length)<8){
            //invalid cred
            console.log("error auth");
            
        }

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
        try {
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
        catch(err) {
            console.log(err)
            window.location = "/signup.html";
        }
    }

    $scope.getPerc = function() {
        return ($scope.aboutMeStorage.points % 100)
    }

    $scope.getLevel = function() {
        return ($scope.aboutMeStorage.level)
    }

    $scope.showAllUsers = function(jsonFile){
        $scope.leaderboardStorage = jsonFile
        window.localStorage.setItem("leaderboardStorage",(jsonFile))
    }

    $scope.getAllUsers = function(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            $scope.showAllUsers(xmlHttp.responseText)
        }
        xmlHttp.open("GET", "https://game.anomoz.com/api/post/user_read.php", true); // true for asynchronous 
        xmlHttp.send(null);
    }

    $scope.verifyToken = function(token){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            var receivedTokens =  xmlHttp.responseText;
            //validate
            
            receivedTokens = JSON.parse(receivedTokens)
            for (var i = 0; i < receivedTokens.length; i++) {
                if (receivedTokens[i].token == token) {
                    document.getElementById("keyFail").style.display = "none";
                    document.getElementById("keySucc").style.display = "block";
                    console.log("verified: ", receivedTokens[i])
                    return true
                }
            }
            console.log("not verified")
            document.getElementById("keySucc").style.display = "none";
            document.getElementById("keyFail").style.display = "block";
            return false;
        }
            
        }
        xmlHttp.open("GET", "https://game.anomoz.com/api/post/productTokens_read.php", true); // true for asynchronous 
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

    $scope.getProdFromKey = function(key){
        var prefix = key.slice(0, 2);
        console.log(prefix)
        
        var product;
        var retrievedAboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
        switch (prefix) {
            case "PA":
                product = "prod_apple";
                retrievedAboutMeStorage.prod_apple = parseInt(retrievedAboutMeStorage.prod_apple) + 1;
                retrievedAboutMeStorage.points = parseInt(retrievedAboutMeStorage.points) + 12; //adds points
                break;
            case "PM":
                product = "prod_mango";
                retrievedAboutMeStorage.prod_mango = parseInt(retrievedAboutMeStorage.prod_mango) + 1;
                retrievedAboutMeStorage.points = parseInt(retrievedAboutMeStorage.points) + 26; //adds points
                break;
            case "PB":
                product = "prod_banana";
                retrievedAboutMeStorage.prod_banana = parseInt(retrievedAboutMeStorage.prod_banana) + 1;
                retrievedAboutMeStorage.points = parseInt(retrievedAboutMeStorage.points) + 22; //adds points
                break;
            default:
                product = "Error! No product found.";
        }
        console.log(product)      
        
        console.log("edited value", retrievedAboutMeStorage)
        window.localStorage.setItem("aboutMeStorage", JSON.stringify(retrievedAboutMeStorage))
    }

    $scope.addPoints = function(points){
        var retrievedAboutMeStorage = JSON.parse(localStorage.getItem('aboutMeStorage'));
        retrievedAboutMeStorage.points = parseInt(retrievedAboutMeStorage.points) + points;
        console.log("edited value", retrievedAboutMeStorage)
        window.localStorage.setItem("aboutMeStorage", JSON.stringify(retrievedAboutMeStorage))
    }

    $scope.toLeaderboardSecion = function(){
        document.getElementById("homeSection").style.display = "none"
        document.getElementById("leaderboardSection").style.display = "block"
    }

    $scope.fromLeaderboardSecionToHome = function(){
        document.getElementById("homeSection").style.display = "none"
        document.getElementById("leaderboardSection").style.display = "block"
    }
})



//read users [get]
//https://game.anomoz.com/api/post/user_read.php

//create users [post]
//https://game.anomoz.com/api/post/user_create.php

//update users [put, post]
//https://game.anomoz.com/api/post/user_update.php

//read productTokens [get]
//https://game.anomoz.com/api/post/productTokens_read.php

//update productTokens [put, post], shows single token//should not be used
//https://game.anomoz.com/api/post/productTokens_update.php?token=1