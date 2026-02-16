// ─── Room dimensions & positions ─────────────────────────────────
// Must match the values in each room component

const DOOR_WIDTH = 2.5
const HALF_DOOR = DOOR_WIDTH / 2
const WT = 0.15 // wall half-thickness for collider shells

export const LOBBY_SIZE = { width: 14, depth: 14, height: 4, wallThickness: 0.3 }

const LOBBY  = { w: 14, d: 14, x: 0,   z: 0 }
const GALLERY = { w: 8,  d: 30, x: LOBBY.x + LOBBY.w / 2 + 4, z: 0 }
const ABOUT  = { w: 8,  d: 8,  x: LOBBY.x - LOBBY.w / 2 - 4,  z: 0 }
const SKILLS = { w: 12, d: 12, x: 0,   z: LOBBY.z - LOBBY.d / 2 - 6 }
const PORTAL = { w: 8,  d: 8,  x: GALLERY.x, z: GALLERY.z + GALLERY.d / 2 + 4 }

export const PLAYER_RADIUS = 0.35

// ─── Room detection AABBs ────────────────────────────────────────

function roomAABB(name, r) {
  return {
    name,
    minX: r.x - r.w / 2,
    maxX: r.x + r.w / 2,
    minZ: r.z - r.d / 2,
    maxZ: r.z + r.d / 2,
  }
}

export const ROOM_AABBS = [
  roomAABB('LOBBY', LOBBY),
  roomAABB('GALLERY', GALLERY),
  roomAABB('ABOUT', ABOUT),
  roomAABB('SKILLS', SKILLS),
  roomAABB('PORTAL', PORTAL),
]

// ─── Wall colliders ──────────────────────────────────────────────
// Each wall is a thin AABB. Doorway gaps split walls into segments.

function wallsForRoom(prefix, r, gaps = {}) {
  const hw = r.w / 2
  const hd = r.d / 2
  const colliders = []

  // North wall (runs along X at z = r.z - hd)
  const northGaps = gaps.north || []
  const northSegs = splitWall(-hw, hw, northGaps)
  northSegs.forEach((s, i) => {
    colliders.push({
      id: `${prefix}-north-${i}`,
      minX: r.x + s.start,
      maxX: r.x + s.end,
      minZ: r.z - hd - WT,
      maxZ: r.z - hd + WT,
    })
  })

  // South wall
  const southGaps = gaps.south || []
  const southSegs = splitWall(-hw, hw, southGaps)
  southSegs.forEach((s, i) => {
    colliders.push({
      id: `${prefix}-south-${i}`,
      minX: r.x + s.start,
      maxX: r.x + s.end,
      minZ: r.z + hd - WT,
      maxZ: r.z + hd + WT,
    })
  })

  // West wall (runs along Z at x = r.x - hw)
  const westGaps = gaps.west || []
  const westSegs = splitWall(-hd, hd, westGaps)
  westSegs.forEach((s, i) => {
    colliders.push({
      id: `${prefix}-west-${i}`,
      minX: r.x - hw - WT,
      maxX: r.x - hw + WT,
      minZ: r.z + s.start,
      maxZ: r.z + s.end,
    })
  })

  // East wall
  const eastGaps = gaps.east || []
  const eastSegs = splitWall(-hd, hd, eastGaps)
  eastSegs.forEach((s, i) => {
    colliders.push({
      id: `${prefix}-east-${i}`,
      minX: r.x + hw - WT,
      maxX: r.x + hw + WT,
      minZ: r.z + s.start,
      maxZ: r.z + s.end,
    })
  })

  return colliders
}

function splitWall(start, end, gaps) {
  if (gaps.length === 0) return [{ start, end }]
  const sorted = [...gaps].sort((a, b) => a.start - b.start)
  const segs = []
  let cursor = start
  for (const gap of sorted) {
    if (gap.start > cursor) segs.push({ start: cursor, end: gap.start })
    cursor = gap.end
  }
  if (cursor < end) segs.push({ start: cursor, end })
  return segs
}

const doorGap = [{ start: -HALF_DOOR, end: HALF_DOOR }]

export const WALL_COLLIDERS = [
  // Lobby: doors on north, east, west
  ...wallsForRoom('lobby', LOBBY, {
    north: doorGap,
    east: doorGap,
    west: doorGap,
  }),

  // Gallery: door on west (to lobby) and south (to portal)
  ...wallsForRoom('gallery', GALLERY, {
    west: doorGap,
    south: doorGap,
  }),

  // About: door on east (to lobby)
  ...wallsForRoom('about', ABOUT, {
    east: doorGap,
  }),

  // Skills: door on south (to lobby)
  ...wallsForRoom('skills', SKILLS, {
    south: doorGap,
  }),

  // Portal: door on north (to gallery)
  ...wallsForRoom('portal', PORTAL, {
    north: doorGap,
  }),
]
