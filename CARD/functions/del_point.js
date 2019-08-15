const { players } = require('../../PLAYERS/players');

const delPoint = (name, damage) => {
    const player = players[name];
    if (player) {
        let pointl = 0;
        pointl = player.getState().point;
        const res = pointl - damage;
        player.setPoint(res <= 0 ? 0 : res);
    } else {
        console.log("No have Player name "+ name + " in delPoint");
    }
};

module.exports = delPoint;
