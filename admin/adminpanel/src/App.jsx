import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Users from "./pages/Users";

export const currency = "$";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
