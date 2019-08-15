const AllCard = require('../CARD/card_functions');
const { players } = require('../PLAYERS/players');

const endTurn = (req, res) => {
    const { cardP1, cardP2 } = req.body;
    const { p1, p2 } = req.params;
    console.log(p1, p2);
    const c1 = AllCard[cardP1];
    const c2 = AllCard[cardP2];
    let e1, e2, w1, C1, C2, noCard = false;
    const cardP = ['F3'];

    if (c1) {
        C1 = new c1();
        e1 = C1.getState().elemental;
        w1 = C1.isWin();
    } else {
        console.log("No have Card P1 "+ cardP1);
        noCard = true;
    }

    if (c2) {
        C2 = new c2();
        e2 = C2.getState().elemental
    } else {
        console.log("No have Card P2 "+ cardP2);
        noCard = true;
    }
    
    console.log(e1, e2);
    if (w1 && e2 && !noCard) {
        if (w1 === e2) {
            console.log('play1_win');
            C1.func(p1, p2, 'win');
            if (cardP.includes(cardP2)) {
                C2.func(p2, p1, 'lose');
            }
        } else if (e1 === e2) {
            console.log('เสมอ');
            if (cardP.includes(cardP1)) {
                C1.func(p1, p2, 'draw');
            }

            if (cardP.includes(cardP2)) {
                C2.func(p2, p1, 'draw');
            }
        } else {
            console.log('play1_lose');
            C2.func(p2, p1, 'win');
            if (cardP.includes(cardP1)) {
                C1.func(p1, p2, 'lose');
            }
        }
    }

    console.log(players[p1]); 
    console.log(players[p2]); 

    res.json({
        player1: players[p1],
        player2: players[p2]
    });
};

module.exports = endTurn;
