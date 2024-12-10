import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchOrders, deleteOrder } from "../api/Orders"; // Adjust the path if needed

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load orders. Please try again later.", "error");
      }
    };
    loadOrders();
  }, []);

  // Handle deleting an order
  const handleDelete = async (index, id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteOrder(id);
        setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
        Swal.fire("Deleted!", "Order has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete the order. Please try again.", "error");
      }
    }
  };

  // Format the date to display only the date part (yyyy-mm-dd)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Adjust to "en-GB" for dd/mm/yyyy format
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders History</h1>
      <div className="w-full lg:max-w-7xl mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Purchased Artworks</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="border px-4 py-2 text-center">{item.userName}</td>
                  <td className="border px-4 py-2 text-center">{item.productName || "No products"}</td>
                  <td className="border px-4 py-2 text-center">{formatDate(item.date)}</td>
                  <td
                    className={`border px-4 py-2 text-center ${
                      item.status === "0" ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    {item.status === "0" ? "Pending" : "Done"}
                  </td>
                  <td className="border px-4 py-2 text-center flex justify-center items-center space-x-4">
                    {/* Chat Text */}
                    {item.phone && (
                      <a
                        href={`https://wa.me/+2${item.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
                      >
                        WhatsApp
                      </a>
                    )}
                    {/* Vertical Line Divider */}
                    <div className="h-6 border-l border-gray-300 mx-2"></div>
                    {/* Delete Button */}
                    <button
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-300"
                      onClick={() => handleDelete(index, item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
