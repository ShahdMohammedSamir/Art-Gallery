const API_BASE_URL = "https://diagonalley.runasp.net"; 

// Fetch users from the API
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/User`);
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return await response.json(); // Parse and return JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Propagate error
  }
};

// Delete a user from the API
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/User/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; 
  }
};
