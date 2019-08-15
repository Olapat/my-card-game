const Card = require('../card_class');

class fire extends Card {
    constructor () {
        super();
        this.elemental = 'fire';
    }

    isWin () {
        return 'green';
    };

    isLose () {
        return 'water'
    };
}

module.exports = fire;
