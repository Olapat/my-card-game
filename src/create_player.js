const Players = require('../PLAYERS/players');

const createPlayer = (req, res) => {
    const { playerName } = req.body;
    console.log(playerName);

    const player = Players.getPlayer(playerName);
    if (!player) {
        Players.addPlayer(playerName);
        console.log(Players.getPlayer(playerName));

        res.json(Players.getPlayer(playerName));
    } else {
        res.json({ playerName });
    }
};

module.exports = createPlayer;
