const INITIAL_STATE = {
    // temp data to mock
    sessions: [
        {
            id: 0,
            occupancy: 1,
        },
        {
            id: 1,
            occupancy: 3,
        },
    ],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_SESSION':
            return {
                ...state,
                sessions: [...state.sessions, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;