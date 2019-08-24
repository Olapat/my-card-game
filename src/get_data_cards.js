const AllCard = require('../CARD/card_functions');

const getDataCards = (req, res) => {
    let DataCards = {};

    console.log(AllCard)
    const keysCard = Object.keys(AllCard);
    if (keysCard && keysCard.length > 0) {
        for (const key of keysCard) {
            const card_class = AllCard[key];
            const c = new card_class();
            let dataCard = c.getState();
            console.log(dataCard)
            DataCards = {...DataCards, [key]: {...dataCard}}
        }
    }

    res.json(DataCards);
};

module.exports = getDataCards;
