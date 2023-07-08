let sessionCounter = 2; // temp will remove and use uuid on server side
let playerCounter = 3; // temp will remove and use uuid on server side

export const addSession = () => {
  const newSession = {
    id: sessionCounter++,
    isPublic: true,
    status: "waiting",
    players: [],
    quadrant: [],
    finalImage: ""
  };

  return {
    type: "ADD_SESSION",
    payload: newSession
  };
};

export const removeSession = (id) => {
  return {
    type: "REMOVE_SESSION",
    payload: id
  };
};

export const addPlayer = (sessionId) => {
  const newPlayer = {
    id: playerCounter++
  };
  return {
    type: "ADD_PLAYER",
    payload: { id: sessionId, player: newPlayer }
  };
};

export const removePlayer = (sessionId, playerId) => {
  return {
    type: "REMOVE_PLAYER",
    payload: { id: sessionId, player: playerId }
  };
};

export const updateStatus = (sessionId, status) => {
  return {
    type: "UPDATE_STATUS",
    payload: { id: sessionId, status: status }
  };
};

export const setCurrentSession = (sessionId) => {
  return {
    type: "SET_CURRENT_SESSION",
    payload: sessionId
  };
};
