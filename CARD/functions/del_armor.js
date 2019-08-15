const { players } = require('../../PLAYERS/players');

const delArmor = (name, damage) => {
    const player = players[name];
    if (player) {
        armorl = player.getState().armor;
        const resDelArmor = armorl - damage;
        player.setArmor(resDelArmor <= 0 ? 0 : resDelArmor);
    } else {
        console.log("No have Player name "+ name + "in delArmor");
    }
};

module.exports = delArmor;
