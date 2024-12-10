import axios from './axios'; // Import the configured axios instance

// Fetch products from API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(""); // No need to include 'api/Products' as baseURL is set in axios instance
    return response.data; // Return the product data from the API response
  } catch (error) {
    console.error("Error fetching products:", error); // Handle any errors
    throw error; // Propagate error to handle it in the component
  }
};

// Delete a product from API
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`/${id}`); // Only pass the product ID since the base URL is set
  } catch (error) {
    console.error("Error deleting product:", error); // Handle any errors
    throw error; // Propagate error to handle it in the component
  }
};


export const addProduct = async (productData) => {
  try {
    const response = await axios.post("", productData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product fun:", error.response ? error.response.data : error.message);
    throw error; // This will be handled by the component
  }
};




