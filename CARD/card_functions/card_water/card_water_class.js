const Card = require('../card_class');

class water extends Card {
    constructor () {
        super();
        this.elemental = 'water';
    }

    isWin () {
        return 'fire';
    };

    isLose () {
        return 'green'
    };

};

module.exports = water;
