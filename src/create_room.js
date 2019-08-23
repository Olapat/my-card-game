const Room = require('../ROOMS/room_class');

const createRoom = (req, res, socket) => {
    const { playerName } = req.body;
    const keyRoom = Room.createRoom(playerName);
    console.log(keyRoom);
    res.json({ keyRoom });
};

module.exports = createRoom;
