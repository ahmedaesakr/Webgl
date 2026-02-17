import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setVisible(false), 800)
      return () => clearTimeout(timer)
    }
  }, [active, progress])

  // Safety timeout: force hide after 8 seconds
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (visible) setVisible(false)
    }, 8000)
    return () => clearTimeout(safetyTimer)
  }, [visible])

  if (!visible) return null

  return (
    <div className={`loader-overlay ${!active ? 'loader-fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6366f1" strokeWidth="1.5">
            <rect x="8" y="16" width="32" height="24" rx="2" />
            <path d="M14 16V12a10 10 0 0 1 20 0v4" />
            <line x1="24" y1="28" x2="24" y2="34" />
          </svg>
        </div>
        <h1 className="loader-title">Ahmed Sakr</h1>
        <p className="loader-subtitle">Building your experience...</p>
        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loader-progress">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
