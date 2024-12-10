// import React from 'react'
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={" US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-gray-600">Our Gallery</p>
          <p className="text-gray-500">Email: diagonalley@gmail.com </p>
          <p className="text-gray-500">Address: 22 Old Street </p>
          <p className="text-gray-500">Phone: +2-01012345689</p>
          <p className="text-gray-500">Tel: 047-13246759</p>
          <p className="font-semibold text-gray-600">We're Here to Help</p>
          <p className="text-gray-500">
            Thank you for visiting Diagon Alley Art Gallery!  <br /> We are thrilled to
            be a vibrant part of the artistic community, dedicated to showcasing
            a diverse range of contemporary and classic artworks.  <br />Our gallery
            features an exquisite collection that includes works from both
            emerging talents and established artists, offering visitors an
            opportunity to immerse themselves in the transformative power of
            art. <br /> At Diagon Alley, we believe that art is a universal
            language that connects people and inspires creativity. Whether you
            are an avid art collector, a casual admirer, or someone new to the
            world of art, our welcoming atmosphere invites you to explore,
            appreciate, and engage with the various pieces on display.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
