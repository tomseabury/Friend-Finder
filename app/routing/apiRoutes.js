var friends = require("../data/friends.js");

module.exports = function(app){

    app.get("/api/friends", function(req, res) {  
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        
        var bestMatch = {
          name: "",
          photo: "",
          friendDifference: 1000
        };
        
        var newFriend = req.body;
        var newScore = newFriend.scores;

        var totalDifference = 0;
      
        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            totalDifference = Math.abs(newScore.reduce(getSum) - friends[i].scores.reduce(getSum));
            console.log("User Score:", newScore.reduce(getSum));
            console.log("Friend Score:", friends[i].scores.reduce(getSum));
            console.log("_____________________")
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            
        }

      friends.push(newFriend);
      res.json(bestMatch);
      
      });
      
}

function getSum(total, num) {
    return Number(total) + Number(num);
}