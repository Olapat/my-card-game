const { players } = require('../../PLAYERS/players');

const delHP = (name, damage) => {
    const player = players[name];
    if (player) {
        let hpl = 0;
        hpl = player.getState().hp;
        let armor = player.getState().armor;
        console.log(armor);
        if (armor > 0 && armor < damage) {
            player.setArmor(0);
            player.setHP(hpl - (damage - armor));
        } else if (armor > 0 && armor >= damage) {
            player.setArmor(armor - damage);
        } else if (armor <= 0){
            player.setHP(hpl - damage);
        }
    } else {
        console.log("No have Player name "+ cardP1);
    }
};

module.exports = delHP;
