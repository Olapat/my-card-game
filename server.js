const App = require('./app');
const EndTurn = require('./src/gamePlay');
const SellCard = require('./src/sell_card');

const PORT = process.env.PORT || 7000;
App.listen(PORT, () => console.log(`Listening on port ${PORT}`));

App.get('/', (req, res) => {
    console.log(req.body);
    res.json({ksd: 153});
});

App.post('/end-trun-:p1&&:p2', EndTurn);

App.post('/sell', SellCard);
