import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from '@/components/canvas/Experience'
import HUD from '@/components/ui/HUD'
import InteractionPrompt from '@/components/ui/InteractionPrompt'
import CustomCursor from '@/components/ui/CustomCursor'

function App() {
  const [pointerLocked, setPointerLocked] = useState(false)
  const [currentRoom, setCurrentRoom] = useState('LOBBY')

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
        <Experience onPointerLockChange={setPointerLocked} onRoomChange={setCurrentRoom} />
      </Canvas>

      <div className="ui-overlay">
        <HUD pointerLocked={pointerLocked} currentRoom={currentRoom} />
        <InteractionPrompt visible={false} text="Press E to view" />
      </div>
    </div>
  )
}

export default App
