const INITIAL_STATE = {
    // temp data to mock

    /*
    From BE
    session: {
      - isPublic (boolean): Determines if the session is public.
      - status (string): The current status of the session. One of "waiting", "ongoing", "completed", or "cancelled".
      - players (array): An array of player ids. Will be initialized with the host's id.
      - quadrant (array): Used to store links to each of the images, initially empty.
      - finalImage (string): Used to store the final image's URL or data, initially empty.
    }   
    */
    sessions: [
        {
            id: 0,
            isPublic: true,
            status: "waiting",
            players: [],
            quadrant: [],
            finalImage: "",
        },
        {
            id: 1,
            isPublic: true,
            status: "waiting",
            players: [0, 1, 2],
            quadrant: [],
            finalImage: "",
        },
    ],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_SESSION":
            return {
                ...state,
                sessions: [...state.sessions, action.payload],
            };
        case "ADD_PLAYER":
            const sessionIndex = state.sessions.findIndex(
                (x) => x.id === action.payload.id
            );
            const session = state.sessions[sessionIndex];
            const updatedSession = {
                ...session,
                players: [...session.players, action.payload.id],
            };
            const updatedSessions = [...state.sessions];
            updatedSessions[sessionIndex] = updatedSession;

            return {
                ...state,
                sessions: updatedSessions,
            };
        default:
            return state;
    }
};

export default reducer;
