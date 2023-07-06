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
  currentSession: {
    id: 0,
    isPublic: true,
    status: "waiting",
    players: [],
    quadrant: [],
    finalImage: "",
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
      };
    case "REMOVE_SESSION":
      let updatedSessions0 = state.sessions.filter(
        (session) => session.id !== action.payload,
      );
      return {
        ...state,
        sessions: updatedSessions0,
      };
    case "ADD_PLAYER":
      let sessionIndex = state.sessions.findIndex(
        (x) => x.id === action.payload.id,
      );
      let session = state.sessions[sessionIndex];
      let updatedSession = {
        ...session,
        players: [...session.players, action.payload.id],
      };
      let updatedSessions = [...state.sessions];
      updatedSessions[sessionIndex] = updatedSession;

      return {
        ...state,
        sessions: updatedSessions,
      };
    case "REMOVE_PLAYER":
      let sessionIndex1 = state.sessions.findIndex(
        (x) => x.id === action.payload.id,
      );
      let session1 = state.sessions[sessionIndex1];
      let updatedPlayers = session1.players.filter(
        (player) => player !== action.payload.player,
      );

      let updatedSession1 = {
        ...session1,
        players: updatedPlayers,
      };

      let updatedSessions1 = [...state.sessions];
      updatedSessions1[sessionIndex1] = updatedSession1;

      return {
        ...state,
        sessions: updatedSessions1,
      };
    case "UPDATE_STATUS":
      let sessionIndex2 = state.sessions.findIndex(
        (x) => x.id === action.payload.id,
      );
      let session2 = state.sessions[sessionIndex2];
      let updatedSession2 = {
        ...session2,
        status: action.payload.status,
      };
      let updatedSessions2 = [...state.sessions];
      updatedSessions2[sessionIndex2] = updatedSession2;
      return {
        ...state,
        sessions: updatedSessions2,
      };
    case "SET_CURRENT_SESSION":
      let curr = state.sessions.find((x) => x.id === action.payload);
      let temp = {
        ...state,
        currentSession: curr,
      };
      return temp;
    default:
      return state;
  }
};

export default reducer;
