export default function PauseMenu({ onResume, onResetPosition }) {
  return (
    <div className="pause-overlay">
      <div className="pause-menu glass-card">
        <h2 className="pause-title">Paused</h2>
        <button className="pause-btn" onClick={onResume}>
          Resume
        </button>
        <button className="pause-btn pause-btn-secondary" onClick={onResetPosition}>
          Reset Position
        </button>
        <p className="pause-hint">Click Resume or press ESC</p>
      </div>
    </div>
  )
}
