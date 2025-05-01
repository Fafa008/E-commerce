import React, { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const Shirt = () => {
  const { nodes, materials } = useGLTF('/scene.gltf')
  
  // Création de la texture avec texte
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    // Configuration du canvas
    canvas.width = 1024
    canvas.height = 1024
    
    // Dessin du texte
    context.fillStyle = "#ffffff" // Fond blanc
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "#000000" // Couleur du texte
    context.font = "bold 60px Arial"
    context.textAlign = "right"
    context.fillText("Hello word", canvas.width/2, canvas.height/2)
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  useEffect(() => {
    if (materials.lambert1) {
      materials.lambert1.map = textTexture
      materials.lambert1.needsUpdate = true
    }
  }, [materials, textTexture])

  return (
    <group>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.lambert1}
      />
    </group>
  )
}

useGLTF.preload('/scene.gltf')
export default Shirt
