import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="mt-40">
            <hr />
            <div className="flex flex-col sm:grid grid-cols-[1fr_1fr_1fr_1fr] gap-14 my-10 text-sm">
                <div>
                    {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}
                    <p className="text-xl font-medium mb-5">EXPLORE US</p>
                    <p className="w-full md:w-2/3 text-gray-600">
                        Explore our  Diagon Alley Art Gallery, showcasing diverse works from talented artists worldwide.
                        Discover inspiring paintings,
                        sculptures, and photography that captivate and inspire.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <Link to="/"><li className="hover:text-black transition-all duration-500">Home</li></Link>
                        <Link to="/Collection"><li className="hover:text-black transition-all duration-500">Collection</li></Link>
                        <Link to="/Contact"><li className="hover:text-black transition-all duration-500">Contact</li></Link>
                        <Link to="/About"><li className="hover:text-black transition-all duration-500">About us</li></Link>
                        <Link to="/"><li className="hover:text-black transition-all duration-500">Privacy policy</li></Link>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="pb-3"> <img className="w-6 inline" src={assets.mobile} alt="" />  +2-01019238456</li>
                        <li className="pb-3"><img className="w-6 inline" src={assets.phone} alt="" />  047-1324675</li>
                        <li> <img className="w-6 inline" src={assets.mail} alt="" />  diagonalley@gmail.com</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">SOCIAL MEDIA</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li> <a href="#"><img className="w-7 pb-3" src={assets.facebook} alt="" /></a></li>
                        <li> <a href="#"><img className="w-7 pb-3" src={assets.instagram} alt="" /></a></li>
                        <li> <a href="#"><img className="w-7 pb-3" src={assets.linkedin} alt="" /></a></li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024 &copy; DaigonAlley.com - All Right Reserved</p>
            </div>

        </div>
    )
}

export default Footer