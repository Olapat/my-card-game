const AllCard = require('../CARD/card_functions');
const Players = require('../PLAYERS/players');

const checkWin = (card, player) => {
    const { cardP1, cardP2 } = card;
    const { p1, p2 } = player;
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
    };

    const _p1 = Players.getPlayer(p1);
    const _p2 = Players.getPlayer(p2);

    console.log(_p1); 
    console.log(_p2); 

    return {
        player1: _p1.getState(),
        player2: _p2.getState()
    };
};

module.exports = checkWin;
