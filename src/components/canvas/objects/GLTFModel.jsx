import { Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

function GLTFModelInner({ url, position, rotation, scale, castShadow = true }) {
  const { scene } = useGLTF(url)

  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene)
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = true
      }
    })
    return cloned
  }, [scene, castShadow])

  return (
    <primitive
      object={clone}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export function preloadModel(url) {
  useGLTF.preload(url)
}

export default function GLTFModel(props) {
  return (
    <Suspense fallback={null}>
      <GLTFModelInner {...props} />
    </Suspense>
  )
}
