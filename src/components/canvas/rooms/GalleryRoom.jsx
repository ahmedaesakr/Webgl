import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'

const HALF_DOOR = DOOR_WIDTH / 2

export const GALLERY = {
  width: 8,
  depth: 30,
  height: 5,
  x: LOBBY.x + LOBBY.width / 2 + 8 / 2,
  z: 0,
}

export default function GalleryRoom() {
  return (
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
  )
}
