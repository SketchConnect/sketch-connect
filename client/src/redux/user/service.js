const getUsers = async () => {
  try {
    const response = await fetch('https://sketch-connect-be.onrender.com/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await fetch('https://sketch-connect-be.onrender.com/users', {
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
    const response = await fetch(`https://sketch-connect-be.onrender.com/users/${userId}`, {
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
    const response = await fetch(`https://sketch-connect-be.onrender.com/users/${userId}`, {
      method: 'PATCH',
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