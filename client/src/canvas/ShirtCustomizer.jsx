import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Shirt from './objects/Shirt' // Importer notre composant Shirt modifié

const ShirtCustomizer = () => {
  // États pour les options de personnalisation
  const [text, setText] = useState('Hello World')
  const [textColor, setTextColor] = useState('#000000')
  const [textSize, setTextSize] = useState(48)
  const [position, setPosition] = useState({ x: 0.5, y: 0.4 }) // Centre de la poitrine par défaut
  const [rotation, setRotation] = useState(0)
  
  return (
    <div className="w-full h-screen flex">
      {/* Zone 3D du t-shirt */}
      <div className="w-2/3 h-full bg-gray-100">
        <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <Stage environment="city" intensity={0.5}>
            <Shirt 
              text={text}
              textColor={textColor}
              textSize={textSize}
              textPosition={position}
              textRotation={rotation}
              fontWeight="bold"
              shadowColor="rgba(0,0,0,0.3)"
            />
          </Stage>
          <OrbitControls 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2} 
            enableZoom={true} 
            enablePan={true} 
          />
        </Canvas>
      </div>
      
      {/* Panneau de contrôle */}
      <div className="w-1/3 h-full bg-white p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Personnaliser votre T-shirt</h2>
        
        {/* Contrôle du texte */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Texte</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Couleur du texte */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Couleur</label>
          <div className="flex items-center">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 border rounded mr-2"
            />
            <span>{textColor}</span>
          </div>
        </div>
        
        {/* Taille du texte */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Taille: {textSize}px
          </label>
          <input
            type="range"
            min="12"
            max="100"
            value={textSize}
            onChange={(e) => setTextSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* Position du texte */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Position</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1">X: {position.x.toFixed(2)}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={position.x}
                onChange={(e) => setPosition({...position, x: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Y: {position.y.toFixed(2)}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={position.y}
                onChange={(e) => setPosition({...position, y: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Rotation du texte */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Rotation: {rotation}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default ShirtCustomizer