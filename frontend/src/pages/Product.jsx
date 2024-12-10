import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Swal from 'sweetalert2'; // Import SweetAlert2
import RelatedProducts from '../components/RelatedProducts';

const API_BASE_URL = "https://diagonalley.runasp.net/api/products"; // Backend API URL

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  // Fetch product data from the API
  const fetchProductData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product data. Status: ${response.status}`);
      }
      const data = await response.json();
      setProductData(data);
      setImage(data.image); // Assuming the API returns a single image URL
    } catch (error) {
      console.error('Error fetching product data:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to load product data: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!userId || !userName) {
      Swal.fire({
        icon: 'warning',
        title: 'You must log in',
        text: 'Please log in to add items to your cart.',
      });
      return;
    }

    try {
      const userResponse = await fetch(`https://diagonalley.runasp.net/api/user/${userId}`);
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("User fetch failed:", errorText);
        throw new Error("Failed to fetch user data.");
      }

      const userData = await userResponse.json();

      // Prepare order data with additional user details
      const orderData = {
        userId, // User ID
        userName, // User name
        phone: userData.phone, // User phone
        productId: productData.id,
        productName: productData.name,
        photo: productData.image, // Add Photo field from productData
        date: new Date().toISOString(),
        status: "0", // Pending
      };

      const response = await fetch("https://diagonalley.runasp.net/api/orders/AddOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to add order: ${errorMessage}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: 'The product has been added to your cart.',
      });
      
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `There was an issue adding the product to your cart: ${error.message}`,
      });
    }
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*--------------- product Data---------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*----------------product Images ---------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            <img
              onClick={() => setImage(productData.image)}
              src={productData.image}
              className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              alt={productData.name}
            />
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt={productData.name} />
          </div>
        </div>
        {/*---------------product Info---------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.size}</p>
          </div>
          <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            Add To Cart
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Free repair for any piece</p>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData.id}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
