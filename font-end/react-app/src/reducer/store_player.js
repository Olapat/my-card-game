import { createStore } from 'redux';

const State = {
    playerName: undefined,
    joinInRoom: undefined,
    isPlayer: undefined,
    playerEnemy: undefined
} 

function store(state = State, actions) {
    switch (actions.type) {
        case 'savePlayer':
            return state = {...actions.dataPlayer};
        default:
            return state;
    };
};

export const storePlayer = createStore(store);
