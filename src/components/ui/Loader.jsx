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
        <h1 className="loader-title">Entering Museum...</h1>
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
