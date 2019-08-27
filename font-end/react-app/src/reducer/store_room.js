import { createStore } from 'redux';

const State = {
    key: null,
    player1: null,
    player2: null
}

function store(state = State, actions) {
    switch (actions.type) {
        case 'saveRoom':
            return state = { ...actions.dataRoom };
        default:
            return state;
    };
};

export const storeRoom = createStore(store);
