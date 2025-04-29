import React from 'react'
import { useGLTF, Text } from '@react-three/drei'

const Shirt = () => {
  const { scene } = useGLTF('/shirt_baked.glb')

  return (
    <group>
      {/* Le modèle 3D */}
      <primitive object={scene} />

      {/* Le texte positionné sur une face du modèle */}
      <Text
        position={[0, 0, .15]}
        fontSize={0.03}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello World
      </Text>
    </group>
  )
}

useGLTF.preload('/shirt_baked.glb')
export default Shirt
