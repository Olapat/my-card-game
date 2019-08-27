const Room = require('../ROOMS/room_class');

const joinRoom = (req, res) => { //, socket, io
    const { keyRoom } = req.params;
    const { playerName } = req.body;
    console.log(keyRoom, playerName);
        
    const succec = Room.joinRoom(keyRoom, playerName);

    res.json({ join: succec, playerName }); 
};

module.exports = joinRoom;
