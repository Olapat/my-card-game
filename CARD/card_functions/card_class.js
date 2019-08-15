const SellCard = require('../functions/sell_card');

class card {

    getState() {
        return this;
    };
    
    sell(name, price) {
        SellCard(name, price);
        console.log(name, price);
    }
};

module.exports = card;
