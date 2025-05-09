import React, { useState } from 'react'
import ShirtCustomizer from '../canvas/ShirtCustomizer'
import CustomNav from '../components/customNav'

const Customizer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-white">
      <CustomNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <ShirtCustomizer />
    </div>
  )
}

export default Customizer
