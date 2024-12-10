import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { currency } from "../App";
import { fetchProducts, deleteProduct } from "../api/api"; // Import API functions

const List = () => {
  const [list, setList] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(); // Fetch products from the API
        console.log("Fetched products:", products); // Log products to inspect data structure
        setList(products); // Set the products in the state
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire("Error", "Could not load products. Please try again later.", "error");
      }
    };

    loadProducts(); // Call the function to load products
  }, []); // Empty dependency array means this runs once when the component mounts

  // Delete product from the API and the UI
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the API to delete the product
          await deleteProduct(id); // Delete the product by ID

          // Remove product from local state
          const newList = list.filter((item) => item.id !== id);
          setList(newList);

          Swal.fire("Deleted!", "Product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "There was an issue deleting the product.", "error");
        }
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <div className="w-full lg:max-w-7xl mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold hidden md:table-row">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Sub Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products available.
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item.id} className="block md:table-row border-b md:border-none mb-4 md:mb-0">
                  {/* Image row */}
                  <td className="border px-4 py-2 flex items-center md:table-cell">
                    <span className="md:hidden font-semibold">Image:</span>
                    <img className="w-26 h-20 object-cover mx-auto" src={item.image} alt={item.name} />
                  </td>

                  {/* Name row */}
                  <td className="border px-4 py-2 flex items-center md:table-cell">
                    <span className="md:hidden font-semibold">Name:</span>
                    <p className="ml-2 text-center">{item.name}</p>
                  </td>

                  {/* Category row */}
                  <td className="border px-4 py-2 flex items-center md:table-cell">
                    <span className="md:hidden font-semibold">Category:</span>
                    <p className="ml-2 text-center">{item.category}</p>
                  </td>

                  {/* Sub Category row */}
                  <td className="border px-4 py-2 flex items-center md:table-cell">
                    <span className="md:hidden font-semibold">Sub Category:</span>
                    <p className="ml-2 text-center">{item.subCategory}</p>
                  </td>

                  {/* Price row */}
                  <td className="border px-4 py-2 flex items-center md:table-cell">
                    <span className="md:hidden font-semibold">Price:</span>
                    <p className="ml-2 text-center">
                      {currency}
                      {item.price}
                    </p>
                  </td>

                  {/* Action row */}
                  <td className="border px-4 py-2 text-center flex items-center justify-end md:table-cell">
                    <button
                      className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-colors duration-500"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
