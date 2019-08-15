const Water = require('./card_water_class');
const AddArmor = require('../../functions/add_armor');

class W1 extends Water {
    constructor() {
        super();
        this.name = 'W1';
        this.description = 'เพิ่ม เกราะ 5';
        this.price = 2;
    };

    func(pSelf, pEnemy) {
        AddArmor(pSelf, 5);
    }
};

module.exports = W1;
