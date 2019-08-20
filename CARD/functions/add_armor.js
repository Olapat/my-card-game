const Players = require('../../PLAYERS/players');

const addArmor = (name, ar) => {
    const player = Players.getPlayer(name);
    if (player) {
        armorl = player.getState().armor;
        player.setArmor(armorl + ar);
    } else {
        console.log("No have Player name "+ name + "in add_armor");
    }
};

module.exports = addArmor;
