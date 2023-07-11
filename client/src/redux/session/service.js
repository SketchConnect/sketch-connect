/*
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
  */

const addSession = async (session) => {
    try {
      const response = await fetch("http://localhost:5050/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.message);
      }
  
      return data;
    } catch (error) {
      console.error("Error adding session:", error);
      throw error;
    }
  };
  
  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:5050/sessions/${sessionId}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.message);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
    }
  };
  
  const updateStatus = async (sessionId, status) => {
    try {
      const response = await fetch(`http://localhost:5050/sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.message);
      }
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
  };
  
  const setCurrentSession = (sessionId) => {
    return {
      type: "SET_CURRENT_SESSION",
      payload: sessionId,
    };
  };
  
  const services = { addSession, deleteSession, updateStatus, setCurrentSession };
  
  export default services;
  