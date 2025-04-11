import React from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

const canvasWrapper = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}

export default canvasWrapper