class room {
    constructor() {
        this.room = {};
        this.roomInex = 1;
    }

    getRoom() {
        return this.room;
    };

    createRoom(playerName) {
        const key = this.roomInex;
        this.room = {
            ...this.room, 
            [key]: { 
                player1: playerName, 
                player2: null,
                gameplay: {}
            }};
        this.roomInex++;
    };

    joinRoom(keyRoom, playerName) {
        // const roomIndex = this.room.findIndex(k => k.keyRoom === parseInt(keyRoom));
        // this.room[roomIndex] = { ...this.room[roomIndex], player2: playerName };

        this.room[keyRoom] = {
            ...this.room[keyRoom], 
            player2: playerName
        }
    };

    setGamePlay(keyRoom, round, Cplayer1, Cplayer2, win) {
        this.room[keyRoom] = {
            ...this.room[keyRoom], 
            gameplay: {
                ...this.room[keyRoom].gameplay, 
                [round]: {
                    CardPlayer1: Cplayer1,
                    CardPlayer2: Cplayer2,
                    win: win
                }
            }
        }
    };
    
    destroyRoom(keyRoom) {
        const roomIndex = this.room.findIndex(k => k.keyRoom === keyRoom);
        this.room.slice(roomIndex);
    };
};

module.exports = new room();

const dd = {
    room_id: {
        p1: {
            name: 'Ty',
            card: 'F1'
        },
        p2: {
            name: 'Gy',
            card: null
        },
        gameplay: {
            1: {
                Cp1: 'F1',
                Cp2: 'G3',
                win: 'player1'
            },
            2: {
                Cp1: 'W1',
                Cp2: 'G1',
                win: 'player2'
            }
        }
    }
}
