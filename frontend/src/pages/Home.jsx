// import React from 'react'
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import Artists from "../components/Artists";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Artists/>
       <NewsLetterBox />
      <OurPolicy />
     
    </div>
  );
};

export default Home;