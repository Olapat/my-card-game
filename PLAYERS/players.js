const PLAYER = require('./player_class');

const players = { p1: new PLAYER(), p2: new PLAYER() };

function addPlayer(name) {
    players = { ...players, [name]: new PLAYER() }
};


function delPlayer(name) {
    delete players[name];
};

module.exports = {
    players: players,
    addPlayer,
    delPlayer
};
