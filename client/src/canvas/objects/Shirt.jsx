import React from 'react'
import { useGLTF } from '@react-three/drei'

const Shirt = () => {
  const { scene } = useGLTF('/shirt_baked.glb')
  console.log('GLTF loaded:', scene)
  return <primitive object={scene} />
}

useGLTF.preload('/shirt_baked.glb') 
export default Shirt