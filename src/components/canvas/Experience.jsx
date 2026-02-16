import PlayerController from './PlayerController'
import Particles from './Particles'
import { LOBBY_SIZE } from '@/data/museumBounds'

export default function Experience({ onPointerLockChange, onRoomChange }) {
  const roomHalfWidth = LOBBY_SIZE.width / 2
  const roomHalfDepth = LOBBY_SIZE.depth / 2
  const wallHeight = LOBBY_SIZE.height
  const wallThickness = LOBBY_SIZE.wallThickness

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[LOBBY_SIZE.width, LOBBY_SIZE.depth]} />
        <meshStandardMaterial color="#121212" roughness={0.8} metalness={0.15} />
      </mesh>

      <mesh position={[0, wallHeight / 2, -roomHalfDepth]} receiveShadow castShadow>
        <boxGeometry args={[LOBBY_SIZE.width, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#1d1d1d" roughness={0.9} />
      </mesh>
      <mesh position={[0, wallHeight / 2, roomHalfDepth]} receiveShadow castShadow>
        <boxGeometry args={[LOBBY_SIZE.width, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#1d1d1d" roughness={0.9} />
      </mesh>
      <mesh position={[-roomHalfWidth, wallHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, wallHeight, LOBBY_SIZE.depth]} />
        <meshStandardMaterial color="#1d1d1d" roughness={0.9} />
      </mesh>
      <mesh position={[roomHalfWidth, wallHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, wallHeight, LOBBY_SIZE.depth]} />
        <meshStandardMaterial color="#1d1d1d" roughness={0.9} />
      </mesh>
    </>
  )
}
