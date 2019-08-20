const Water = require('./card_water_class');
const delArmor = require('../../functions/del_armor');
const delHP = require('../../functions/del_HP');
const Players = require('../../../PLAYERS/players');

class W2 extends Water {
    constructor() {
        super();
        this.name = 'W2';
        this.description = 'เปลื่ยนเกราะทั้งหมดให้เป็นดาเมจ เพื่อโจมตีศัตรู';
        this.price = 3;
    };

    func(pSelf, pEnemy) {
        const player = Players.getPlayer(pSelf);
        let armorl = 0;
        if (player) {
            armorl = player.getState().armor;
        } 

        delArmor(pSelf, armorl);

        delHP(pEnemy, armorl);

    }
};

module.exports = W2;
