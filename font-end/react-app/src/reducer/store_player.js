import { createStore } from 'redux';

function store(state, actions) {
    switch (actions.type) {
        case 'savePlayer':
            state = actions.dataPlayer;
            console.log(state)
            break;
        case 'getPlayer':
            return state;
        default:
            break;
    };
};

export const storePlayer = createStore(store);
