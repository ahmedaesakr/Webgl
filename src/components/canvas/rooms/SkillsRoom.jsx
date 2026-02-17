import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'
import MuseumSpotlight from '../objects/MuseumSpotlight'
import Pedestal from '../objects/Pedestal'
import { Text } from '@react-three/drei'
import { skills } from '@/data/portfolio'

const HALF_DOOR = DOOR_WIDTH / 2
const PEDESTAL_RADIUS = 4

export const SKILLS = {
  width: 12,
  depth: 12,
  height: 5,
  x: 0,
  z: LOBBY.z - LOBBY.depth / 2 - 12 / 2,
}

export default function SkillsRoom({ onHover }) {
  const pedestalSkills = skills.slice(0, 8)

  return (
    <>
      <RoomShell
        width={SKILLS.width}
        depth={SKILLS.depth}
        height={SKILLS.height}
        position={[SKILLS.x, 0, SKILLS.z]}
        doorGaps={{
          south: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        }}
      />

      {/* Room title */}
      <Text
        position={[SKILLS.x, SKILLS.height - 0.6, SKILLS.z]}
        fontSize={0.3}
        color="#d7e8ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        Skills & Technologies
        <meshStandardMaterial
          color="#d7e8ff"
          emissive="#6366f1"
          emissiveIntensity={0.2}
        />
      </Text>

      {/* Pedestals in a circle */}
      {pedestalSkills.map((skill, i) => {
        const angle = (i / pedestalSkills.length) * Math.PI * 2
        const x = SKILLS.x + Math.cos(angle) * PEDESTAL_RADIUS
        const z = SKILLS.z + Math.sin(angle) * PEDESTAL_RADIUS
        return (
          <Pedestal
            key={skill.id}
            skill={skill}
            position={[x, 0, z]}
            onHover={onHover}
          />
        )
      })}

      {/* Spotlights aimed at pedestal positions */}
      {pedestalSkills.map((skill, i) => {
        const angle = (i / pedestalSkills.length) * Math.PI * 2
        const x = SKILLS.x + Math.cos(angle) * PEDESTAL_RADIUS
        const z = SKILLS.z + Math.sin(angle) * PEDESTAL_RADIUS
        return (
          <MuseumSpotlight
            key={`spot-${skill.id}`}
            position={[x, SKILLS.height - 0.5, z]}
            target={[x, 0.5, z]}
            color="#e0e8ff"
            intensity={1.5}
            angle={0.5}
            penumbra={0.6}
            distance={8}
          />
        )
      })}

      {/* Center floor ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[SKILLS.x, 0.01, SKILLS.z]}>
        <ringGeometry args={[PEDESTAL_RADIUS - 0.5, PEDESTAL_RADIUS + 0.5, 64]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.08}
          transparent
          opacity={0.25}
        />
      </mesh>
    </>
  )
}
