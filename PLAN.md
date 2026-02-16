# 🏛️ WebGL Three.js — 3D Portfolio Museum
# Full Implementation Plan

> **Concept:** A first-person controllable 3D museum/gallery where the visitor walks through themed rooms to explore your portfolio. Projects hang on walls as framed artworks, skills are displayed as interactive sculptures, and the contact section is a glowing portal at the end.
>
> **Stack:** Vite + React + React Three Fiber + Drei + GSAP + Lenis
>
> **Control:** WASD/Arrow keys to move, Mouse to look around, Click to interact

---

## 📂 Current Project State

The project is already scaffolded with Vite + React + R3F. The following files exist and will be **refactored** for the museum concept:

### ✅ Files to KEEP (reuse as-is or with minor changes)
```
src/main.jsx                    ← Entry point (keep)
src/styles/index.css            ← Will be heavily updated
src/data/portfolio.js           ← Will be expanded with museum content
src/hooks/useMousePosition.js   ← Keep for camera look
src/utils/helpers.js            ← Keep
vite.config.js                  ← Keep
package.json                    ← Keep (all deps already installed)
```

### 🔄 Files to REFACTOR (same file, new content)
```
src/App.jsx                     ← Remove scroll overlay, add museum UI
src/components/canvas/Experience.jsx     ← Museum scene wrapper
src/components/canvas/CameraRig.jsx      ← Replace with first-person controls
src/components/canvas/Particles.jsx      ← Ambient dust in museum
src/components/canvas/HeroScene.jsx      ← Becomes museum entrance/lobby
src/components/canvas/Effects.jsx        ← Museum-tuned post-processing
src/components/ui/Loader.jsx             ← Museum-themed loader
src/components/ui/Navbar.jsx             ← Minimal HUD instead
src/components/ui/CustomCursor.jsx       ← Crosshair/interaction cursor
```

### 🗑️ Files to REMOVE (not needed in museum concept)
```
src/components/ui/HeroOverlay.jsx        ← Replaced by 3D entrance
src/components/ui/AboutSection.jsx       ← Content moves to 3D room
src/components/ui/ProjectsSection.jsx    ← Content moves to 3D gallery
src/components/ui/SkillsSection.jsx      ← Content moves to 3D room
src/components/ui/ContactSection.jsx     ← Content moves to 3D portal
src/components/ui/Footer.jsx             ← Not needed
src/components/shared/Section.jsx        ← Not needed (no scroll sections)
src/components/shared/AnimatedText.jsx   ← May repurpose
src/components/canvas/ProjectCards3D.jsx ← Replaced by wall frames
src/components/canvas/SkillsOrbit.jsx    ← Replaced by sculptures
src/components/canvas/ContactScene.jsx   ← Replaced by portal room
src/components/canvas/FloatingText.jsx   ← May repurpose
src/hooks/useScrollProgress.js           ← Not needed (no scroll)
src/hooks/useSmoothScroll.js             ← Not needed (no scroll)
```

### 🆕 Files to CREATE
```
src/components/canvas/Museum.jsx             ← Master museum layout
src/components/canvas/rooms/Lobby.jsx        ← Entrance/welcome room
src/components/canvas/rooms/GalleryRoom.jsx  ← Projects gallery hall
src/components/canvas/rooms/SkillsRoom.jsx   ← Skills exhibition room
src/components/canvas/rooms/AboutRoom.jsx    ← About me room
src/components/canvas/rooms/PortalRoom.jsx   ← Contact portal room
src/components/canvas/objects/WallFrame.jsx  ← Framed project on wall
src/components/canvas/objects/Pedestal.jsx   ← Skill sculpture pedestal
src/components/canvas/objects/InfoPanel.jsx  ← Floating info panel (drei Html)
src/components/canvas/objects/Door.jsx       ← Door/archway between rooms
src/components/canvas/objects/Spotlight.jsx  ← Museum spotlight
src/components/canvas/PlayerController.jsx   ← WASD + Mouse first-person controller
src/components/ui/HUD.jsx                    ← Heads-up display (minimap, room name)
src/components/ui/InteractionPrompt.jsx      ← "Press E to view" prompt
src/components/ui/ProjectModal.jsx           ← Full project details overlay
src/hooks/useKeyboard.js                     ← Keyboard input state
src/hooks/usePlayerMovement.js               ← Movement + collision logic
```

