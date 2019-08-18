const Room = require('../ROOMS/room_class');

const createRoom = (req, res) => {
    console.log(req.body);
    const { playerName } = req.body;
    Room.createRoom(playerName);
    
    res.json(Room.getRoom());
};

module.exports = createRoom;
