import Lobby, { LOBBY } from './rooms/Lobby'
import GalleryRoom, { GALLERY } from './rooms/GalleryRoom'
import AboutRoom, { ABOUT } from './rooms/AboutRoom'
import SkillsRoom, { SKILLS } from './rooms/SkillsRoom'
import PortalRoom, { PORTAL } from './rooms/PortalRoom'
import Door from './objects/Door'
import useRoomVisibility from '@/hooks/useRoomVisibility'

export default function Museum({ onSelectProject, onHover, currentRoom = 'LOBBY' }) {
  const visible = useRoomVisibility(currentRoom)

  return (
    <group>
      {/* Rooms — only render content for nearby rooms */}
      {visible.lobby && <Lobby />}
      {visible.gallery && <GalleryRoom onSelectProject={onSelectProject} onHover={onHover} />}
      {visible.about && <AboutRoom />}
      {visible.skills && <SkillsRoom onHover={onHover} />}
      {visible.portal && <PortalRoom onHover={onHover} />}

      {/* Door: Lobby → Gallery (east wall of lobby) */}
      <Door
        position={[LOBBY.x + LOBBY.width / 2, 0, LOBBY.z]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Door: Lobby → About (west wall of lobby) */}
      <Door
        position={[LOBBY.x - LOBBY.width / 2, 0, LOBBY.z]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Door: Lobby → Skills (north wall of lobby) */}
      <Door
        position={[LOBBY.x, 0, LOBBY.z - LOBBY.depth / 2]}
      />

      {/* Door: Gallery → Portal (south wall of gallery) */}
      <Door
        position={[GALLERY.x, 0, GALLERY.z + GALLERY.depth / 2]}
      />
    </group>
  )
}