---

## 📐 Museum Layout (Bird's Eye View)

```
                    ┌──────────────────────┐
                    │    PORTAL ROOM       │
                    │   (Contact/Social)   │
                    │   Glowing portal     │
                    └────────┬─────────────┘
                             │ archway
                    ┌────────┴─────────────┐
                    │    SKILLS ROOM       │
                    │  Pedestals + Orbs    │
                    │  Floating labels     │
                    └────────┬─────────────┘
                             │ archway
   ┌─────────────┐ ┌────────┴─────────────┐ ┌─────────────┐
   │  ABOUT ROOM │─│    GALLERY HALL      │─│  GALLERY    │
   │  (Bio, pic) │ │  (Main project wall) │ │  WING 2     │
   │             │ │  Long corridor       │ │  (More art) │
   └─────────────┘ └────────┬─────────────┘ └─────────────┘
                             │ grand entrance
                    ┌────────┴─────────────┐
                    │       LOBBY          │
                    │  Welcome + Name      │
                    │  ★ Player starts here│
                    └──────────────────────┘
```

---

## 📚 Three.js Skills Reference

Skills are located in `./skills-repo/skills/`. Each phase specifies which to read.

| Skill File | Path |
|-----------|------|
| `threejs-fundamentals` | `./skills-repo/skills/threejs-fundamentals/SKILL.md` |
| `threejs-geometry` | `./skills-repo/skills/threejs-geometry/SKILL.md` |
| `threejs-materials` | `./skills-repo/skills/threejs-materials/SKILL.md` |
| `threejs-lighting` | `./skills-repo/skills/threejs-lighting/SKILL.md` |
| `threejs-textures` | `./skills-repo/skills/threejs-textures/SKILL.md` |
| `threejs-animation` | `./skills-repo/skills/threejs-animation/SKILL.md` |
| `threejs-loaders` | `./skills-repo/skills/threejs-loaders/SKILL.md` |
| `threejs-shaders` | `./skills-repo/skills/threejs-shaders/SKILL.md` |
| `threejs-postprocessing` | `./skills-repo/skills/threejs-postprocessing/SKILL.md` |
| `threejs-interaction` | `./skills-repo/skills/threejs-interaction/SKILL.md` |

Raw URLs (for AI assistants without file access):
```
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-fundamentals/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-geometry/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-materials/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-lighting/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-textures/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-animation/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-loaders/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-shaders/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-postprocessing/SKILL.md
https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-interaction/SKILL.md
```

---

## 📋 Implementation Phases

---

### PHASE 1: First-Person Player Controller
**⏱️ Priority:** HIGHEST — everything depends on this
**📚 Skills to READ FIRST:**
- 🔴 `threejs-fundamentals/SKILL.md` — Scene, Camera, Object3D
- 🔴 `threejs-interaction/SKILL.md` — Camera controls, input handling

#### What to build:

1. **`src/hooks/useKeyboard.js`** — Keyboard state tracker:
   ```js
   // Track which keys are currently pressed
   // Returns object: { forward, backward, left, right, interact }
   // Keys: W/ArrowUp = forward, S/ArrowDown = backward
   //       A/ArrowLeft = left, D/ArrowRight = right
   //       E = interact, Shift = run
   ```
   - Use `keydown` and `keyup` event listeners
   - Store state in a `useRef` to avoid re-renders
   - Clean up listeners on unmount

2. **`src/hooks/usePlayerMovement.js`** — Movement logic:
   ```js
   // Reads keyboard state + mouse delta
   // Updates camera position and rotation each frame
   // Handles collision detection with walls
   // Returns: { position, rotation, isMoving, currentRoom }
   ```
   - Movement speed: `3.0` units/sec (walk), `5.0` (run with Shift)
   - Mouse sensitivity: `0.002` radians per pixel
   - Use `useFrame` to update every frame
   - Clamp vertical look to prevent flipping (±80 degrees)
   - Lock Y position at eye-height (1.6 units above floor)

