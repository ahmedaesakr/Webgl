import { useMemo } from 'react'
import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { GALLERY } from './GalleryRoom'
import Portal from '../objects/Portal'
import ContactOrb from '../objects/ContactOrb'
import { Text } from '@react-three/drei'
import { contact } from '@/data/portfolio'
import { createDarkStoneTexture, createConcreteNormalTexture } from '@/utils/proceduralTextures'

const HALF_DOOR = DOOR_WIDTH / 2

export const PORTAL = {
  width: 8,
  depth: 8,
  height: 6,
  x: GALLERY.x,
  z: GALLERY.z + GALLERY.depth / 2 + 8 / 2,
}

const CONTACT_LINKS = [
  { label: 'Email', href: `mailto:${contact.email}`, color: '#06b6d4' },
  { label: 'GitHub', href: contact.github, color: '#e2e8f0' },
  { label: 'LinkedIn', href: contact.linkedin, color: '#3b82f6' },
  { label: 'Twitter', href: contact.twitter, color: '#38bdf8' },
]

export default function PortalRoom() {
  const floorTex = useMemo(() => {
    const t = createDarkStoneTexture(512, 512)
    t.repeat.set(2, 2)
    return t
  }, [])
  const wallNormal = useMemo(() => {
    const t = createConcreteNormalTexture(256, 256)
    t.repeat.set(3, 2)
    return t
  }, [])

  return (
    <>
      <RoomShell
        width={PORTAL.width}
        depth={PORTAL.depth}
        height={PORTAL.height}
        position={[PORTAL.x, 0, PORTAL.z]}
        doorGaps={{
          north: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        }}
        floorMaterialProps={{ map: floorTex, color: '#ffffff', roughness: 0.12, metalness: 0.15 }}
        wallMaterialProps={{ normalMap: wallNormal, normalScale: [0.3, 0.3] }}
      />

      {/* "Let's Connect" title */}
      <Text
        position={[PORTAL.x, 4.5, PORTAL.z + 1]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        {"Let's Connect"}
        <meshStandardMaterial
          color="#ffffff"
          emissive="#a855f7"
          emissiveIntensity={0.4}
        />
      </Text>

      {/* Portal — centered in back of room */}
      <Portal
        position={[PORTAL.x, 2.5, PORTAL.z + 1]}
        colorA="#8b5cf6"
        colorB="#6366f1"
        radius={1.5}
      />

      {/* Contact orbs orbiting around the portal */}
      {CONTACT_LINKS.map((link, i) => {
        const angle = (i / CONTACT_LINKS.length) * Math.PI * 2
        const orbRadius = 2.8
        const x = PORTAL.x + Math.cos(angle) * orbRadius
        const z = PORTAL.z + 1 + Math.sin(angle) * orbRadius
        return (
          <ContactOrb
            key={link.label}
            position={[x, 2.2 + (i % 2) * 0.5, z]}
            label={link.label}
            color={link.color}
            href={link.href}
          />
        )
      })}

      {/* Floor glow ring under portal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[PORTAL.x, 0.01, PORTAL.z + 1]}>
        <ringGeometry args={[1.2, 1.8, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.15}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Dramatic purple/blue point lights */}
      <pointLight
        position={[PORTAL.x - 2, 4, PORTAL.z - 2]}
        color="#8b5cf6"
        intensity={1.5}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[PORTAL.x + 2, 4, PORTAL.z + 2]}
        color="#6366f1"
        intensity={1.5}
        distance={10}
        decay={2}
      />
      {/* Portal glow */}
      <pointLight
        position={[PORTAL.x, 2.5, PORTAL.z + 1]}
        color="#a855f7"
        intensity={2}
        distance={6}
        decay={2}
      />
    </>
  )
}
