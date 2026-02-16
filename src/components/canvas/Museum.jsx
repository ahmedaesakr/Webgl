import Lobby, { LOBBY } from './rooms/Lobby'
import GalleryRoom, { GALLERY } from './rooms/GalleryRoom'
import AboutRoom, { ABOUT } from './rooms/AboutRoom'
import SkillsRoom, { SKILLS } from './rooms/SkillsRoom'
import PortalRoom, { PORTAL } from './rooms/PortalRoom'
import Door from './objects/Door'

export default function Museum() {
  return (
    <group>
      {/* Rooms */}
      <Lobby />
      <GalleryRoom />
      <AboutRoom />
      <SkillsRoom />
      <PortalRoom />

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
