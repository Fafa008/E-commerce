import React, { useState } from 'react'
import CanvasWrapper from '../canvas'

const Customizer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-white">
      
      {/* Sidebar gauche (pliable) */}
      <div className={`flex flex-row pt-20 h-screen lg:flex-col bg-white/10 backdrop-blur-lg p-2 transition-all duration-300
        ${isSidebarOpen ? 'w-full lg:w-64' : 'w-16'} lg:h-full`}>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-2 text-black"
        >
          {isSidebarOpen ? '<' : '>'}
        </button>

        {isSidebarOpen && (
          <div className="flex flex-row lg:flex-col gap-2 w-full">
            <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter Texte</button>
            <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Importer Image</button>
            <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600">Utiliser IA</button>
          </div>
        )}
      </div>

      {/* Partie centrale */}
      <div className="flex-1 flex flex-col">
        
        {/* Barre du haut */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-lg p-4">
          <input 
            type="text"
            placeholder="Rechercher..."
            className="w-full p-2 rounded bg-black/20 text-black placeholder-black/70"
          />
        </div>

        {/* Canvas principal */}
        <div className="flex-1 relative bg-black/20 p-4 overflow-auto">
          <CanvasWrapper />
        </div>
      </div>

      {/* Sidebar droite (Export) */}
      <div className="hidden lg:flex flex-col w-64 bg-white/10 backdrop-blur-lg p-4">
        <h2 className="text-xl text-black mb-4">Exporter</h2>
        <button className="p-3 bg-red-500 text-white rounded hover:bg-red-600">
          Exporter
        </button>
      </div>
    </div>
  )
}

export default Customizer
