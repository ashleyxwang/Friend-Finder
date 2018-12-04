const friendsData = require("../data/friends");

module.exports = function (app) {
    // GET to url /api/friends used to display JSON to all possible friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //POST routes /api/friends to handle incoming survey results; will also handle compatibility logicc
    app.post("/api/friends", function (req, res) {
        //compare difference between current user's scores against those from other users, question by question
        let newFriendScores = newFriend[0].Scores

        // - current difference accumulation, (acc) accumulated shit
        // - the current value in the array being checked, (curr) the value we're on
        // - and the current index of that element, (idx) place in array


        if (storedFriends.length === 0) {
            // no friends to compare! 
        }

        // Object Destructuring **BOOM**
        let { friendObj: bestFriend } = storedFriends.reduce((ACC, CURR) => {

            let compatibility = newFriendScores.reduce((accu, curr, idx) =>
                accu + Math.abs(curr - CURR.Scores[idx])
                , 0);

            // console.log(compatibility);

            if (compatibility < ACC.compatibility) {
                return {
                    friendObj: CURR,
                    compatibility: compatibility
                }
            }
            // else 
            return ACC;

        }, { compatibility: Infinity });

        console.log(bestFriend.Name, bestFriend.FaceBook, bestFriend.Photo);

    });
}