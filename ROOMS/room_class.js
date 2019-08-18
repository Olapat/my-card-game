class room {
    constructor() {
        this.room = [];
        this.roomInex = 1;
    }

    getRoom() {
        return this.room;
    };

    createRoom(playerName) {
        const key = this.roomInex;
        this.room = [...this.room, { keyRoom: key, player1: playerName }];
        this.roomInex++;
    };

    joinRoom(keyRoom, playerName) {
        const roomIndex = this.room.findIndex(k => k.keyRoom === parseInt(keyRoom));
        this.room[roomIndex] = { ...this.room[roomIndex], player2: playerName };
    };
    
    destroyRoom(keyRoom) {
        const roomIndex = this.room.findIndex(k => k.keyRoom === keyRoom);
        this.room.slice(roomIndex);
    };
};

module.exports = new room();