3. **`src/components/canvas/PlayerController.jsx`**:
   - Requests pointer lock on canvas click (`document.body.requestPointerLock()`)
   - Listens to `mousemove` events for camera rotation
   - Uses `usePlayerMovement` hook for WASD movement
   - Shows crosshair cursor when pointer is locked
   - Shows "Click to enter" message when not locked

4. **Update `src/App.jsx`**:
   - Remove ALL scroll-based UI overlay sections (HeroOverlay, AboutSection, ProjectsSection, SkillsSection, ContactSection, Footer)
   - Keep only: Canvas (full screen) + HUD overlay + InteractionPrompt
   - Canvas should be 100vw × 100vh, no scrolling
   - Add click handler to request pointer lock

5. **Simple collision detection:**
   - Define room boundaries as axis-aligned bounding boxes (AABB)
   - Before updating player position, check if new position is inside any wall
   - If collision detected, slide along the wall (cancel only the blocked axis)
   - Store boundaries in a shared data structure (array of wall segments)

#### ✅ Checkpoint: Player can look around with mouse and walk with WASD in an empty dark Scene. Pointer lock works on click.

---

### PHASE 2: Museum Architecture — Floors, Walls, Ceilings
**⏱️ Priority:** HIGH — creates the space to fill
**📚 Skills to READ FIRST:**
- 🔴 `threejs-geometry/SKILL.md` — BoxGeometry, PlaneGeometry for walls/floors
- 🔴 `threejs-materials/SKILL.md` — MeshStandardMaterial, MeshPhysicalMaterial
- 🔴 `threejs-textures/SKILL.md` — Texture loading, UV mapping, repeat patterns
- 🟡 `threejs-lighting/SKILL.md` — Museum lighting setup

#### What to build:

1. **`src/components/canvas/Museum.jsx`** — Master museum layout:
   - This component composes ALL rooms together
   - Positions each room in world space according to the layout diagram
   - Passes room metadata (boundaries, doorways) to collision system

2. **`src/components/canvas/rooms/Lobby.jsx`** — Entrance room:
   - Floor: dark marble/concrete plane (PlaneGeometry, rotated -90° on X)
   - Walls: 4 walls using BoxGeometry (thin boxes) or PlaneGeometry
   - Ceiling: same as floor, positioned above
   - Dimensions: ~10 × 10 × 4 (width × depth × height)
   - Materials:
     - Floor: `MeshStandardMaterial` with dark marble texture, roughness 0.3
     - Walls: dark concrete/plaster, roughness 0.7
     - Ceiling: dark with subtle pattern
   - Doorway opening: leave gap in one wall (toward GalleryRoom)
   - Content:
     - Large 3D text on back wall: Your name (use `<Text3D>` or `<Text>` from drei)
     - Subtitle: "Creative Developer"
     - Subtle spotlight on the text
     - Welcome message on a small floating info panel

3. **`src/components/canvas/rooms/GalleryRoom.jsx`** — Main hall:
   - Long corridor: ~8 × 30 × 5 (width × depth × height)
   - Higher ceiling for dramatic feel
   - Doorways: entrance from lobby, side doors to AboutRoom, exit to SkillsRoom
   - Walls are where project frames will be mounted (Phase 4)
   - Benches in the middle (BoxGeometry, simple furniture)

4. **`src/components/canvas/rooms/AboutRoom.jsx`** — Side room:
   - Smaller intimate room: ~8 × 8 × 4
   - Connected to Gallery via side doorway
   - Will contain bio, photo, personal info (Phase 5)

5. **`src/components/canvas/rooms/SkillsRoom.jsx`** — Exhibition room:
   - Circular or hexagonal room: ~12 × 12 × 5
   - Connected to Gallery end
   - Will contain skill pedestals (Phase 6)

6. **`src/components/canvas/rooms/PortalRoom.jsx`** — Contact room:
   - Final room: ~8 × 8 × 6
   - Connected to Skills room
   - Dramatic lighting, will contain contact portal (Phase 7)

