import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const { artists } = useContext(ShopContext);
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const foundArtist = artists.find((artist) => artist.id === artistId);
    if (foundArtist) {
      setArtistData(foundArtist); 
    }
  }, [artistId, artists]);

  return artistData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>
        <div className='flex-1'>
          <img className='w-full h-auto' src={artistData.img[0]} alt={artistData.name} />
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{artistData.name}</h1>
          <p className='mt-5 text-gray-500'>{artistData.description}</p>
          <p className='mt-5 text-gray-500'>{artistData.duration}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className='opacity-0'>Loading...</div> // Optional loading state
  );
};

export default ArtistDetails;
