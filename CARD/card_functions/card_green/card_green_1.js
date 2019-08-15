const Green = require('./card_green_class');
const Regen = require('../../functions/regen_HP');

class G1 extends Green {
    constructor() {
        super();
        this.name = 'G1';
        this.description = 'เพิ่ม HP 5';
        this.price = 2;
    };

    func(pSelf, pEnemy) {
        Regen(pSelf, 5);
    }
};

module.exports = G1;
