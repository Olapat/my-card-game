const Fire = require('./card_fire_class');
const addPoint = require('../../functions/add_point');
const delHP = require('../../functions/del_HP');

module.exports = class F3 extends Fire {
    constructor() {
        super();
        this.name = 'f3';
        this.description = 'หากชนะจะ -8 HP ศัตรู แต่หากแพ้จะ -8 HP ตัวเอง และหากเสมอ จะ +2 point ทั้ง 2 ฝ่าย';
    };

    func(pSelf, pEnemy, res) {
        if (res === 'win') {
            delHP(pEnemy, 8);
        } else if (res === 'lose') {
            delHP(pSelf, 8);
        } else if (res === 'draw')  {
            addPoint(pSelf, 2);
            addPoint(pEnemy, 2);
        }
    }
};
