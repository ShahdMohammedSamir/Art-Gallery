import React, { useState } from "react";

const NewsLetterBox = () => {
    const [email, setEmail] = useState(""); // State to manage the email input

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Perform any logic for submission (like API call) here if needed
        setEmail(""); // Clear the input field after submission
    };

    return (
        <div className="text-center my-28">
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get 10% off</p>
            <p className="text-gray-400 mt-3">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input
                    type="email"
                    className="w-full sm:flex-1 outline-none"
                    placeholder="Enter your email"
                    required
                    value={email} // Bind the input value to the state
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
                <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
