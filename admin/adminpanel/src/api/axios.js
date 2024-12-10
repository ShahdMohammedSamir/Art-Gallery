import axios from "axios";

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: "https://diagonalley.runasp.net/api/Products", // Correct base URL for your API endpoints
  headers: {
    "Content-Type": "application/json", // Default content type for API requests
    // You can add other headers here like authentication tokens if needed
    // Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
