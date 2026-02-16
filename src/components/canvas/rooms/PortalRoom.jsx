import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { GALLERY } from './GalleryRoom'

const HALF_DOOR = DOOR_WIDTH / 2

export const PORTAL = {
  width: 8,
  depth: 8,
  height: 6,
  x: GALLERY.x,
  z: GALLERY.z + GALLERY.depth / 2 + 8 / 2,
}

export default function PortalRoom() {
  return (
    <RoomShell
      width={PORTAL.width}
      depth={PORTAL.depth}
      height={PORTAL.height}
      position={[PORTAL.x, 0, PORTAL.z]}
      doorGaps={{
        north: [{ start: -HALF_DOOR, end: HALF_DOOR }],
      }}
    />
  )
}
