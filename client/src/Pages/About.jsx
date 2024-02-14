import React from 'react';

const About = () => {
  return (
    <>
      <div className='bg-gradient-to-b from-blue-800 to-blue-600 text-white min-h-screen flex items-center justify-center flex-col'>
        <h1 className='text-5xl font-extrabold mb-6 text-orange-300'>Discover <span className='text-orange-100'>Settle Down</span> Realty</h1>
        <div className='bg-white bg-opacity-20 p-8 rounded-md max-w-2xl'>
          <p className='mb-4 text-gray-200'>Welcome to a world where settling down is a seamless journey. Settle Down Realty, your avant-garde partner, specializes in making your real estate dreams a vibrant reality in the most sought-after neighborhoods.</p>
          <p className='mb-4 text-gray-200'>
            Our mission is to redefine your real estate experience with personalized service, expert advice, and an in-depth understanding of the local market. Whether it's buying, selling, or renting, our team is dedicated to guiding you through every step.
          </p>
          <p className='mb-4 text-gray-200'>
            Elevate your real estate journey with our experienced team, committed to delivering the highest level of service. We believe in making the process exciting and rewarding, ensuring a memorable experience for each client we serve.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
