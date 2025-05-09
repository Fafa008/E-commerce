import React from 'react';

const CustomNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    // Sidebar gauche (pliable)
    <div className={`flex flex-row pt-20 h-screen lg:flex-col bg-white/10 backdrop-blur-lg p-2 transition-all duration-300
        ${isSidebarOpen ? 'w-full lg:w-64' : 'w-16'} lg:h-full`}>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="mb-2 text-black"
      >
        {isSidebarOpen ? 'X' : 'O'}
      </button>

      {isSidebarOpen && (
        <div className="flex flex-row lg:flex-col gap-2 w-full">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter Texte</button>
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Importer Image</button>
          <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600">Utiliser IA</button>
        </div>
      )}
    </div>
  );
};

export default CustomNav;
