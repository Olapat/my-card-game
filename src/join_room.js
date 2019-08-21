const Room = require('../ROOMS/room_class');

const joinRoom =  (req, res, socket, io) => {
    const { keyRoom } = req.params;
    const { playerName } = req.body;
    console.log(keyRoom, playerName);
        
    const succec = Room.joinRoom(keyRoom, playerName);

    socket.join(keyRoom); //-${keyRoom}
    // io.emit('return', "hello to server");
    io.to(keyRoom.toString()).emit('return2', "hello to server1"); //-${keyRoom}

    res.json({ join: succec }); 
};

module.exports = joinRoom;
