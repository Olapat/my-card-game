import { createStore } from 'redux';

const State = {
    playerName: undefined,
    joinInRoom: undefined,
    isPlayer: undefined
} 

function store(state = State, actions) {
    switch (actions.type) {
        case 'savePlayer':
            console.log(actions.dataPlayer);
            return state = {...actions.dataPlayer};
        default:
            return state;
    };
};

export const storePlayer = createStore(store);
