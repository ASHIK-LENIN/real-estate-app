import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItems from '../Components/ListingItems';



const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(rentListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {

        const res = await axios.get('http://localhost:3000/api/listing/get?offer=true&limit=4');
        const data = res.data;
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/listing/get?type=rent&limit=4');

        const data = res.data;
        setRentListings(data);
        fetchSaleListings();

      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await axios('http://localhost:3000/api/listing/get?type=sale&limit=4');
        const data = res.data;
        setSaleListings(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();

  }, [])
  return (
    <>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3  max-w-6xl mx-auto">
        <h1 className='text-blue-800 font-bold text-3xl lg:text-6xl'>Find Your next <span className='text-orange-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Settle Down, your premier choice for locating the ideal living space, embark on the journey to find your next perfect home.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-700 font-bold hover:underline hover:text-orange-600'>
          Let's get started...
        </Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listings) => (
            <SwiperSlide>
              <div style={{
                background: `url(${listings.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover'
              }} className="h-[500px]" key={listings._id}>

              </div>
            </SwiperSlide>

          ))
        }
      </Swiper>

      {/* listing results for offers, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600 ' >Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600' >Recent Places for Sales</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  Show more place for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItems listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )
        }

{
  rentListings && rentListings.length > 0 && (
    <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
        <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
          Show more places for rent
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {rentListings.map((listing) => (
          <ListingItems listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )
}
      </div>



    </>
  )
}

export default Home