import React from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import OrbitControlsWarper from './controls/OrbitControls'
import { Shirt } from './objects'


const CanvasWrapper = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <ambientLight intensity={0.5} />
      {/* <Scene /> */}
      <Shirt />
      <OrbitControlsWarper />
    </Canvas>
  )
}

export default CanvasWrapper