const Fire = require('./card_fire_class');
const DelHP = require('../../functions/del_HP');

module.exports = class F1 extends Fire {
    constructor() {
        super();
        this.name = 'f1';
        this.description = 'ลบ HP 5';
    };

    getState() {
        return this;
    };

    func(pSelf, pEnemy) {
        DelHP(pEnemy, 5);
    }
};