7. **`src/components/canvas/objects/Door.jsx`** — Archway between rooms:
   - Arched opening using BoxGeometry frame pieces
   - Subtle emissive glow on the arch edges
   - Optional: particle effect in doorway

8. **Museum lighting setup:**
   - Global ambient light: very low (0.1-0.15 intensity) — museum should feel dark
   - Individual spotlights per room (will be added per room in later phases)
   - Soft point lights near doorways for navigation guidance
   - No harsh shadows — use soft shadow maps

9. **Update `Experience.jsx`:**
   - Remove old HeroScene
   - Add `<Museum />` component
   - Keep Particles (reduce count, make them look like dust motes)
   - Update fog to match museum atmosphere: `args={['#050505', 1, 40]}`

10. **Update collision boundaries:**
    - Register each room's walls with the collision system
    - Doorways are gaps in the collision boundaries
    - Test walking through all rooms

#### ✅ Checkpoint: Walk through 5 connected empty rooms with proper walls, floors, ceilings, and archway doors. Dark museum atmosphere with subtle lighting.

---

### PHASE 3: Museum Lighting & Atmosphere
**⏱️ Priority:** HIGH — the feel of the museum
**📚 Skills to READ FIRST:**
- 🔴 `threejs-lighting/SKILL.md` — SpotLight, PointLight, shadow configuration
- 🔴 `threejs-postprocessing/SKILL.md` — Bloom, SSAO, Vignette
- 🟡 `threejs-shaders/SKILL.md` — Custom emissive effects

#### What to build:

