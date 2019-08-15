const Green = require('./card_green_class');
const delHP = require('../../functions/del_HP');

class G2 extends Green {
    constructor() {
        super();
        this.name = 'G2';
        this.description = 'โจมตีศัตรู สร้างความเสียหาย 3 แต้ม';
        this.price = 2;
    };

    func(pSelf, pEnemy) {
        delHP(pEnemy, 3);
    }

};

module.exports = G2;
