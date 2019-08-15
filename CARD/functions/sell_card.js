const { players } = require('../../PLAYERS/players');

const sellCard = (name, price) => {
    const player = players[name];
    if (player) {
        let pointl = 0;
        pointl = player.getState().point;
        const res_sell = pointl + price;
        player.setPoint(res_sell);
    } else {
        console.log("No have Player name "+ name + " in sellCard");
    }
};

module.exports = sellCard;
