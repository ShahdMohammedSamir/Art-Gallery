import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { usersData } from "../assets/users";

const Users = () => {
  const [userss, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleDelete = (index) => {
    const userName = userss[index].name;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newUsers = userss.filter((_, i) => i !== index);
        setUsers(newUsers);
        Swal.fire("Deleted!", `${userName} has been deleted.`, "success");
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="w-full lg:max-w-7xl mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold hidden md:table-row">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Number of Orders</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {userss.map((item, index) => (
              <tr
                key={index}
                className="block md:table-row border-b md:border-none mb-4 md:mb-0"
              >
                <td className="border px-4 py-2 flex items-center md:table-cell">
                  <span className="md:hidden font-semibold">Username:</span>
                  <p className="ml-2 text-center">{item.name}</p>
                </td>

                <td className="border px-4 py-2 flex items-center md:table-cell">
                  <span className="md:hidden font-semibold">Email:</span>
                  <p className="ml-2 text-center">{item.email}</p>
                </td>

                <td className="border px-4 py-2 flex items-center md:table-cell">
                  <span className="md:hidden font-semibold">Phone Number:</span>
                  <p className="ml-2 text-center">{item.phone}</p>
                </td>

                <td className="border px-4 py-2 flex items-center md:table-cell">
                  <span className="md:hidden font-semibold">No. Orders:</span>
                  <p className="ml-2 text-center">{item.number_of_orders}</p>
                </td>

                <td className="border px-4 py-2 text-center flex items-center justify-end md:table-cell">
                  <button
                    className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-colors duration-500"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
