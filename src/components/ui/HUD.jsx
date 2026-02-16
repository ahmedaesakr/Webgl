export default function HUD({ pointerLocked, currentRoom }) {
  return (
    <div className="hud-layer" aria-hidden="true">
      <div className="hud-room glass-card">{currentRoom}</div>
      {pointerLocked ? <div className="crosshair">+</div> : null}
      {!pointerLocked ? <div className="hud-enter glass-card">Click anywhere in the scene to enter</div> : null}
      <div className="hud-controls glass-card">WASD / Arrows move · Mouse look · Shift run · E interact</div>
    </div>
  )
}
