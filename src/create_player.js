const Players = require('../PLAYERS/players');

const createPlayer = (req, res) => {
    const { playerName } = req.body;
    console.log(playerName);

    const players = new Players();
    if (!Players[playerName]) {
        players.addPlayer(playerName);
        console.log(players.getPlayer(playerName));

        res.json(players.getPlayer(playerName));
    } else {
        res.json({playerName});
    }
};

module.exports = createPlayer;
