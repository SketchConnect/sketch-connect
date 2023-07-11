const getSessions = async () => {
  try {
    const res = await fetch("https://sketch-connect-be.onrender.com/sessions", {
      method: "GET",
    });
  
    return res.json();
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
}

const addSession = async (session) => {
    try {
      const response = await fetch("https://sketch-connect-be.onrender.com/sessions", {
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
      const response = await fetch(`https://sketch-connect-be.onrender.com/sessions/${sessionId}`, {
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
      const response = await fetch(`https://sketch-connect-be.onrender.com/sessions/${sessionId}`, {
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
  
  const services = { getSessions, addSession, deleteSession, updateStatus };
  
  export default services;
  