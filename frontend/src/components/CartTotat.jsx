import React from "react";
import Title from './Title';

const CartTotal = ({ cartData, currency, deliveryFee, getCartAmount }) => {
    const totalAmount = getCartAmount();
    
    const totalWithDelivery = totalAmount === 0 ? 0 : totalAmount + deliveryFee;

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div> 

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency} {totalAmount}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>{currency} {deliveryFee}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency} {totalWithDelivery}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal;
