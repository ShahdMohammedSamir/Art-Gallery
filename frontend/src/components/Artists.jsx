import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ArtistCard from "./ArtistCard";

const Artists = () => {
  const { artists } = useContext(ShopContext); 
  const [Artists, setArtists] = useState([]);

  useEffect(() => {
    if (artists && artists.length > 0) {
      setArtists(artists);
    }
  }, [artists]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl pt-8">
        <Title text1={"Historical"} text2={"ARTISTS"} />
      </div>
      <div className="text-center pb-8">
        <p className="w-3/4 m-auto text-xl sm:text-sm md:text-base text-gray-600">
          Because they are an inspiration to all of us and we can't forget
          what they have done for us.
        </p>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover the masters of art who have shaped history with their
          visionary creations. From the delicate brushstrokes to the bold colors
          then the pioneering works.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pap-4 gap-y-6">
        {Artists.map((item, index) => (
          <ArtistCard
            key={index}
            image={item.img}
            name={item.name}
            duration={item.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;
