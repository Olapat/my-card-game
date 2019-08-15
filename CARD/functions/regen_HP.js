const { players } = require('../../PLAYERS/players');

const regen_HP = (name, regen) => {
    const player = players[name];
    if (player) {
        let hpl = 0;
        hpl = player.getState().hp;
        const res_regen = hpl + regen;
        player.setHP(res_regen > 30 ? 30 : res_regen);
    } else {
        console.log("No have Player name "+ name + " in regen_HP");
    }
};

module.exports = regen_HP;
