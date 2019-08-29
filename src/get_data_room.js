const Room = require('../ROOMS/room_class');

const getDataRoom = (req, res) => {
    const { keyRoom } = req.params;
    const dataRoom = Room.getRoom(keyRoom);
    res.json(dataRoom);
};

module.exports = getDataRoom;
