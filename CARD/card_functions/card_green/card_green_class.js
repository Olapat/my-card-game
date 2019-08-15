const Card = require('../card_class');

class green extends Card {
    constructor () {
        super();
        this.elemental = 'green';
    }

    isWin () {
        return 'water';
    };

    isLose () {
        return 'fire'
    };
};

module.exports = green;
