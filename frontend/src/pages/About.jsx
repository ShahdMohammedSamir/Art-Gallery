// import React from 'react'
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={" US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome to Diagon Alley, a space where creativity and inspiration come together to celebrate the beauty of art. 
            Our gallery was founded with the vision of providing a platform for both emerging and
             established artists to showcase their work in a dynamic and inclusive environment.</p>
          <p>We believe in the power of art to connect people, evoke emotion, and inspire thought.
            Our exhibitions feature a diverse range of mediums, including painting, 
            sculpture, photography, digital art, and more, offering something for every art enthusiast.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>At Diagon Alley, our mission is to support and promote artistic talent while fostering a sense of 
            community around the appreciation of art. We are committed to curating exhibitions that challenge perceptions, 
            spark conversations, and engage viewers on a deep, personal level.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={" CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">We ensure the highest standards in every artwork displayed at Diagon Alley. Each piece is carefully selected for its authenticity, craftsmanship, and artistic integrity, so you can trust the quality of every work you encounter.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Your experience with us is designed to be seamless. Whether you're browsing online, visiting the gallery, or purchasing art, we offer easy navigation, flexible appointments, and secure transactions to make everything as smooth as possible.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our team is here to provide expert advice and personalized assistance. We’re dedicated to making your experience enjoyable, whether you're looking to buy art, attend an event, or simply explore. Exceptional service is at the heart of everything we do.</p>
        </div>
      </div>
      
     {/* testt */}
      <NewsLetterBox/>
    </div>
  );
};

export default About;
