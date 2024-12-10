
import { createContext, useState, useEffect } from "react";
import { products, artists } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [allArtists, setAllArtists] = useState(artists);

  // Search state
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Get the logged-in user's email
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = loggedInUser?.email;

  // Load cart from localStorage if the user is logged in
  useEffect(() => {
    if (userEmail) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`));
      if (savedCart) {
        setCartItems(savedCart);
      }
    }
  }, [userEmail]);

  // Add item to cart
  const addToCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    
    // Save updated cart to localStorage
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartData));
    }
  };

  // Update item quantity in cart
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size]; // Remove item if quantity is 0
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Remove the item entry if no sizes left
      }
    } else {
      cartData[itemId][size] = quantity; // Update quantity
    }

    setCartItems(cartData);

    // Save updated cart to localStorage
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartData));
    }
  };

  // Get total count of items in cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((count, itemSizes) => {
      return (
        count +
        Object.values(itemSizes).reduce((sum, quantity) => sum + quantity, 0)
      );
    }, 0);
  };

  // Get total amount in cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // Place an order
  const placeOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, orderDetails]);
    
    // Clear cart after placing an order
    setCartItems({});
    
    // Clear the user's cart in localStorage
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`);
    }

    toast.success("Order placed successfully!");
  };

  // Handle logout (clear cart and localStorage)
  const handleLogout = () => {
    setCartItems({});
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`);
    }
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    placeOrder,
    orders,
    handleLogout,
    navigate,
    artists: allArtists,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
