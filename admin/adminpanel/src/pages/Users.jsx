import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchUsers, deleteUser } from "../api/Users"; // Import API functions

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(); // Fetch users
        setUsers(data); // Update state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Could not load users. Please try again later.", "error");
        setLoading(false);
      }
    };

    loadUsers(); // Call the function
  }, []); // Runs only on mount

  // Handle user deletion
  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId); // Call the API to delete the user

          // Remove the deleted user from the local state
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);

          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Failed to delete the user. Please try again.", "error");
        }
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="w-full lg:max-w-7xl mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold">
              <th className="px-4 py-2 text-center border-r border-gray-300">Username</th>
              <th className="px-4 py-2 text-center border-r border-gray-300">Phone Number</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users available.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-center border-r border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 text-center border-r border-gray-300">{user.phone}</td>
                  <td className="px-4 py-2 text-center flex justify-center items-center space-x-4">
                    {/* Chat Button */}
                    <a
                      href={`https://wa.me/+2${user.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
                    >
                      WhatsApp
                    </a>
                    {/* Vertical Divider */}
                    <div className="h-6 border-l border-gray-300 mx-2"></div>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-300"
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
    </div>
  );
};

export default Users;
