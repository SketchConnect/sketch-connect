let sessionCounter = 2; // temp will remove and use uuid on server side
let playerCounter = 3; // temp will remove and use uuid on server side

export const addSession = () => {
    const newSession = {
        id: sessionCounter++,
        isPublic: true,
        status: "waiting",
        players: [],
        quadrant: [],
        finalImage: "",
    };

    return {
        type: "ADD_SESSION",
        payload: newSession,
    };
};

export const addPlayer = (sessionId) => {
    const newPlayer = {
        id: playerCounter++,
    };
    return {
        type: "ADD_PLAYER",
        payload: { id: sessionId, player: newPlayer },
    };
};
