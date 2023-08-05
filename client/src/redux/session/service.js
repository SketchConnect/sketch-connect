const getSessions = async () => {
  try {
    const res = await fetch("https://sketch-connect-be.onrender.com/sessions", {
      method: "GET"
    });

    return res.json();
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

const getSession = async (sessionId) => {
  try {
    const res = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
      {
        method: "GET"
      }
    );

    return res.json();
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

const addSession = async (session) => {
  try {
    const response = await fetch(
      "https://sketch-connect-be.onrender.com/sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
      }
    );

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
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
      {
        method: "DELETE"
      }
    );

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
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: status })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

const addPlayer = async (sessionId, playerId) => {
  try {
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}/add-player`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: playerId })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding player to session:", error);
    throw error;
  }
};

const removePlayer = async (sessionId, playerId) => {
  try {
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}/remove-player`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: playerId })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    return data;
  } catch (error) {
    console.error("Error removing player to session:", error);
    throw error;
  }
};

const finalImage = async (sessionId, image) => {
  try {
    let formData = new FormData();
    formData.append("img", image);
    formData.append("folder", "drawings/complete");
    formData.append("quadrantNumber", "");
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}/upload-drawing`,
      {
        method: "PATCH",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    return data.url;
  } catch (error) {
    console.error("Error final image to session:", error);
    throw error;
  }
};

const quadrantImage = async (sessionId, image, quadrantNumber) => {
  try {
    let formData = new FormData();
    formData.append("img", image);
    formData.append("folder", "drawings/quadrants");
    formData.append("quadrantNumber", quadrantNumber);
    const response = await fetch(
      `https://sketch-connect-be.onrender.com/sessions/${sessionId}/upload-drawing`,
      {
        method: "PATCH",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }
  } catch (error) {
    console.error("Error final image to session:", error);
    throw error;
  }
};

const services = {
  getSessions,
  getSession,
  addSession,
  deleteSession,
  updateStatus,
  addPlayer,
  removePlayer,
  finalImage,
  quadrantImage
};

export default services;
