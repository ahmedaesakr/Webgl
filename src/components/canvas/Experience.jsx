import PlayerController from './PlayerController'
import Particles from './Particles'
import Museum from './Museum'

export default function Experience({ onPointerLockChange, onRoomChange }) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 1, 40]} />
      <ambientLight intensity={0.15} />
      <directionalLight
        castShadow
        intensity={0.5}
        position={[2, 6, 4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <PlayerController onPointerLockChange={onPointerLockChange} onRoomChange={onRoomChange} />
      <Particles />
      <Museum />
    </>
  )
}
