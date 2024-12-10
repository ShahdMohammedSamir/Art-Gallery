import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "https://diagonalley.runasp.net/api/User";

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      if (!name || !email || !password || !phone) {
        Swal.fire({
          title: "Error!",
          text: "All fields are required.",
          icon: "error",
          button: "OK",
        });
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone }),
        });

        const result = await response.json();
        if (!response.ok) {
          Swal.fire({
            title: "Error!",
            text: result.message || "Failed to create account.",
            icon: "error",
            button: "OK",
          });
          return;
        }

        Swal.fire({
          title: "Success!",
          text: "Account created successfully! Please log in.",
          icon: "success",
          button: "OK",
        });

        setCurrentState("Login");
        navigate("/login");
      } catch (error) {
        console.error("Sign Up Error:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
          button: "OK",
        });
      }
    } else if (currentState === "Login") {
      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (!response.ok) {
          Swal.fire({
            title: "Invalid Credentials!",
            text: result.message || "Invalid email or password.",
            icon: "error",
            button: "OK",
          });
          return;
        }

        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("userName", result.user.name);
        window.dispatchEvent(new Event("storage"));
        navigate("/");  // Navigate to the homepage without page reload
      } catch (error) {
        console.error("Login Error:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
          button: "OK",
        });
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      noValidate
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </>
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
