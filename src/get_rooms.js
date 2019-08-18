const Room = require('../ROOMS/room_class');

const getRooms = (req, res) => {
    res.json(Room.getRoom())
};

module.exports = getRooms;
