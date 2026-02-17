import { Text } from '@react-three/drei'
import ProjectShowcase from './ProjectShowcase'

const FRAME_WIDTH = 3
const FRAME_HEIGHT = 2
const FRAME_BORDER = 0.12
const FRAME_DEPTH = 0.08

export default function WallFrame({ project, position, rotation, onClick, onHover }) {
  const handlePointerOver = (e) => {
    e.stopPropagation()
    onHover?.(project.title)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    onHover?.(null)
    document.body.style.cursor = 'auto'
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Frame — top */}
      <mesh position={[0, FRAME_HEIGHT / 2 + FRAME_BORDER / 2, 0]} castShadow>
        <boxGeometry args={[FRAME_WIDTH + FRAME_BORDER * 2, FRAME_BORDER, FRAME_DEPTH]} />
        <meshStandardMaterial color="#2a1810" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Frame — bottom */}
      <mesh position={[0, -FRAME_HEIGHT / 2 - FRAME_BORDER / 2, 0]} castShadow>
        <boxGeometry args={[FRAME_WIDTH + FRAME_BORDER * 2, FRAME_BORDER, FRAME_DEPTH]} />
        <meshStandardMaterial color="#2a1810" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Frame — left */}
      <mesh position={[-FRAME_WIDTH / 2 - FRAME_BORDER / 2, 0, 0]} castShadow>
        <boxGeometry args={[FRAME_BORDER, FRAME_HEIGHT, FRAME_DEPTH]} />
        <meshStandardMaterial color="#2a1810" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Frame — right */}
      <mesh position={[FRAME_WIDTH / 2 + FRAME_BORDER / 2, 0, 0]} castShadow>
        <boxGeometry args={[FRAME_BORDER, FRAME_HEIGHT, FRAME_DEPTH]} />
        <meshStandardMaterial color="#2a1810" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Canvas — interactive with animated showcase */}
      <group
        position={[0, 0, -0.01]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => { e.stopPropagation(); onClick?.(project) }}
      >
        <ProjectShowcase
          color={project.color || '#6366f1'}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
        />
      </group>

      {/* Project title */}
      <Text
        position={[0, -FRAME_HEIGHT / 2 - FRAME_BORDER - 0.25, 0.01]}
        fontSize={0.14}
        color="#d7e8ff"
        anchorX="center"
        anchorY="top"
        maxWidth={FRAME_WIDTH}
      >
        {project.title}
      </Text>

      {/* Year */}
      <Text
        position={[0, -FRAME_HEIGHT / 2 - FRAME_BORDER - 0.5, 0.01]}
        fontSize={0.1}
        color="#8892b0"
        anchorX="center"
        anchorY="top"
      >
        {project.year?.toString() || ''}
      </Text>
    </group>
  )
}
