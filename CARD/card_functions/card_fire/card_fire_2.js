const Fire = require('./card_fire_class');
const delPoint = require('../../functions/del_point');

module.exports = class F2 extends Fire {
    constructor() {
        super();
        this.name = 'f2';
        this.description = 'ทำลาย point ศัตรู 2 แต้ม';
        this.price = 2;
    };

    func(pSelf, pEnemy) {
        delPoint(pEnemy, 2);
    }
};
