import { useState, useCallback, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from '@/components/canvas/Experience'
import HUD from '@/components/ui/HUD'
import InteractionPrompt from '@/components/ui/InteractionPrompt'
import CustomCursor from '@/components/ui/CustomCursor'
import ProjectModal from '@/components/ui/ProjectModal'
import Loader from '@/components/ui/Loader'
import PauseMenu from '@/components/ui/PauseMenu'

function App() {
  const [pointerLocked, setPointerLocked] = useState(false)
  const [currentRoom, setCurrentRoom] = useState('LOBBY')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showPause, setShowPause] = useState(false)
  const hasEnteredRef = useRef(false)

  const handlePointerLockChange = useCallback((locked) => {
    setPointerLocked(locked)
    if (locked) {
      hasEnteredRef.current = true
      setShowPause(false)
    } else if (hasEnteredRef.current) {
      // Small delay to let project selection fire first
      setTimeout(() => {
        setSelectedProject((current) => {
          if (!current) setShowPause(true)
          return current
        })
      }, 100)
    }
  }, [])

  const handleSelectProject = useCallback((project) => {
    document.exitPointerLock()
    setSelectedProject(project)
    setShowPause(false)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null)
    setShowPause(false)
  }, [])

  const handleResume = useCallback(() => {
    setShowPause(false)
    document.body.requestPointerLock()
  }, [])

  const handleResetPosition = useCallback(() => {
    setShowPause(false)
    window.dispatchEvent(new CustomEvent('resetPlayerPosition'))
    document.body.requestPointerLock()
  }, [])

  return (
    <div className="app-shell">
      <CustomCursor pointerLocked={pointerLocked} />
      <Canvas
        className="scene-canvas"
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Suspense fallback={null}>
          <Experience
            onPointerLockChange={handlePointerLockChange}
            onRoomChange={setCurrentRoom}
            onSelectProject={handleSelectProject}
          />
        </Suspense>
      </Canvas>

      <Loader />

      <div className="ui-overlay">
        <HUD pointerLocked={pointerLocked} currentRoom={currentRoom} />
        <InteractionPrompt visible={false} text="Press E to view" />
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}

      {showPause && !selectedProject && (
        <PauseMenu onResume={handleResume} onResetPosition={handleResetPosition} />
      )}
    </div>
  )
}

export default App
