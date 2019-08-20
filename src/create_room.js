const Room = require('../ROOMS/room_class');

const createRoom = (req, res) => {
    console.log(req.body);
    const { playerName } = req.body;
    const keyRoom = Room.createRoom(playerName);
    
    res.json({ keyRoom });
};

module.exports = createRoom;
