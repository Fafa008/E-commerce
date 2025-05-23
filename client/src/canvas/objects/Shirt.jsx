import React, { useEffect, useState, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const Shirt = ({ baseTexture, logoTexture, text, textColor = "#FF0000", textFont = "bold 60px Arial" }) => {
  const { nodes, materials } = useGLTF('/scene.gltf')
  const [baseTex, setBaseTex] = useState(null)
  const [logoTex, setLogoTex] = useState(null)
  const [finalTexture, setFinalTexture] = useState(null)

  // Charger la texture de base
  useEffect(() => {
    if (!baseTexture) {
      setBaseTex(null)
      return
    }

    const texture = new THREE.TextureLoader().load(baseTexture, (tex) => {
      tex.flipY = false
      setBaseTex(tex)
    })
    
    return () => texture.dispose()
  }, [baseTexture])

  // Charger le logo
  useEffect(() => {
    if (!logoTexture) {
      setLogoTex(null)
      return
    }

    const texture = new THREE.TextureLoader().load(logoTexture, (tex) => {
      tex.flipY = false
      setLogoTex(tex)
    })
    
    return () => texture.dispose()
  }, [logoTexture])

  // Combiner toutes les textures dans un canvas
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1024
    canvas.height = 1024

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dessiner la texture de base si elle existe
    if (baseTex) {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      
      // Créer une image à partir de la texture Three.js
      tempCtx.drawImage(baseTex.image, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
    }

    // Ajouter le texte
    if (text) {
      ctx.fillStyle = textColor
      ctx.font = textFont
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, canvas.width/2, canvas.height/2)
    }

    // Ajouter le logo
    if (logoTex) {
      const logoSize = canvas.width / 4
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = logoTex.image.width
      tempCanvas.height = logoTex.image.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.drawImage(logoTex.image, 0, 0)
      
      ctx.drawImage(
        tempCanvas,
        canvas.width - logoSize - 50,
        50,
        logoSize,
        logoSize
      )
    }

    // Créer la texture finale
    const texture = new THREE.CanvasTexture(canvas)
    texture.flipY = false
    setFinalTexture(texture)

    return () => {
      texture.dispose()
    }
  }, [baseTex, logoTex, text, textColor, textFont])

  // Appliquer la texture finale au matériau
  useEffect(() => {
    if (finalTexture && materials.lambert1) {
      materials.lambert1.map = finalTexture
      materials.lambert1.needsUpdate = true
    }
  }, [finalTexture, materials])

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