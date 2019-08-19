const Room = require('../ROOMS/room_class');

const joinRoom = (req, res) => {
    const { keyRoom } = req.params;
    const { playerName } = req.body;
    console.log(keyRoom, playerName);
        
    Room.joinRoom(keyRoom, playerName);
    res.end();
};

module.exports = joinRoom;
