const App = require('./app');
const EndTurn = require('./src/gamePlay');
const endTurn = require('./src/end_turn');
const SellCard = require('./src/sell_card');
const GetAllCard = require('./src/get_all_card');
const CreateRoom = require('./src/create_room');
const GetRooms = require('./src/get_rooms');
const JoinRoom = require('./src/join_room');
const CreatePlayer = require('./src/create_player');

const PORT = process.env.PORT || 7000;
App.listen(PORT, () => console.log(`Listening on port ${PORT}`));

App.get('/', (req, res) => {
    console.log(req.body);
    res.json({ksd: 153});
});

App.post('/end-trun-:p1&&:p2', EndTurn);

App.post('/end-trun', endTurn);

App.post('/sell', SellCard);

App.get('/get-card-all', GetAllCard);

App.post('/create-room', CreateRoom);

App.get('/get-rooms', GetRooms);

App.post('/join-rooms-:keyRoom', JoinRoom);

App.post('/create-player', CreatePlayer);
