import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'

const HALF_DOOR = DOOR_WIDTH / 2

export const LOBBY = { width: 14, depth: 14, height: 4, x: 0, z: 0 }

export default function Lobby() {
  return (
    <RoomShell
      width={LOBBY.width}
      depth={LOBBY.depth}
      height={LOBBY.height}
      position={[LOBBY.x, 0, LOBBY.z]}
      doorGaps={{
        north: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        east: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        west: [{ start: -HALF_DOOR, end: HALF_DOOR }],
      }}
    />
  )
}
