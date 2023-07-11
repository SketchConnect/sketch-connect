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
    const response = await fetch('http://localhost:5050/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await fetch('http://localhost:5050/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.message;
      throw new Error(errorMsg)
    }

    return data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch('http://localhost:5050/users/${userId}', {
      method: 'DELETE',
    });

    const data = await response.json();
        if (!response.ok) {
            const errorMsg = data?.message;
            throw new Error(errorMsg);
        }

        return userId;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const updateUser = async (userId, updatedUser) => {
  try {
    const response = await fetch(`http://localhost:5050/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    });
    const updatedUserResponse = await response.json();
    return updatedUserResponse;
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