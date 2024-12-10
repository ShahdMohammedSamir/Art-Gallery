import React from "react";

const ArtistCard = ({ image, name, duration }) => {
  return (
      <div className="flex flex-col items-center p-4">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-[300px] object-cover max-w-[200px] shadow-lg hover:shadow-xl hover:scale-110 transition ease-in-out duration-300"
        />
        <h4 className="mt-4 text-center font-semibold">{name}</h4>
        <p className="text-center text-sm text-gray-500">{duration}</p>
      </div>
  );
};

export default ArtistCard;
