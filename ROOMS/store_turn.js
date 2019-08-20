class storeTurn {
    constructor() {
        this.storeTurn = {};
    }

    getStoreTurn(keyRoom) {
        return this.storeTurn[keyRoom]
    }

    getAllStoreTurn() {
        return this.storeTurn;
    }

    setStoreTurn(keyRoom, cardPlay, isPlayer) {
        if (isPlayer === 'player1') {
            this.storeTurn = {
                ...this.storeTurn,
                [keyRoom]: {
                    ...this.storeTurn[keyRoom],
                    cardPlayer1: cardPlay
                }
            }
        } else if (isPlayer === 'player2') {
            this.storeTurn = {
                ...this.storeTurn,
                [keyRoom]: {
                    ...this.storeTurn[keyRoom],
                    cardPlayer2: cardPlay
                }
            }
        }
    };

    resetStoreTurn(keyRoom) {
        delete this.storeTurn[keyRoom];
    }
}

module.exports = new storeTurn();
