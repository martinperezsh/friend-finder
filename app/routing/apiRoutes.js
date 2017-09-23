var path = require("path");

var friends = require("../data/friends");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
	  res.json(friends);
	});

// Getting survey answers and comparing them to the friends file
	app.post('/api/friends', function(req, res) {
        var bestFriend = {
            name: '',
            photo: '',
            userDifference: 0
        }
        var totalDifference = 0;

        var userInput = req.body;

        var userScore = userInput.scores;

       for (var i = 0; i < friends.length; i++) {
            
            for (var j = 0; j < friends[i].scores.length; j++) {
                
                totalDifference += Math.abs(userInput.scores[j] - friends[i].scores[j]);

                if (totalDifference <= bestFriend.friendDifference) {
                    bestFriend.name = friends[i].name;
                    bestFriend.photo = friends[i].photo;
                    bestFriend.match = totalDifference;
                }
            }
       }

    	friends.push(userInput);

    	res.json(bestFriend);
	});

}	