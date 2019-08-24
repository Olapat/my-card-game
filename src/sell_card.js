const AllCard = require('../CARD/card_functions');
const Players = require('../PLAYERS/players');

const sellCard = (req, res) => {
    const { name, card } = req.body;

    const c = AllCard[card];

    let C;
    if (c) {
        C = new c();
        const price = C.getState().price;
        C.sell(name, price);
    } else {
        console.log("No have Card P1 "+ cardP1, 'in /sell');
    }

    res.json({
        player: Players.getPlayer(name)
    });
};

module.exports = sellCard;
