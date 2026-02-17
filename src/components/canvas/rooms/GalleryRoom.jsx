import { useMemo } from 'react'
import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'
import MuseumSpotlight from '../objects/MuseumSpotlight'
import WallFrame from '../objects/WallFrame'
import WallPanel from '../objects/WallPanel'
import MuseumBench from '../objects/MuseumBench'
import RopeBarrier from '../objects/RopeBarrier'
import { projects } from '@/data/portfolio'
import { createDarkStoneTexture, createConcreteNormalTexture } from '@/utils/proceduralTextures'

const HALF_DOOR = DOOR_WIDTH / 2

export const GALLERY = {
  width: 8,
  depth: 30,
  height: 5,
  x: LOBBY.x + LOBBY.width / 2 + 8 / 2,
  z: 0,
}

const FRAME_Z = [-8, 0, 8]
const LEFT_WALL_X = GALLERY.x - GALLERY.width / 2 + 0.16
const RIGHT_WALL_X = GALLERY.x + GALLERY.width / 2 - 0.16

export default function GalleryRoom({ onSelectProject, onHover }) {
  const floorTex = useMemo(() => {
    const t = createDarkStoneTexture(512, 512)
    t.repeat.set(2, 7)
    return t
  }, [])
  const wallNormal = useMemo(() => {
    const t = createConcreteNormalTexture(256, 256)
    t.repeat.set(3, 2)
    return t
  }, [])

  return (
    <>
      <RoomShell
        width={GALLERY.width}
        depth={GALLERY.depth}
        height={GALLERY.height}
        position={[GALLERY.x, 0, GALLERY.z]}
        doorGaps={{
          west: [{ start: -HALF_DOOR, end: HALF_DOOR }],
          south: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        }}
        floorMaterialProps={{ map: floorTex, color: '#ffffff', roughness: 0.12, metalness: 0.15 }}
        wallMaterialProps={{ normalMap: wallNormal, normalScale: [0.3, 0.3] }}
      />
      {/* Left wall frames (facing right into room) */}
      {FRAME_Z.map((z, i) => (
        <WallFrame
          key={`left-${i}`}
          project={projects[i] || projects[0]}
          position={[LEFT_WALL_X, 2.2, z]}
          rotation={[0, Math.PI / 2, 0]}
          onClick={onSelectProject}
          onHover={onHover}
        />
      ))}
      {/* Right wall frames (facing left into room) */}
      {FRAME_Z.map((z, i) => (
        <WallFrame
          key={`right-${i}`}
          project={projects[i + 3] || projects[0]}
          position={[RIGHT_WALL_X, 2.2, z]}
          rotation={[0, -Math.PI / 2, 0]}
          onClick={onSelectProject}
          onHover={onHover}
        />
      ))}
      {/* Wall panels behind frames — left wall */}
      {FRAME_Z.map((z, i) => (
        <WallPanel
          key={`panel-left-${i}`}
          position={[LEFT_WALL_X + 0.01, 2.2, z]}
          rotation={[0, Math.PI / 2, 0]}
          width={3.4}
          height={2.4}
        />
      ))}
      {/* Wall panels behind frames — right wall */}
      {FRAME_Z.map((z, i) => (
        <WallPanel
          key={`panel-right-${i}`}
          position={[RIGHT_WALL_X - 0.01, 2.2, z]}
          rotation={[0, -Math.PI / 2, 0]}
          width={3.4}
          height={2.4}
        />
      ))}
      {/* Benches along center of gallery */}
      {FRAME_Z.map((z, i) => (
        <MuseumBench
          key={`bench-${i}`}
          position={[GALLERY.x, 0, z]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {/* Rope barriers flanking the walkway */}
      <RopeBarrier
        start={[GALLERY.x - 1.5, 0, -12]}
        end={[GALLERY.x - 1.5, 0, -4]}
      />
      <RopeBarrier
        start={[GALLERY.x + 1.5, 0, -12]}
        end={[GALLERY.x + 1.5, 0, -4]}
      />
      <RopeBarrier
        start={[GALLERY.x - 1.5, 0, 4]}
        end={[GALLERY.x - 1.5, 0, 12]}
      />
      <RopeBarrier
        start={[GALLERY.x + 1.5, 0, 4]}
        end={[GALLERY.x + 1.5, 0, 12]}
      />
      {/* Left wall spotlights */}
      {FRAME_Z.map((z, i) => (
        <MuseumSpotlight
          key={`spot-left-${i}`}
          position={[GALLERY.x - 2, GALLERY.height - 0.5, z]}
          target={[LEFT_WALL_X, 2.2, z]}
          color="#e8f0ff"
          intensity={1.5}
          angle={0.35}
          penumbra={0.4}
          distance={8}
        />
      ))}
      {/* Right wall spotlights */}
      {FRAME_Z.map((z, i) => (
        <MuseumSpotlight
          key={`spot-right-${i}`}
          position={[GALLERY.x + 2, GALLERY.height - 0.5, z]}
          target={[RIGHT_WALL_X, 2.2, z]}
          color="#e8f0ff"
          intensity={1.5}
          angle={0.35}
          penumbra={0.4}
          distance={8}
        />
      ))}
    </>
  )
}
