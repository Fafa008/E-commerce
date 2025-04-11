import React from 'react'
import { Hero, About, Teams } from '../section'
import { Header, Footer } from '../layout/index.js'

const Landin = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center"> 
      <Header />
      <Hero />
      <About />
      <Teams />
      <Footer />
    </div>
  )
}

export default Landin