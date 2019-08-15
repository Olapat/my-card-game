const { players } = require('../../PLAYERS/players');

const addArmor = (name, ar) => {
    const player = players[name];
    if (player) {
        armorl = player.getState().armor;
        player.setArmor(armorl + ar);
    } else {
        console.log("No have Player name "+ name + "in add_armor");
    }
};

module.exports = addArmor;
