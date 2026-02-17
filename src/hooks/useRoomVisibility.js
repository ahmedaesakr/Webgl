/**
 * Determines which rooms should render their full content based on player proximity.
 * Current room + adjacent rooms get full content. Distant rooms render walls only.
 */

const ADJACENCY = {
  LOBBY: ['GALLERY', 'ABOUT', 'SKILLS'],
  GALLERY: ['LOBBY', 'PORTAL'],
  ABOUT: ['LOBBY'],
  SKILLS: ['LOBBY'],
  PORTAL: ['GALLERY'],
}

export default function useRoomVisibility(currentRoom) {
  const adjacent = ADJACENCY[currentRoom] || []
  const visible = new Set([currentRoom, ...adjacent])

  return {
    lobby: visible.has('LOBBY'),
    gallery: visible.has('GALLERY'),
    about: visible.has('ABOUT'),
    skills: visible.has('SKILLS'),
    portal: visible.has('PORTAL'),
  }
}
