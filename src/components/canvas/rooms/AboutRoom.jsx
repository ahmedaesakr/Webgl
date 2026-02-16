import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'

const HALF_DOOR = DOOR_WIDTH / 2

export const ABOUT = {
  width: 8,
  depth: 8,
  height: 4,
  x: LOBBY.x - LOBBY.width / 2 - 8 / 2,
  z: 0,
}

export default function AboutRoom() {
  return (
    <RoomShell
      width={ABOUT.width}
      depth={ABOUT.depth}
      height={ABOUT.height}
      position={[ABOUT.x, 0, ABOUT.z]}
      doorGaps={{
        east: [{ start: -HALF_DOOR, end: HALF_DOOR }],
      }}
    />
  )
}
