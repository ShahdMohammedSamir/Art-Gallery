import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Title from "../components/Title";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSumbitHandler = async (e) => {
    e.preventDefault();

    if (email === "amary@gmail.com" && password === "amary") {
      setIsLoggedIn(true);
      navigate("/add");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Invalid email or password!",
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white shadow-md rounded-lg px-10 py-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <form onSubmit={onSumbitHandler}>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:border-gray-500 transition-all duration-500"
                type="email"
                placeholder="your@gmail.com"
                required
              />
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:border-gray-500 transition-all duration-500"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              className="w-full py-3 rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-500"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
