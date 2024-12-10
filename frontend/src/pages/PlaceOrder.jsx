import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotat'; 
import PayPalButton from '../components/PayPalButton'; 
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, cartItems } = useContext(ShopContext);

  // State for delivery information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  // Calculate cart amount
  const currency = '$'; 
  const deliveryFee = 10;
  const getCartAmount = () => Number(localStorage.getItem('TotalCost')) || 0;

  // Get user ID from localStorage with fallback
  const id = localStorage.getItem('userId') || '';
  if (!id) {
    console.error('User ID is not found in localStorage.');
    // Redirect to login or handle accordingly
    navigate('/login');
  }

  // Handle placing an order
  const handlePlaceOrder = async () => {
    if (!id) return; // Prevent placing an order if there's no user ID

    try {
      const response = await fetch(`https://diagonalley.runasp.net/api/Orders/UpdateStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to update order status');
      console.log('Order status updated successfully');
      navigate('/orders'); // Navigate to orders page
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Form validation
  const isFormValid =
    firstName &&
    lastName &&
    email &&
    street &&
    city &&
    state &&
    zipcode &&
    country &&
    phone;

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Delivery Information Section */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[400px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Street'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Zipcode'
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Order Summary and Payment Section */}
      <div className='mt-8'>
        <CartTotal
          cartData={cartItems}
          currency={currency}
          deliveryFee={deliveryFee}
          getCartAmount={getCartAmount}
        />

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('paypal')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'paypal' ? 'bg-green-400' : ''
                }`}
              ></p>
              <img className='h-6 mx-4' src={assets.paybal} alt="PayPal" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'cod' ? 'bg-green-400' : ''
                }`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          {method === 'paypal' && (
            <PayPalButton
              amount={getCartAmount() + deliveryFee}
              onSuccess={(details) => {
                console.log('Transaction completed by', details.payer.name.given_name);
                handlePlaceOrder();
              }}
            />
          )}
          <div className='w-full text-end mt-8'>
            <button
              onClick={handlePlaceOrder}
              className={`bg-black text-white px-16 py-3 text-sm hover:bg-gray-700 transition-colors duration-500 ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isFormValid}
            >
              PLACE ORDER
            </button>
            {!isFormValid && (
              <p className="text-red-500 text-xs mt-2">
                Please fill in all fields to proceed!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
