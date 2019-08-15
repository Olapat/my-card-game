const { players } = require('../../PLAYERS/players');

const addPoint = (name, point) => {
    const player = players[name];
    if (player) {
        let pointl = 0;
        pointl = player.getState().point;
        player.setPoint(pointl + point);
    } else {
        console.log("No have Player name "+ name + " in addPoint");
    }
};

module.exports = addPoint;
