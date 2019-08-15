const Water = require('./card_water_class');
const addPoint = require('../../functions/add_point');

class W3 extends Water {
    constructor() {
        super();
        this.name = 'W3';
        this.description = 'รับ point 3 แต้ม';
        this.price = 1;
    };

    func(pSelf, pEnemy) {
        addPoint(pSelf, 3);
    }
};

module.exports = W3;
