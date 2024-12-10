import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { search, setSearch } = useContext(ShopContext); // Access search context
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserAdminDropdown, setShowUserAdminDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Use effect to set the username from localStorage on page load
  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (username) {
      setUsername(username);
    }

    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem("userName");
      if (updatedUsername) {
        setUsername(updatedUsername);
      } else {
        setUsername("");
      }
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs only on mount

  // Fetch cart count dynamically every few seconds to keep it updated
  useEffect(() => {
    const getCartCount = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const response = await fetch(`https://diagonalley.runasp.net/api/Orders/GetPendingOrders/${userId}`);
        if (response.ok) {
          const count = await response.json();
          setCartCount(count.length);
        }
      }
    };

    // Poll for updates every 5 seconds
    const intervalId = setInterval(getCartCount, 1000);

    // Fetch the count immediately when the component mounts
    getCartCount();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Remove the logged-in user data
    localStorage.removeItem("userId");
    setUsername(""); // Clear the username state

    // Close the dropdown on logout
    setShowDropdown(false); 
    setShowUserAdminDropdown(false); // Close any user/admin dropdown

    // Reset cart count on logout
    setCartCount(0);

    // Navigate to the homepage or login page
    navigate("/"); 
  };

  const toggleUserAdminDropdown = () => {
    setShowUserAdminDropdown((prev) => !prev);
  };

  const handleUserAdminSelect = (type) => {
    if (type === "user") {
      navigate("login"); // Redirect to user login page
    } else if (type === "admin") {
      const redirectUrl = "https://diagonalleyadmin.netlify.app"; //this link 
      window.location.href = redirectUrl; // Redirect to external admin page
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Set the search query in context
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      setSearch(""); // Clear the search text when closing the search bar
    }
    setShowSearch(!showSearch); // Toggle the visibility of the search bar
  };

  // Auto-close search bar when not on /collection page
  useEffect(() => {
    if (location.pathname !== "/collection") {
      setShowSearch(false); // Close the search bar if not on collection page
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-5m text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            onClick={handleSearchToggle} // Use the new handleSearchToggle function
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        </Link>
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={search} // Bind search value from context
            onChange={handleSearchChange} // Update context when search changes
            className="ml-2 p-2 border border-gray-300 rounded-md"
          />
        )}
        {username ? (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p className="text-black font-semibold cursor-pointer flex items-center">
              Hello {username}
            </p>
            {showDropdown && (
              <div
                id="dropdown-menu"
                className="absolute right-0 w-40 bg-white z-10  overflow-hidden pt-4"
              >
                <Link to="/Orders">
                  <button className="block w-full text-left px-4 py-2 text-black bg-gray-100 hover:bg-gray-200">
                    Orders
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-black bg-gray-100 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setShowUserAdminDropdown(true)}
            onMouseLeave={() => setShowUserAdminDropdown(false)}
          >
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
            {showUserAdminDropdown && (
              <div
                className="absolute right-0 w-40 bg-white z-10  overflow-hidden pt-4"
              >
                <button
                  onClick={() => handleUserAdminSelect("user")}
                  className="block w-full text-left px-4 py-2 text-black bg-gray-100 hover:bg-gray-200 "
                >
                  User
                </button>
                <button
                  onClick={() => handleUserAdminSelect("admin")}
                  className="block w-full text-left px-4 py-2 text-black bg-gray-100 hover:bg-gray-200"
                >
                  Admin
                </button>
              </div>
            )}
          </div>
        )}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cartCount}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"
          } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
