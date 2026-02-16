import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'

const HALF_DOOR = DOOR_WIDTH / 2

export const SKILLS = {
  width: 12,
  depth: 12,
  height: 5,
  x: 0,
  z: LOBBY.z - LOBBY.depth / 2 - 12 / 2,
}

export default function SkillsRoom() {
  return (
    <RoomShell
      width={SKILLS.width}
      depth={SKILLS.depth}
      height={SKILLS.height}
      position={[SKILLS.x, 0, SKILLS.z]}
      doorGaps={{
        south: [{ start: -HALF_DOOR, end: HALF_DOOR }],
      }}
    />
  )
}
