import React from 'react'

const Teams = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
            <h1 className='text-3xl font-bold mb-4'>Our Teams</h1>
            <p className='text-gray-700 mb-4'>
                Meet our talented teams who work tirelessly to bring you the best products and services.
            </p>
            <ul className='list-disc pl-5'>
                <li className='text-gray-700'>Development Team</li>
                <li className='text-gray-700'>Design Team</li>
                <li className='text-gray-700'>Marketing Team</li>
                <li className='text-gray-700'>Support Team</li>
            </ul>
        </div>
    </section>
)
}

export default Teams