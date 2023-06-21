let counter = 2 // temp will remove and use uuid on server side

export const addSession = () => {
    const newSession = {
        id: counter++,
        occupancy: 1,
    };

    return {
        type: 'ADD_SESSION',
        payload: newSession,
    };
};