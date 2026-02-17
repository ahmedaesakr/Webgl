import { useState, useEffect } from 'react'

const ROOM_LABELS = {
  LOBBY: 'Lobby',
  GALLERY: 'Gallery',
  SKILLS: 'Skills',
  ABOUT: 'About',
  PORTAL: 'Portal',
}

// Minimap room layout — positions are scaled and centered for the SVG viewport
const MINIMAP_ROOMS = [
  { id: 'LOBBY', x: 50, y: 50, w: 28, h: 28, label: 'L' },
  { id: 'GALLERY', x: 82, y: 50, w: 16, h: 60, label: 'G' },
  { id: 'ABOUT', x: 18, y: 50, w: 16, h: 16, label: 'A' },
  { id: 'SKILLS', x: 50, y: 14, w: 24, h: 24, label: 'S' },
  { id: 'PORTAL', x: 82, y: 90, w: 16, h: 16, label: 'P' },
]

export default function HUD({ pointerLocked, currentRoom }) {
  const [showControls, setShowControls] = useState(true)
  const [showMinimap, setShowMinimap] = useState(true)

  useEffect(() => {
    if (pointerLocked) {
      const timer = setTimeout(() => setShowControls(false), 10000)
      return () => clearTimeout(timer)
    } else {
      setShowControls(true)
    }
  }, [pointerLocked])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'KeyM') setShowMinimap((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="hud-layer" aria-hidden="true">
      <div className="hud-room glass-card">
        {ROOM_LABELS[currentRoom] || currentRoom}
      </div>

      {pointerLocked && <div className="crosshair">+</div>}

      {!pointerLocked && (
        <div className="hud-enter glass-card">
          Click anywhere in the scene to enter
        </div>
      )}

      {pointerLocked && (
        <div className={`hud-controls glass-card ${!showControls ? 'hud-controls-hidden' : ''}`}>
          WASD / Arrows move &middot; Mouse look &middot; Shift run &middot; E interact &middot; M map &middot; ESC pause
        </div>
      )}

      {/* Minimap */}
      {pointerLocked && showMinimap && (
        <div className="minimap glass-card">
          <svg viewBox="0 0 120 120" width="100" height="100">
            {MINIMAP_ROOMS.map((room) => (
              <g key={room.id}>
                <rect
                  x={room.x - room.w / 2}
                  y={room.y - room.h / 2}
                  width={room.w}
                  height={room.h}
                  fill={currentRoom === room.id ? 'rgba(99, 102, 241, 0.5)' : 'rgba(30, 30, 50, 0.6)'}
                  stroke={currentRoom === room.id ? '#6366f1' : '#3a3a5c'}
                  strokeWidth={currentRoom === room.id ? 1.5 : 0.5}
                  rx={2}
                />
                <text
                  x={room.x}
                  y={room.y + 3}
                  textAnchor="middle"
                  fill={currentRoom === room.id ? '#fff' : '#8892b0'}
                  fontSize={8}
                  fontFamily="system-ui, sans-serif"
                >
                  {room.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  )
}
