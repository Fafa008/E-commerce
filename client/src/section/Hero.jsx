import React from 'react'

const Hero = () => {
  return (
    <section className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
            <h1 className='text-3xl font-bold mb-4'>Welcome to Our Website</h1>
            <p className='text-gray-700 mb-4'>
                We are excited to have you here! Explore our features and discover what we have to offer.
            </p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'>
                Get Started
            </button>
        </div>
    </section>
  )
}

export default Hero