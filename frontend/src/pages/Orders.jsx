import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Swal from "sweetalert2";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) {
      Swal.fire("Error", "User is not logged in.", "error");
      return;
    }

    const loadOrders = async () => {
      try {
        const response = await fetch(
          `https://diagonalley.runasp.net/api/orders/GetOrdersByUserId/${userId}`
        );
        if (!response.ok) throw new Error("Failed to load orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load orders. Please try again later.", "error");
      }
    };

    loadOrders();
  }, [userId]);

  const handleDeleteOrder = async (orderToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://diagonalley.runasp.net/api/orders/DeleteOrder/${orderToDelete.id}`,
            { method: "DELETE" }
          );
          if (!response.ok) throw new Error("Failed to delete order");

          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderToDelete.id)
          );
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the order. Please try again.", "error");
        }
      }
    });
  };

  return (
    
    <div className='border-t pt-16'>
    <div className='text-2xl'>
      <Title text1={'My'} text2={'ORDERS'} />
     </div>
  
    
      <div className="mt-0">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found. Start shopping now!</p>
        ) : (
          orders.map((order) => {
            const productData = products.find((item) => item._id === order.productId);

            return (
              <div
                key={order.id}
                className='py-4 border-t border-b text-gray-700 flex-col md:flex-row md:item-center md:justify-between gap-4'
                >
                <div className='flex items-start gap-6 text-lg'>
                  <img className='h-32 w-20 object-cover'
                    src={order.photo ||"/placeholder-image.png"}
                    
                  
                  />
                  
                  <div>
                    <p className=" text-gray-700 text-xl  mb-2 ">{order.productName}</p>
                   
                    <p className="text-gray-700 text-lg inline">
                      {currency}
                      {productData?.price || order.price}
                    </p>
                    
                    <p className="inline  text-start gap-2 ml-4 ">
                     Quantity:
                     <div className=" text-base border border-gray-300 bg-gray-50 rounded w-16 h-6.5 text-center  ml-3 mt-1 inline-block">
                     {order.amount}
                     </div>
                   </p>
                  
                    <p className="text-gray-500 text-sm mt-3">
                    <p className="text-gray-700 text-sm inline">Date:</p>
                       {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-1 mt-2">
                  <div className='flex items-center gap-2'>
                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                   <p className='text-sm md:text-base'>Ready to ship</p>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
