import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generates a procedural ambient drone buffer — no external audio files needed.
 * Creates a soft, low-frequency hum with subtle harmonics that evokes
 * the quiet atmosphere of a museum.
 */
function generateAmbienceBuffer(audioCtx, duration = 8) {
  const sampleRate = audioCtx.sampleRate
  const length = sampleRate * duration
  const buffer = audioCtx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    // Layered sine waves at very low frequencies + subtle noise
    const drone =
      Math.sin(t * 2 * Math.PI * 55) * 0.12 +       // Low A (55 Hz)
      Math.sin(t * 2 * Math.PI * 82.5) * 0.06 +      // Harmonic
      Math.sin(t * 2 * Math.PI * 110) * 0.03 +        // Octave
      Math.sin(t * 2 * Math.PI * 0.2) * 0.04          // Very low rumble

    // Subtle filtered noise for air/room tone
    const noise = (Math.random() - 0.5) * 0.015

    // Smooth fade in/out for seamless loop
    let envelope = 1
    const fadeLen = sampleRate * 0.5
    if (i < fadeLen) envelope = i / fadeLen
    else if (i > length - fadeLen) envelope = (length - i) / fadeLen

    data[i] = (drone + noise) * envelope
  }

  return buffer
}

export default function AmbientAudio({ volume = 0.12, enabled = true }) {
  const { camera } = useThree()
  const audioRef = useRef(null)
  const listenerRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const listener = new THREE.AudioListener()
    listenerRef.current = listener
    camera.add(listener)

    const audio = new THREE.Audio(listener)
    audioRef.current = audio

    // Generate procedural ambience
    const buffer = generateAmbienceBuffer(listener.context)
    audio.setBuffer(buffer)
    audio.setLoop(true)
    audio.setVolume(volume)

    // Resume AudioContext on user interaction (browser autoplay policy)
    const resumeAudio = () => {
      if (listener.context.state === 'suspended') {
        listener.context.resume()
      }
      if (!audio.isPlaying) {
        audio.play()
      }
    }

    // Try to play, and also listen for user gesture to resume
    document.addEventListener('click', resumeAudio, { once: false })
    document.addEventListener('keydown', resumeAudio, { once: false })

    // Attempt immediate play
    if (listener.context.state === 'running') {
      audio.play()
    }

    return () => {
      document.removeEventListener('click', resumeAudio)
      document.removeEventListener('keydown', resumeAudio)
      if (audio.isPlaying) audio.stop()
      camera.remove(listener)
      audio.disconnect()
    }
  }, [camera, volume, enabled])

  return null
}
