const Green = require('./card_green_class');
const Regen = require('../../functions/regen_HP');
const SellCard = require('../../functions/sell_card');

class G1 extends Green {
    constructor() {
        super();
        this.name = 'G1';
        this.description = 'เพิ่ม HP 5';
        this.price = 2;
    };

    getState() {
        return this;
    };

    func(pSelf, pEnemy) {
        Regen(pSelf, 5);
    }

    sell(name) {
        SellCard(name, this.price);
    }
};

module.exports = G1;
