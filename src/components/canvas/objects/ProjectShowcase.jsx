import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  // Horizontal scanlines
  float scanline = smoothstep(0.48, 0.5, fract(vUv.y * 30.0 - uTime * 0.5));
  // Grid pattern
  float gridX = smoothstep(0.48, 0.5, fract(vUv.x * 15.0));
  float gridY = smoothstep(0.48, 0.5, fract(vUv.y * 15.0 + uTime * 0.2));
  float grid = max(gridX, gridY) * 0.15;

  vec3 color = uColor * (0.3 + scanline * 0.1 + grid);
  float alpha = 0.85 + scanline * 0.15;
  gl_FragColor = vec4(color, alpha);
}
`

export default function ProjectShowcase({ color = '#6366f1', width = 3, height = 2 }) {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  )

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  )
}
