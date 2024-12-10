import React, { useEffect } from "react";

const PayPalButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AaWafLf9jAW5g2JfxF3wktmh2rfUma4WMnJXmr83OjiB2P3lzSVcvK7DSZg-TGn4CQP-09btscvlf1q4&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2), // Amount in USD
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Payment Approved:", details);
            onSuccess(details); // Call the onSuccess handler
          });
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
          alert("Something went wrong with the payment.");
        },
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [amount, onSuccess]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
