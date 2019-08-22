const App = require('./app');
const EndTurn = require('./src/gamePlay');
const endTurn = require('./src/end_turn');
const SellCard = require('./src/sell_card');
const GetAllCard = require('./src/get_all_card');
const CreateRoom = require('./src/create_room');
const GetRooms = require('./src/get_rooms');
const JoinRoom = require('./src/join_room');
const CreatePlayer = require('./src/create_player');
const runSocket = require('./socket');

const PORT = process.env.PORT || 7000;
const app = App.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const socketIO = require('socket.io');
const io = socketIO.listen(app);

// runSocket(io);
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createRoom', (room) => socket.join(room, () => 
        io.sockets.in(room).emit('event', { room: room })
    ));

    socket.on('joinRoom', room => socket.join(room, () => 
        io.sockets.in(room).emit('user-join', { join: room })
    ));
});

App.post('/create-room', CreateRoom);

App.post('/join-room-:keyRoom', JoinRoom);

App.post('/end-trun-:p1&&:p2', EndTurn);

App.post('/end-trun', (req, res) => endTurn(req, res, io));

App.post('/sell', SellCard);

App.get('/get-card-all', GetAllCard);

App.get('/get-rooms', GetRooms);

App.post('/create-player', CreatePlayer);
