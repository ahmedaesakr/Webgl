import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { LOBBY_SIZE, PLAYER_RADIUS, ROOM_AABBS, WALL_COLLIDERS } from '@/data/museumBounds'

const LOOK_SENSITIVITY = 0.002
const WALK_SPEED = 3
const RUN_SPEED = 5
const MAX_PITCH = THREE.MathUtils.degToRad(80)
const EYE_HEIGHT = 1.6
const HEAD_BOB_FREQ = 10
const HEAD_BOB_AMP = 0.03

function intersectsAABB(x, z, radius, aabb) {
  return (
    x + radius > aabb.minX &&
    x - radius < aabb.maxX &&
    z + radius > aabb.minZ &&
    z - radius < aabb.maxZ
  )
}

function collidesWithWalls(x, z) {
  return WALL_COLLIDERS.some((wall) => intersectsAABB(x, z, PLAYER_RADIUS, wall))
}

function getRoomName(x, z) {
  const room = ROOM_AABBS.find((candidate) => intersectsAABB(x, z, 0.01, candidate))
  return room ? room.name : 'UNKNOWN'
}

export default function usePlayerMovement({ camera, keysRef, mouseDeltaRef, isLocked, onRoomChange }) {
  const positionRef = useRef(new THREE.Vector3(0, EYE_HEIGHT, LOBBY_SIZE.depth / 2 - 2))
  const rotationRef = useRef({ yaw: 0, pitch: 0 })
  const movementStateRef = useRef({ isMoving: false, currentRoom: 'LOBBY' })
  const headBobRef = useRef({ timer: 0, offset: 0 })

  const basis = useMemo(
    () => ({
      forward: new THREE.Vector3(),
      right: new THREE.Vector3(),
      next: new THREE.Vector3(),
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!isLocked) {
      camera.position.copy(positionRef.current)
      camera.rotation.set(rotationRef.current.pitch, rotationRef.current.yaw, 0, 'YXZ')
      return
    }

    const mouseDelta = mouseDeltaRef.current
    rotationRef.current.yaw -= mouseDelta.x * LOOK_SENSITIVITY
    rotationRef.current.pitch -= mouseDelta.y * LOOK_SENSITIVITY
    rotationRef.current.pitch = THREE.MathUtils.clamp(rotationRef.current.pitch, -MAX_PITCH, MAX_PITCH)
    mouseDelta.x = 0
    mouseDelta.y = 0

    const keys = keysRef.current
    const forwardInput = Number(keys.forward) - Number(keys.backward)
    const strafeInput = Number(keys.right) - Number(keys.left)

    basis.forward.set(Math.sin(rotationRef.current.yaw), 0, -Math.cos(rotationRef.current.yaw))
    basis.right.set(Math.cos(rotationRef.current.yaw), 0, Math.sin(rotationRef.current.yaw))

    basis.next
      .copy(basis.forward)
      .multiplyScalar(forwardInput)
      .addScaledVector(basis.right, strafeInput)

    const isMoving = basis.next.lengthSq() > 0
    if (isMoving) {
      basis.next.normalize()
      const speed = keys.run ? RUN_SPEED : WALK_SPEED
      const distance = speed * delta

      const nextX = positionRef.current.x + basis.next.x * distance
      const nextZ = positionRef.current.z + basis.next.z * distance

      if (!collidesWithWalls(nextX, positionRef.current.z)) {
        positionRef.current.x = nextX
      }

      if (!collidesWithWalls(positionRef.current.x, nextZ)) {
        positionRef.current.z = nextZ
      }
    }

    movementStateRef.current.isMoving = isMoving

    if (isMoving) {
      headBobRef.current.timer += delta * HEAD_BOB_FREQ
      headBobRef.current.offset = Math.sin(headBobRef.current.timer) * HEAD_BOB_AMP
    } else {
      headBobRef.current.timer = 0
      headBobRef.current.offset *= 0.85
    }

    const nextRoom = getRoomName(positionRef.current.x, positionRef.current.z)
    if (nextRoom !== movementStateRef.current.currentRoom) {
      movementStateRef.current.currentRoom = nextRoom
      onRoomChange?.(nextRoom)
    }

    positionRef.current.y = EYE_HEIGHT + headBobRef.current.offset

    camera.position.copy(positionRef.current)
    camera.rotation.set(rotationRef.current.pitch, rotationRef.current.yaw, 0, 'YXZ')
  })

  return {
    position: positionRef,
    rotation: rotationRef,
    isMoving: movementStateRef.current.isMoving,
    currentRoom: movementStateRef.current.currentRoom,
  }
}
