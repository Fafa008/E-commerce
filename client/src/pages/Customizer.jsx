import React from 'react'
import CanvasWrapper from '../canvas'

const Customizer = () => {
  return (
    <div className='absolute top-0 left-0 z-10 w-full h-full bg-black/50'>
      <div className='absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-lg p-4'>
        <h1 className='text-white'>Customizer</h1>
        <CanvasWrapper />
        </div>
    </div>
  )
}

export default Customizer