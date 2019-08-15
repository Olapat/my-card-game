const AllCard = require('../CARD/card_functions');
const { players } = require('../PLAYERS/players');

const sellCard = (req, res) => {
    const { name, card } = req.body;
    console.log(req.body);

    const c = AllCard[card];

    if (c) {
        C = new c();
        const price = C.getState().price;
        C.sell(name, price);
    } else {
        console.log("No have Card P1 "+ cardP1);
    }

    res.json({
        player: players[name],
    });
};

module.exports = sellCard;
