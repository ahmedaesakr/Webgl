export const LOBBY_SIZE = {
  width: 14,
  depth: 14,
  height: 4,
  wallThickness: 0.6,
}

export const PLAYER_RADIUS = 0.35

const halfWidth = LOBBY_SIZE.width / 2
const halfDepth = LOBBY_SIZE.depth / 2
const halfWall = LOBBY_SIZE.wallThickness / 2

export const ROOM_AABBS = [
  {
    name: 'LOBBY',
    minX: -halfWidth,
    maxX: halfWidth,
    minZ: -halfDepth,
    maxZ: halfDepth,
  },
]

export const WALL_COLLIDERS = [
  {
    id: 'north-wall',
    minX: -halfWidth,
    maxX: halfWidth,
    minZ: -halfDepth - halfWall,
    maxZ: -halfDepth + halfWall,
  },
  {
    id: 'south-wall',
    minX: -halfWidth,
    maxX: halfWidth,
    minZ: halfDepth - halfWall,
    maxZ: halfDepth + halfWall,
  },
  {
    id: 'west-wall',
    minX: -halfWidth - halfWall,
    maxX: -halfWidth + halfWall,
    minZ: -halfDepth,
    maxZ: halfDepth,
  },
  {
    id: 'east-wall',
    minX: halfWidth - halfWall,
    maxX: halfWidth + halfWall,
    minZ: -halfDepth,
    maxZ: halfDepth,
  },
]
