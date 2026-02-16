import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { GALLERY } from './GalleryRoom'
import Portal from '../objects/Portal'
import { Text, Html } from '@react-three/drei'
import { contact } from '@/data/portfolio'

const HALF_DOOR = DOOR_WIDTH / 2

export const PORTAL = {
  width: 8,
  depth: 8,
  height: 6,
  x: GALLERY.x,
  z: GALLERY.z + GALLERY.depth / 2 + 8 / 2,
}

const CONTACT_LINKS = [
  { label: 'Email', href: `mailto:${contact.email}`, icon: '\u2709' },
  { label: 'GitHub', href: contact.github, icon: '\u2B22' },
  { label: 'LinkedIn', href: contact.linkedin, icon: 'in' },
  { label: 'Twitter', href: contact.twitter, icon: '\u2B22' },
]

export default function PortalRoom() {
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

      {/* Contact cards around portal */}
      <Html
        position={[PORTAL.x - 2.8, 2.5, PORTAL.z + 1]}
        distanceFactor={4}
        transform
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {CONTACT_LINKS.slice(0, 2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                padding: '10px 16px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '8px',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '12px',
                transition: 'border-color 0.3s',
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '14px', marginRight: '6px' }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </Html>

      <Html
        position={[PORTAL.x + 2.8, 2.5, PORTAL.z + 1]}
        distanceFactor={4}
        transform
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {CONTACT_LINKS.slice(2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                padding: '10px 16px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '8px',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '12px',
                transition: 'border-color 0.3s',
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '14px', marginRight: '6px' }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </Html>

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
