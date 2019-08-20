const Green = require('./card_green_class');
const regenHP = require('../../functions/regen_HP');
const delPoint = require('../../functions/del_point');
const Players = require('../../../PLAYERS/players');

class G3 extends Green {
    constructor() {
        super();
        this.name = 'G3';
        this.description = 'ใช้ point เพื่อฟื้น HP สูงสุด 3 แต้ม';
        this.price = 2;
    };

    func(pSelf, pEnemy) {
        const player = Players.getPlayer(pSelf);
        let point = 0;
        if (player) {
            point = player.getState().point;
        }

        const delP = point >= 3 ? 3 : point;

        regenHP(pSelf, delP);

        delPoint(pSelf, delP);
    }

};

module.exports = G3;
