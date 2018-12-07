const friendsData = require("../data/friends");

module.exports = function (app) {
    // GET to url /api/friends used to display JSON to all possible friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        //compare current user's scores against other users
        let newFriendScores = req.body.Scores;

        let { friendObj: bestFriend } = friendsData.reduce((ACC, CURR) => {

            let compatibility = newFriendScores.reduce((accu, curr, idx) =>
                accu + Math.abs(curr - CURR.Scores[idx]), 0);

            if (compatibility < ACC.compatibility) {
                return {
                    friendObj: CURR,
                    compatibility: compatibility
                }
            } else return ACC;

        }, { compatibility: Infinity });

        friendsData.push(req.body);
        res.json(bestFriend);
    });
}