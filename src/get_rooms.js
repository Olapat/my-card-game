const Room = require('../ROOMS/room_class');

const getRooms = (req, res) => {
    res.json(Room.getRooms())
};

module.exports = getRooms;
