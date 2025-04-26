import React from 'react'
import CanvasWrapper from '../canvas'

const Customizer = () => {
  return (
    <div className='flex flex-1/2 top-0 left-0 z-10 w-full h-full bg-black/50'>
      <div className='relative w-[50vw] h-screen p-4'>
        <h1 className='text-3xl'> Propreties </h1>
      </div>
      <div className='relative w-[500px] h-screen bg-white/10 backdrop-blur-lg p-4'>
        <h1 className='text-3xl '>Customizer</h1>
        <CanvasWrapper />
      </div>
    </div>
  )
}

export default Customizer