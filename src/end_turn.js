

const endTurn = (req, res) => {
    const { card, player } = req.body;

    console.log(card, player);
    res.end();

};

module.exports = endTurn;
