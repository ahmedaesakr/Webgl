import PlayerController from './PlayerController'
import Particles from './Particles'
import Museum from './Museum'
import Effects from './Effects'
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function Experience({ onPointerLockChange, onRoomChange, onSelectProject }) {
  return (
    <>
      <color attach="background" args={['#101015']} />
      <fogExp2 attach="fog" args={['#101015', 0.03]} />
      <Environment preset="night" environmentIntensity={0.5} />
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        intensity={0.5}
        position={[2, 6, 4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <PlayerController onPointerLockChange={onPointerLockChange} onRoomChange={onRoomChange} />
      <Particles />
      <Museum onSelectProject={onSelectProject} />
      {/* <Effects /> */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}
