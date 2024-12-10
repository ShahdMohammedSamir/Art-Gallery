const API_BASE_URL = "https://diagonalley.runasp.net"; // Backend API base URL

/**
 * Fetch all orders from the API.
 * @returns {Promise<Array>} A promise that resolves to the list of orders.
 */
export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Orders/GetAllOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Error fetching orders: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

/**
 * Delete an order by ID.
 * @param {number} orderId - The ID of the order to delete.
 * @returns {Promise<void>}
 */
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Orders/DeleteOrder/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Error deleting order: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting order:", error.message);
    throw error;
  }
};
