const App = require('./app');
const EndTurn = require('./src/gamePlay');
const endTurn = require('./src/end_turn');
const SellCard = require('./src/sell_card');
const GetAllCard = require('./src/get_all_card');
const CreateRoom = require('./src/create_room');
const GetRooms = require('./src/get_rooms');
const GetDataRoom = require('./src/get_data_room');
const JoinRoom = require('./src/join_room');
const CreatePlayer = require('./src/create_player');
const EndTurnSocket = require('./src/end_turn_socket');
const GetDataCards = require('./src/get_data_cards');
const runSocket = require('./socket');
const Room = require('./ROOMS/room_class');

const PORT = process.env.PORT || 7000;
const app = App.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const socketIO = require('socket.io');
const io = socketIO.listen(app);

// runSocket(io);
io.on('connection', (socket) => {

    socket.on('createRoom', ({ room, playerName }) => socket.join(room, () => {
        const keyRoom = Room.createRoom(playerName);
        console.log(keyRoom);
        io.sockets.in(room).emit('event', { room: room })
    }));

    socket.on('joinRoom', room => socket.join(room, () => {
        const dataRoom = Room.getRoom(room);
        io.sockets.in(room).emit('user-join', dataRoom)
    }));

    socket.on('endTurn', async data => {
        const res = await EndTurnSocket(data);
        console.log(res, 'res in endturn');

        io.sockets.in(data.room.keyRoom).emit('end-turn', res)
    });

    socket.on('updateNumCard', data => {
        if (data && data.room) {
                io.sockets.in(data.room).emit('playerUpdateNumCard', { 
                numCard: data.numCard,
                isPlayer: data.isPlayer
            });
        }
    });


});

App.post('/create-room', CreateRoom);

App.post('/join-room-:keyRoom', JoinRoom);

App.post('/end-trun-:p1&&:p2', EndTurn);

App.post('/end-trun', (req, res) => endTurn(req, res, io));

App.post('/sell', SellCard);

App.get('/get-card-all', GetAllCard);

App.get('/get-rooms', GetRooms);

App.get('/get-data-room=:keyRoom', GetDataRoom)

App.post('/create-player', CreatePlayer);

App.get('/get-data-cards', GetDataCards);