1. **`src/components/canvas/objects/Spotlight.jsx`** — Museum spotlight:
   ```jsx
   // Configurable spotlight component
   // Props: position, target, color, intensity, angle
   // Creates a SpotLight aimed at a target point
   // Visible cone (optional with volumetric helper)
   // Casts soft shadows
   ```
   - Use `<SpotLight>` from drei (has built-in volumetric cone)
   - Each artwork/pedestal gets its own spotlight
   - Color temperature: warm white (#ffeedd) for art, cool blue (#aaddff) for skills

2. **Update `Effects.jsx`** — Museum post-processing:
   ```jsx
   <EffectComposer>
     <Bloom intensity={0.4} luminanceThreshold={0.8} />
     <Vignette offset={0.3} darkness={0.7} />
     {/* Optional: SSAO for depth */}
   </EffectComposer>
   ```
   - Bloom: make emissive elements (portals, signs) glow
   - Vignette: dark edges for cinematic focus
   - Subtle color grading (optional)

3. **Update `Particles.jsx`** — Dust motes:
   - Reduce to 500 particles
   - Much smaller size (0.005-0.01)
   - Slow drift (upward and sideways, like real dust)
   - Only visible when caught in spotlights
   - Very low opacity (0.15-0.3)

4. **Ambient audio (optional but premium):**
   - Soft museum ambiance sound (shoe echoes, quiet hum)
   - Near doorways: subtle sound cue

#### ✅ Checkpoint: Museum feels atmospheric — dramatic spotlights, dust particles in light beams, dark corners, cinematic post-processing.

---

### PHASE 4: Gallery Wall — Project Frames
**⏱️ Priority:** HIGH — core portfolio content
**📚 Skills to READ FIRST:**
- 🔴 `threejs-textures/SKILL.md` — TextureLoader, image textures on planes
- 🔴 `threejs-interaction/SKILL.md` — Raycasting for click/hover detection
- 🔴 `threejs-materials/SKILL.md` — Frame materials, glass effect
- 🟡 `threejs-animation/SKILL.md` — Hover/focus animations

#### What to build:

1. **Update `src/data/portfolio.js`** — Expand project data:
   ```js
   export const projects = [
     {
       id: 'project-1',
       title: 'Project Name',
       description: 'Full description of the project...',
       image: '/textures/projects/project1.jpg',
       tech: ['React', 'Three.js', 'Node.js'],
       liveUrl: 'https://...',
       githubUrl: 'https://...',
       color: '#6366f1',
       year: '2024',
     },
     // Add 4-8 projects
   ]
   ```

2. **`src/components/canvas/objects/WallFrame.jsx`** — Framed artwork:
   - Outer frame: BoxGeometry forming a picture frame shape
     - Material: dark wood or gold metallic (`MeshStandardMaterial`, metalness 0.7)
   - Inner canvas: PlaneGeometry with project screenshot as texture
     - Load texture with `useTexture` from drei
     - Apply slight emissive so it's visible in the dark
   - Museum label below: `<Html>` from drei showing project title
   - Props: `position`, `rotation`, `project data`, `wallSide`
   - **Interaction:**
     - Raycasting detection: when player looks at frame (close range)
     - Show "Press E to view" prompt via `InteractionPrompt` component
     - On interact: open `ProjectModal` with full project details

3. **`src/components/canvas/objects/InfoPanel.jsx`** — Floating info:
   - Small panel next to each frame (like museum description cards)
   - Uses `<Html>` from drei to render HTML in 3D space
   - Shows: title, year, tech stack
   - Glassmorphism styled
   - Only visible when player is within ~3 units

4. **`src/components/ui/InteractionPrompt.jsx`** — UI prompt:
   - Shows "Press E to view" when looking at an interactive object
   - Centered on screen, slightly below crosshair
   - Animated: subtle pulse/fade
   - Disappears when player looks away

5. **`src/components/ui/ProjectModal.jsx`** — Full details overlay:
   - Opens when player presses E while looking at a frame
   - Shows: large screenshot, title, full description, tech tags, links
   - Glassmorphism modal with blur background
   - Close with Escape or X button
   - Releases pointer lock while modal is open
   - Premium animation: scale up from the frame position

6. **Mount frames in `GalleryRoom.jsx`:**
   - Distribute frames evenly along left and right walls
   - Add individual spotlights aimed at each frame
   - Stagger heights slightly for visual interest
   - Add a red rope line (BoxGeometry) in front of frames (aesthetic touch)

#### ✅ Checkpoint: Walk through gallery, see project screenshots on walls in frames, look at one to get "Press E" prompt, press E to see full project details in a modal.

---

### PHASE 5: About Room — Bio & Personal Info
**⏱️ Priority:** MEDIUM
**📚 Skills to READ FIRST:**
- 🟡 `threejs-textures/SKILL.md` — Photo texture
- 🟡 `threejs-geometry/SKILL.md` — Decorative geometry
- 🟡 `threejs-animation/SKILL.md` — Idle animations

#### What to build:

1. **Populate `AboutRoom.jsx`:**
   - **Large portrait/photo on back wall:**
     - Same `WallFrame` component but larger
     - Use your photo as the texture
     - Dramatic spotlight
   - **Bio text panels:**
     - `<Html>` panels mounted on walls (like museum plaques)
     - Split bio into sections: Background, What I Do, Philosophy
     - Glassmorphism styled text blocks
   - **3D decorative elements:**
     - Floating geometric shapes representing your interests
     - Use `<Float>` from drei for idle animation
     - `MeshPhysicalMaterial` with iridescence or matcap
   - **Personal stats display:**
     - Three small pedestals showing:
       - Years of experience (with 3D number)
       - Projects completed
       - Technologies mastered
     - Emissive glow beneath each

#### ✅ Checkpoint: Walk into About room. See photo, bio text on walls, decorative 3D elements, and stats on pedestals.

---

### PHASE 6: Skills Room — Interactive Pedestals
**⏱️ Priority:** MEDIUM
**📚 Skills to READ FIRST:**
- 🔴 `threejs-geometry/SKILL.md` — SphereGeometry, CylinderGeometry for pedestals/orbs
- 🔴 `threejs-animation/SKILL.md` — Floating, rotating animations
- 🔴 `threejs-interaction/SKILL.md` — Hover states, raycasting
- 🟡 `threejs-materials/SKILL.md` — Emissive, glass, crystal materials
- 🟡 `threejs-shaders/SKILL.md` — Energy/glow shader for orbs

#### What to build:

1. **`src/components/canvas/objects/Pedestal.jsx`** — Skill display:
   ```jsx
   // Props: skill data (name, level, category, color)
   // Base: CylinderGeometry (marble/stone material)
   // Orb: SphereGeometry floating above pedestal
   //   - Material: MeshPhysicalMaterial with transmission (glass)
   //   - OR custom ShaderMaterial with energy swirl effect
   //   - Color matches skill category
   //   - Size scales with skill level
   // Label: <Text> from drei showing skill name
   // Hover: orb glows brighter, label appears, info expands
   ```

2. **Update `src/data/portfolio.js`** — Expand skills:
   ```js
   export const skills = [
     { id: 'react', name: 'React', level: 95, category: 'frontend', color: '#61dafb' },
     { id: 'threejs', name: 'Three.js', level: 90, category: '3d', color: '#000000' },
     { id: 'typescript', name: 'TypeScript', level: 88, category: 'frontend', color: '#3178c6' },
     { id: 'nodejs', name: 'Node.js', level: 85, category: 'backend', color: '#339933' },
     { id: 'gsap', name: 'GSAP', level: 85, category: 'animation', color: '#88ce02' },
     { id: 'webgl', name: 'WebGL', level: 80, category: '3d', color: '#990000' },
     { id: 'figma', name: 'Figma', level: 80, category: 'design', color: '#f24e1e' },
     { id: 'python', name: 'Python', level: 75, category: 'backend', color: '#3776ab' },
     // ... more skills
   ]
   ```

3. **Populate `SkillsRoom.jsx`:**
   - Arrange pedestals in a circle/hexagon pattern
   - Center of room: large holographic display (optional)
   - Category colors create a rainbow effect around the room
   - Ambient particle effect: colored sparks matching nearby skill colors
   - Floor: reflective surface (`MeshPhysicalMaterial` with `reflectivity`)

4. **Interaction:**
   - Walk near a pedestal → label fades in
   - Look at a pedestal → orb glows brighter
   - Press E → detailed info panel (frameworks, years used, project links)

#### ✅ Checkpoint: Walk into Skills room. See circle of pedestals with floating glowing orbs. Labels appear as you approach. Press E for details.

---

### PHASE 7: Portal Room — Contact & Social
**⏱️ Priority:** MEDIUM
**📚 Skills to READ FIRST:**
- 🔴 `threejs-shaders/SKILL.md` — Custom portal shader effect
- 🔴 `threejs-animation/SKILL.md` — Portal animation, energy effects
- 🟡 `threejs-postprocessing/SKILL.md` — Enhanced bloom for portal glow
- 🟡 `threejs-geometry/SKILL.md` — TorusGeometry for portal ring

#### What to build:

1. **Populate `PortalRoom.jsx`:**
   - **The Portal:** Center of room
     - Ring: `TorusGeometry` with emissive metallic material
     - Inner surface: `ShaderMaterial` with swirling energy effect
       - Animated perlin noise or simplex noise
       - Color: gradient from `--primary` to `--secondary`
       - Reactive to player distance (swirls faster when close)
     - Particle vortex around the portal ring
     - Strong bloom glow
   - **Contact info panels:**
     - Floating `<Html>` panels arranged around the portal
     - Email, GitHub, LinkedIn, Twitter/X
     - Each styled as a glowing card
     - Click to open link in new tab
   - **"Let's Connect" text:**
     - 3D text above the portal
     - Emissive material with bloom
   - **Room atmosphere:**
     - Darker than other rooms
     - Blue/purple lighting from the portal
     - More intense particle effects
     - Subtle camera shake when near portal

#### ✅ Checkpoint: Walk into Portal room. See swirling energy portal with contact links around it. Premium shader effect on the portal surface.

---

### PHASE 8: HUD & UI Polish
**⏱️ Priority:** MEDIUM
**📚 Skills needed:** None (UI/CSS only)

#### What to build:

1. **`src/components/ui/HUD.jsx`** — Heads-up display:
   - **Crosshair:** Simple `+` or dot in screen center (CSS)
   - **Room indicator:** Top-left showing "LOBBY", "GALLERY", "SKILLS", etc.
     - Fade transition when entering a new room
   - **Minimap (optional):** Top-right showing museum layout
     - Small rectangles for rooms
     - Dot for player position
     - Semi-transparent glassmorphism
   - **Controls hint:** Bottom area showing WASD/Mouse controls
     - Only shown for first 10 seconds, then fade out
     - Re-show on pause

2. **Update `Loader.jsx`** — Museum-themed loader:
   - Dark background with museum name
   - Progress bar styled as a "door opening" animation
   - "Entering Museum..." text
   - Tips shown while loading: "Use WASD to move, Mouse to look"
   - Fade to black → reveal scene when loaded

3. **Update `CustomCursor.jsx`:**
   - When pointer lock is active: show nothing (cursor is hidden)
   - When not locked: show "Click to enter museum" overlay
   - When modal is open: show normal cursor

4. **Update `src/styles/index.css`:**
   - Remove all scroll-based styles
   - Add museum HUD styles
   - Full-screen canvas styles
   - Modal and overlay styles
   - Crosshair styles
   - Animation keyframes for room transitions

5. **Pause menu:**
   - Press Escape → release pointer lock + show pause overlay
   - Options: Resume, Reset Position, Toggle Audio, View Controls
   - Glassmorphism panel

#### ✅ Checkpoint: Clean HUD with crosshair, room name, controls hint. Loading screen works. Pause menu on Escape.

---

### PHASE 9: Animations & Micro-Interactions
**⏱️ Priority:** MEDIUM
**📚 Skills to READ FIRST:**
- 🔴 `threejs-animation/SKILL.md` — All animation types
- 🟡 `threejs-shaders/SKILL.md` — Animated shader uniforms

#### What to build:

1. **Room entrance animations:**
   - When entering a room for the first time:
     - Lights in that room turn on smoothly (animate intensity 0 → target)
     - Objects in the room animate in (scale from 0, fade in)
   - Use a room tracking system to detect first entry

2. **Idle animations:**
   - Floating objects: continuous `<Float>` bobbing
   - Orbs: slow rotation
   - Portal: continuous shader animation
   - Dust particles: continuous drift

3. **Interaction feedback:**
   - Frame hover: subtle glow increase, frame shifts forward slightly
   - Pedestal hover: orb pulses, emissive brightens
   - Door proximity: arch emissive brightens as you approach
   - Walking: camera subtle bob (sine wave on Y-axis)

4. **Camera shake effects:**
   - Near portal: subtle shake
   - On interaction: micro-shake feedback
   - Keep subtle — too much is nauseating

5. **Sound effects (optional):**
   - Footsteps synced to movement
   - Door whoosh when passing through
   - UI click sounds
   - Ambient room-specific sounds

#### ✅ Checkpoint: Museum feels alive — lights animate on, objects bob, interactions have feedback, walking has natural camera bob.

---

### PHASE 10: Mobile & Performance
**⏱️ Priority:** LOW-MEDIUM
**📚 Skills needed:** None (optimization phase)

#### What to build:

1. **Mobile fallback:**
   - On mobile/touch devices: show a curated screenshot/video tour instead
   - OR implement touch controls:
     - Virtual joystick (left thumb) for movement
     - Touch-drag (right side) for look
     - Tap to interact
   - Reduce scene complexity:
     - Fewer particles (500 → 100)
     - Lower texture resolution
     - Disable post-processing or keep only vignette
     - Lower `dpr={[1, 1]}`

2. **Performance optimization:**
   - Use `<Instances>` for repeated geometries (frame legs, pedestal bases)
   - Frustum culling: only render rooms near the player
   - Level of Detail (`<LOD>` or distance-based simplification)
   - Object pooling for particles
   - Compress textures to `.webp` or `.ktx2`
   - Use `<AdaptiveDpr>` and `<AdaptiveEvents>` from drei
   - Monitor with `<Perf>` from drei in dev mode

3. **Loading optimization:**
   - Lazy load room content as player approaches
   - Use `<Suspense>` boundaries per room
   - Preload next room when entering current room
   - Compress 3D models with Draco/meshopt

#### ✅ Checkpoint: 60fps on desktop, 30fps on mobile. Textures and models are compressed. Mobile has alternative experience.

---

### PHASE 11: Final Polish & Deploy
**⏱️ Priority:** LOW
**📚 Skills needed:** None

#### Steps:
1. **SEO & Meta tags** (in `index.html`):
   - Title: "Your Name — Interactive 3D Portfolio Museum"
   - Meta description, Open Graph image
   - Favicon

2. **Accessibility:**
   - Skip-to-content link for screen readers
   - ARIA labels on interactive elements
   - `prefers-reduced-motion`: show static version

3. **Build & Deploy:**
   ```bash
   npm run build
   ```
   - Deploy to Vercel, Netlify, or Cloudflare Pages
   - Set up custom domain

4. **README.md:** Update with screenshots, tech stack, how to run locally

#### ✅ Final: Production-ready museum portfolio deployed.

---

## 📊 Skill Usage Summary Per Phase

| Phase | Skills to READ | Priority |
|-------|---------------|----------|
| 1 - Player Controller | `fundamentals`, `interaction` | 🔴 Critical |
| 2 - Museum Architecture | `geometry`, `materials`, `textures`, `lighting` | 🔴 Critical |
| 3 - Lighting & Atmosphere | `lighting`, `postprocessing`, `shaders` | 🔴 Critical |
| 4 - Gallery Wall Frames | `textures`, `interaction`, `materials`, `animation` | 🔴 Critical |
| 5 - About Room | `textures`, `geometry`, `animation` | 🟡 Important |
| 6 - Skills Pedestals | `geometry`, `animation`, `interaction`, `materials`, `shaders` | 🔴 Critical |
| 7 - Portal Room | `shaders`, `animation`, `postprocessing`, `geometry` | 🔴 Critical |
| 8 - HUD & UI | None (CSS only) | 🟡 Important |
| 9 - Animations | `animation`, `shaders` | 🟡 Important |
| 10 - Mobile & Perf | None (optimization) | 🟢 Nice to have |
| 11 - Deploy | None | 🟢 Nice to have |

---

## ⚠️ Rules for AI Assistants (Gemini / Codex CLI)

1. **READ the relevant SKILL.md files BEFORE writing any Three.js code.** The skills contain correct API signatures, constructor patterns, and best practices. Do NOT guess.

2. **Follow phases in order.** Phase 1 (player controller) MUST work before building rooms.

3. **After each phase, run `npm run dev` and verify the checkpoint.**

4. **Use React Three Fiber (R3F) declarative syntax**, not imperative Three.js:
   - ✅ `<mesh><boxGeometry args={[1,3,0.1]} /><meshStandardMaterial color="#333" /></mesh>`
   - ❌ `new THREE.Mesh(new THREE.BoxGeometry(1,3,0.1), ...)`

5. **Use drei helpers** whenever possible:
   - `<Float>`, `<Text>`, `<Text3D>`, `<Environment>`, `<Html>`
   - `useGLTF`, `useTexture`, `useProgress`
   - `<SpotLight>` (volumetric), `<ContactShadows>`

6. **Pointer lock is critical.** The museum MUST use pointer lock for mouse-look. Without it, the experience breaks.

7. **Collision detection is essential.** Players must NOT walk through walls. Implement AABB collision at minimum.

8. **Keep rooms modular.** Each room is its own component. Easy to add/remove/reorder.

9. **Performance:** Use `useMemo` for expensive computations. Keep `useFrame` callbacks light. Dispose resources on unmount.

10. **Design aesthetic:**
    - Dark museum atmosphere (background #050505 to #0a0a0a)
    - Premium materials: marble floors, concrete walls, metallic frames
    - Dramatic spotlighting on artwork
    - Color accents: Indigo (#6366f1), Cyan (#06b6d4), Purple (#a855f7)
    - Glassmorphism for all HTML overlays
    - Font: Inter (body) + Space Grotesk (headings)
