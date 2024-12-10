import React from "react";
import Swal from "sweetalert2";
import { assets } from "../assets/assets";

const Navbar = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will go to the Home Page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Go to Home!",
    }).then((result) => {
      if (result.isConfirmed) {
        const redirectUrl = "http://localhost:5173/";
        window.location.href = redirectUrl;
      }
    });
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.adminLogo} alt="" />
      <button
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-500 transition-colors duration-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
