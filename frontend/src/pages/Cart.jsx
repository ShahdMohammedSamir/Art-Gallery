import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CartTotal from '../components/CartTotat';
import { Link, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const API_BASE_URL = "https://diagonalley.runasp.net/api/Orders";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [currency] = useState("$");
  const [deliveryFee] = useState(10);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to view your cart.', 'error');
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/GetPendingOrders/${userId}`);
        if (!response.ok) throw new Error(`Failed to load cart data: ${response.statusText}`);

        const cartItems = await response.json();
        localStorage.setItem('cartCount', cartItems.length);

        const tempData = cartItems.map((item) => ({
          _id: item.id,
          name: item.productName,
          image: item.photo,
          price: item.price,
          size: "Default Size",
          quantity: item.amount > 0 ? item.amount : 1,
        }));

        setCartData(tempData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        Swal.fire('Error', 'Failed to load cart. Please try again later.', 'error');
      }
    };

    fetchCartData();
  }, [userId]);

  const handleDelete = async (productId) => {
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
          const response = await fetch(`${API_BASE_URL}/DeleteOrder/${productId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(`Failed to delete item: ${response.statusText}`);
          }

          const updatedCartData = cartData.filter((item) => item._id !== productId);
          setCartData(updatedCartData);

          Swal.fire("Deleted!", "Item has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error!", "Failed to delete the item. Please try again.", "error");
        }
      }
    });
  };

  const handleCheckout = async () => {
    if (cartData.length > 0 && userId) {
      try {
        for (const item of cartData) {
          const response = await fetch(`${API_BASE_URL}/UpdateCartQuantity`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId: userId,
              OrderId: item._id,
              NewAmount: item.quantity,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update cart: ${errorData.message || response.statusText}`);
          }
        }

        // Move to place order page after checkout
        navigate("/place-order");

      } catch (error) {
        console.error("Error updating cart quantities:", error);
        Swal.fire("Error!", "Failed to update cart. Please try again later.", "error");
      }
    } else {
      Swal.fire("Error!", "Your cart is empty or you are not logged in.", "error");
    }
  };

  const getCartAmount = () => {
   var totalAmount= cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
    localStorage.setItem("TotalCost", totalAmount.toString());
    return totalAmount;
  };

  const isButtonDisabled = !userId || cartData.length === 0;

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-gray-500">Your cart is empty. Start adding products!</p>
        ) : (
          cartData.map((item, index) => (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                <img className='h-32 w-20 object-cover' src={item.image} alt={item.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{item.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue > 0) {
                    item.quantity = newValue;
                    setCartData([...cartData]);
                  }
                }}
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => handleDelete(item._id)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt='Remove item'
              />
            </div>
          ))
        )}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal
            cartData={cartData}
            currency={currency}
            deliveryFee={deliveryFee}
            getCartAmount={getCartAmount}
            
          />
          <div className='w-full text-end'>
            <button 
              onClick={handleCheckout} 
              className={`bg-black text-white text-sm mt-8 px-8 py-3 hover:bg-gray-700 transition-colors duration-500 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={isButtonDisabled}
            >
              PROCEED TO CHECKOUT
            </button>
            {isButtonDisabled && (
              <p className="text-red-500 text-xs">
                {!userId ? 'You must log in to proceed!' : 'Your cart is empty!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
