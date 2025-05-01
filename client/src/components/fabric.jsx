import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as fabric from 'fabric';
import Shirt from '../canvas/objects/Shirt'

const ShirtEditor = () => {
  const [texture, setTexture] = useState(null)
  const fabricCanvasRef = useRef(null)
  const containerRef = useRef(null)

  // Initialisation du canvas Fabric
  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas('text-canvas', {
      selection: false,
      hoverCursor: 'pointer'
    })

    // Configuration initiale du texte
    const text = new fabric.Text('Votre texte', {
      left: 200,
      top: 200,
      fontSize: 40,
      fill: '#000000'
    })
    
    fabricCanvasRef.current.add(text)
    updateTexture()

    // Événements de modification
    fabricCanvasRef.current.on('object:modified', updateTexture)

    return () => fabricCanvasRef.current.dispose()
  }, [])

  // Mise à jour de la texture
  const updateTexture = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 0.8
    })
    setTexture(dataURL)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '600px' }}>
      {/* Canvas Three.js */}
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shirt textureUrl={texture} />
      </Canvas>

      {/* Canvas Fabric.js superposé */}
      <canvas 
        id="text-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'auto',
          zIndex: 1
        }}
        width={800}
        height={600}
      />
    </div>
  )
}

export default ShirtEditor
