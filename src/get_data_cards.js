const AllCard = require('../CARD/card_functions');

const getDataCards = (req, res) => {
    let DataCards = {};

    const keysCard = Object.keys(AllCard);
    if (keysCard && keysCard.length > 0) {
        for (const key of keysCard) {
            const card_class = AllCard[key];
            const c = new card_class();
            let dataCard = c.getState();
            DataCards = {...DataCards, [key]: {...dataCard}}
        }
    }

    res.json(DataCards);
};

module.exports = getDataCards;
