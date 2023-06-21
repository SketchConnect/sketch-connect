const INITIAL_STATE = {
    // temp data to mock
    sessions: [
        {
            id: 1,
            name: 'ABC',
            occupancy: 1,
        },
        {
            id: 2,
            name: 'XYZ',
            occupancy: 3,
        },
    ],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;