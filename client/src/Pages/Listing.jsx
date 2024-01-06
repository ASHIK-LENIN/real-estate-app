import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {

      try {

        const res = await axios.get(`http://localhost:3000/api/listing/get/${params.listingId}`)
        const data = await res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false)
        setError(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }

    };

    fetchListing();

  }, [params.listingId]);
  console.log(loading);


  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}

      {error && <p className='text-center my-7 text-2xl text-red-600'>Something went wrong!</p>}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',

                  }}>

                </div>
              </SwiperSlide>
            ))}

          </Swiper>
        </div>
      )}
    </main>
  )
}

export default Listing