import React from 'react'
const Scene = () => {
  return (
    <mesh position={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Scene