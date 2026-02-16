import { useState, useEffect } from 'react'

const ROOM_LABELS = {
  LOBBY: 'Lobby',
  GALLERY: 'Gallery',
  SKILLS: 'Skills',
  ABOUT: 'About',
  PORTAL: 'Portal',
}

export default function HUD({ pointerLocked, currentRoom }) {
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (pointerLocked) {
      const timer = setTimeout(() => setShowControls(false), 10000)
      return () => clearTimeout(timer)
    } else {
      setShowControls(true)
    }
  }, [pointerLocked])

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
          WASD / Arrows move &middot; Mouse look &middot; Shift run &middot; E interact &middot; ESC pause
        </div>
      )}
    </div>
  )
}
