const Room = require('../ROOMS/room_class');
const StoreTurn = require('../ROOMS/store_turn');
const CheckWin = require('../src/check_win');

const endTurn = async (req, res, io) => {
    const { card, player, room, round } = req.body;

    const { keyRoom, isPlayer } = room;
    console.log(card, player, room);

    await StoreTurn.setStoreTurn(keyRoom, card, isPlayer);
    const st = StoreTurn.getStoreTurn(keyRoom);
    console.log(st);

    if (st && st.cardPlayer1 && st.cardPlayer2) {
        const cardP1 = st.cardPlayer1;
        const cardP2 = st.cardPlayer2;
        console.log(Room.getRoom(keyRoom));
        const roomm = Room.getRoom(keyRoom);
        const p1 = roomm.player1;
        const p2 = roomm.player2;
        const ress = CheckWin({ cardP1, cardP2 }, { p1, p2 });
        StoreTurn.resetStoreTurn(keyRoom);
        res.json(ress);
        io.sockets.in(keyRoom).emit('end-turn', ress);
    } else {
        res.json({ res: 'end' });
    }
};

module.exports = endTurn;
