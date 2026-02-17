import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'
import MuseumSpotlight from '../objects/MuseumSpotlight'
import WallFrame from '../objects/WallFrame'
import { projects } from '@/data/portfolio'

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
