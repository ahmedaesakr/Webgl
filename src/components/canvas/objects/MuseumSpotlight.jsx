import { useRef } from 'react'
import { SpotLight } from '@react-three/drei'

export default function MuseumSpotlight({
  position = [0, 4, 0],
  target = [0, 0, 0],
  color = '#fff5e6',
  intensity = 2,
  angle = 0.4,
  penumbra = 0.5,
  distance = 12,
  castShadow = true,
  debug = false,
}) {
  const lightRef = useRef()

  return (
    <SpotLight
      ref={lightRef}
      position={position}
      target-position={target}
      color={color}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      distance={distance}
      castShadow={castShadow}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-bias={-0.0001}
      attenuation={5}
      anglePower={4}
      opacity={0.5} // Volumetric opacity
    />
  )
}
