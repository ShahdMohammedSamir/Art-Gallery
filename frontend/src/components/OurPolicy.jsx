import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const OurPolicy = () => {
  return (
    <>
      <div className="mt-10 -mb-20">
        <div className="text-center text-3xl pt-8">
          <Title text1={"Why"} text2={"US?"} />
        </div>
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700">
          <div>
            <img src={assets.repair} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold">Repair any damage immediately</p>
            <p className="text-gray-400">
              We provide free repair for any piece
            </p>
          </div>
          <div>
            <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
            <p className="font-semibold"> Best customer support</p>
            <p className="text-gray-400">We provide 24/7 customer support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurPolicy;
