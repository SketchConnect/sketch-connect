/*
    case "ADD_PLAYER":
      let sessionIndex = state.sessions.findIndex(
        (x) => x.id === action.payload.id
      );
      let session = state.sessions[sessionIndex];
      let updatedSession = {
        ...session,
        players: [...session.players, action.payload.id]
      };
      let updatedSessions = [...state.sessions];
      updatedSessions[sessionIndex] = updatedSession;

      return {
        ...state,
        sessions: updatedSessions
      };
    case "REMOVE_PLAYER":
      let sessionIndex1 = state.sessions.findIndex(
        (x) => x.id === action.payload.id
      );
      let session1 = state.sessions[sessionIndex1];
      let updatedPlayers = session1.players.filter(
        (player) => player !== action.payload.player
      );

      let updatedSession1 = {
        ...session1,
        players: updatedPlayers
      };

      let updatedSessions1 = [...state.sessions];
      updatedSessions1[sessionIndex1] = updatedSession1;

      return {
        ...state,
        sessions: updatedSessions1
      };
*/

const getUsers = async () => {
    try {

    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const addUser = async (user) => {
    try {

    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {

    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

const updateUser = async (userId, updatedUser) => {
    try {

    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const service = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
};
export default service;