const Players = require('../PLAYERS/players');

const createPlayer = (req, res) => {
    const { playerName } = req.body;
    console.log("createPlayerName:", playerName);

    const player = Players.getPlayer(playerName);
    if (!player) {
        Players.addPlayer(playerName);

        res.json(Players.getPlayer(playerName));
    } else {
        res.json({player});
    }
};

module.exports = createPlayer;
