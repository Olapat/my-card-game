const PLAYER = require('./player_class');

// var players = { p1: new PLAYER(), p2: new PLAYER() };

// function addPlayer(name) {
//     players = { ...players, [name]: new PLAYER() }
//     return players;
// };


// function delPlayer(name) {
//     delete players[name];
// };

// module.exports = {
//     players: players,
//     addPlayer,
//     delPlayer
// };

class players {
    constructor() {
        this.players = { p1: new PLAYER(), p2: new PLAYER() };
    }

    getPlayer(name) {
        return this.players[name];
    }

    getPlayers() {
        return this.players;
    }

    addPlayer(name) {
        this.players = { ...this.players, [name]: new PLAYER() }
        return players;
    };

    delPlayer(name) {
        delete this.players[name];
    };
};

module.exports = new players;
