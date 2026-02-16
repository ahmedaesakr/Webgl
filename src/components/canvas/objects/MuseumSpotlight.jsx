import { useRef, useLayoutEffect } from 'react'

export default function MuseumSpotlight({
  position = [0, 4, 0],
  target = [0, 0, 0],
  color = '#fff5e6',
  intensity = 2,
  angle = 0.4,
  penumbra = 0.5,
  distance = 12,
}) {
  const lightRef = useRef()
  const targetRef = useRef()

  useLayoutEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current
    }
  }, [])

  return (
    <group>
      <spotLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={intensity}
        angle={angle}
        penumbra={penumbra}
        distance={distance}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0001}
      />
      <object3D ref={targetRef} position={target} />
    </group>
  )
}
