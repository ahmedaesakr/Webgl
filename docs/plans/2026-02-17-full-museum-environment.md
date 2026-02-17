# Full Museum Environment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the current procedural-geometry museum into a fully immersive 3D environment with GLTF models, PBR textures, ambient audio, animated exhibits, real floor/wall materials, decorative props, and a polished visitor experience that feels like walking through a real high-end art gallery.

**Architecture:** Layer real-world materials (marble floors, textured walls, ceiling panels) onto existing RoomShell. Load GLTF models for furniture/props. Add ambient soundscape. Enhance lighting with baked-style area lights. Wire raycasting-based E-key interaction. Add animated exhibit showcases. All progressive — existing layout and navigation preserved.

**Tech Stack:** React 19, Three.js 0.182, R3F 9, Drei 10 (useGLTF, useTexture, PositionalAudio, ContactShadows), @react-three/postprocessing, GLSL shaders, GSAP.

**Skills to reference:**
- `threejs-loaders` — GLTF/GLB loading, useGLTF, Draco compression
- `threejs-textures` — useTexture, PBR texture maps (albedo, normal, roughness, AO)
- `threejs-materials` — MeshStandardMaterial PBR, MeshPhysicalMaterial glass/clearcoat
- `threejs-lighting` — RectAreaLight, SpotLight, baked lighting patterns
- `threejs-geometry` — Instancing, merged geometry for performance
- `threejs-animation` — GLTF animations, useAnimations, procedural motion
- `threejs-shaders` — Custom shader enhancements, water/energy effects
- `threejs-interaction` — Raycaster, E-key interaction system
- `threejs-postprocessing` — SSAO, SSR, depth of field
- `threejs-fundamentals` — Scene graph, dispose patterns, performance

---

## Current State (What Exists)

| Component | Status | Notes |
|-----------|--------|-------|
| 5-room layout (Lobby 14x14, Gallery 8x30, About 8x8, Skills 12x12, Portal 8x8) | Done | Procedural BoxGeometry walls, PlaneGeometry floors |
| Player controller (PointerLock + WASD + collision) | Done | AABB collision, head bob, room detection |
| Spotlights in all rooms | Done | Drei SpotLight wrapper, volumetric |
| WallFrame (gallery art) | Done | Hover glow, click-to-modal, solid color canvas |
| Pedestal (skills orbs) | Done | Float glass orbs, hover glow |
| Portal shader | Done | FBM swirl GLSL, torus ring |
| Post-processing (Bloom, Vignette, Noise) | Done | EffectComposer pipeline |
| Dust particles (500 motes) | Done | Upward drift + sway |
| HUD, Loader, PauseMenu, ProjectModal | Done | Glassmorphism CSS |
| **3D Models** | **Missing** | No GLTF/GLB loading anywhere |
| **PBR Textures** | **Missing** | All materials are flat colors |
| **Audio** | **Missing** | No ambient sound |
| **Raycasting interaction** | **Missing** | E-key tracked but not wired |
| **Animated exhibits** | **Missing** | Frames are static colored planes |

---

## Bug Fixes (Pre-requisite)

### Fix 0: RoomBuilder `props` reference error

**Files:**
- Modify: `src/components/canvas/rooms/RoomBuilder.jsx:59`

**Problem:** `WallWithGaps` references `props.wallMaterialProps` but `props` is not in scope — the prop is destructured as a named parameter in `RoomShell`, not `WallWithGaps`. This causes a runtime error when `wallMaterialProps` is passed.

**Step 1: Fix WallWithGaps to accept wallMaterialProps as a prop**

In `RoomBuilder.jsx`, change the `WallWithGaps` function signature to accept `wallMaterialProps`:

```jsx
// Line 15: Add wallMaterialProps to destructured props
function WallWithGaps({ axis, length, height, fixedPos, gaps = [], wallThickness = WALL_THICKNESS, wallMaterialProps = {} }) {
```

Then on line 59, change `{...props.wallMaterialProps}` to `{...wallMaterialProps}`.

**Step 2: Verify build**

Run: `npx vite build`
Expected: No errors. Walls render correctly.

**Step 3: Commit**
```bash
git add src/components/canvas/rooms/RoomBuilder.jsx
git commit -m "fix: pass wallMaterialProps correctly to WallWithGaps"
```

---

## Tasks

### Task 1: PBR Floor Textures — Marble & Polished Concrete

**Files:**
- Modify: `src/components/canvas/rooms/RoomBuilder.jsx`
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- Modify: `src/components/canvas/rooms/AboutRoom.jsx`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`
- Modify: `src/components/canvas/rooms/PortalRoom.jsx`
- Create: `public/textures/floor/` (download textures)

**Skills:** `threejs-textures`, `threejs-materials`

**Step 1: Download PBR floor textures**

Use free PBR textures (e.g., ambientCG, Poly Haven) — need 2 sets:
- **Marble** (Lobby, Gallery, About): white/gray marble with veining
- **Dark stone** (Skills, Portal): dark polished stone for contrast

Each set needs: `albedo.jpg`, `normal.jpg`, `roughness.jpg` — save to `public/textures/floor/marble/` and `public/textures/floor/dark-stone/`.

Alternatively, generate procedural textures using CanvasTexture if downloads unavailable.

**Step 2: Update RoomBuilder to support texture props**

Add `floorTextures` prop to `RoomShell`. When provided, apply `useTexture` to load PBR maps and configure `MeshStandardMaterial` with `map`, `normalMap`, `roughnessMap`. Set `repeat` based on room dimensions for proper tiling.

```jsx
// In RoomShell, before the return:
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Inside component:
const floorTextureMaps = floorTextures ? useTexture({
  map: floorTextures.albedo,
  normalMap: floorTextures.normal,
  roughnessMap: floorTextures.roughness,
}) : null

// If loaded, configure tiling:
if (floorTextureMaps) {
  Object.values(floorTextureMaps).forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(width / 4, depth / 4)
  })
}

// In the floor mesh material:
<meshStandardMaterial
  color={floorColor}
  roughness={0.2}
  metalness={0.1}
  {...floorMaterialProps}
  {...(floorTextureMaps || {})}
/>
```

**Step 3: Pass floor textures from each room**

Each room passes its `floorTextures` prop to `RoomShell`:
- Lobby: marble
- Gallery: marble
- About: marble
- Skills: dark-stone
- Portal: dark-stone

**Step 4: Verify and commit**

Run: `npm run dev`
Expected: Floors show tiled marble/stone instead of flat #121212.
```bash
git add -A
git commit -m "feat: add PBR marble and stone floor textures"
```

---

### Task 2: Wall & Ceiling Material Enhancement

**Files:**
- Modify: `src/components/canvas/rooms/RoomBuilder.jsx`
- Create: `public/textures/wall/` (textures)
- Create: `src/components/canvas/objects/WallPanel.jsx`

**Skills:** `threejs-textures`, `threejs-materials`, `threejs-geometry`

**Step 1: Add subtle wall texture**

Use a very subtle concrete/plaster normal map on walls. Not photorealistic — just enough to break up the flatness. Download a seamless concrete normal map.

**Step 2: Create decorative wall panels**

Create `WallPanel.jsx` — a thin recessed rectangular panel that repeats along gallery walls. Museum galleries have these molding/wainscoting panels.

```jsx
// src/components/canvas/objects/WallPanel.jsx
// A group of thin BoxGeometry pieces forming a rectangular border
// Recessed 0.02 units into the wall
// Color: slightly lighter than wall (#252530)
// Subtle metalness: 0.15 for sheen
// Accepts: position, rotation, width, height
```

**Step 3: Mount wall panels in Gallery**

Add 6 wall panels (one behind each WallFrame) in `GalleryRoom.jsx`.

**Step 4: Enhance ceiling with subtle grid**

Add thin mesh strips to form a subtle ceiling grid pattern in the Lobby (simulating ceiling tiles/coffers).

**Step 5: Verify and commit**
```bash
git add -A
git commit -m "feat: add wall panels, ceiling detail, and wall texture"
```

---

### Task 3: GLTF Model Loading Infrastructure

**Files:**
- Create: `src/components/canvas/objects/GLTFModel.jsx`
- Create: `src/hooks/useModelLoader.js`
- Modify: `vite.config.js` (if needed for GLB handling)

**Skills:** `threejs-loaders`, `threejs-fundamentals`

**Step 1: Create reusable GLTFModel component**

```jsx
// src/components/canvas/objects/GLTFModel.jsx
import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url, position, rotation, scale, castShadow = true }) {
  const { scene } = useGLTF(url)
  const clonedScene = scene.clone(true)

  // Enable shadows on all meshes
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = castShadow
      child.receiveShadow = true
    }
  })

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default function GLTFModel(props) {
  return (
    <Suspense fallback={null}>
      <Model {...props} />
    </Suspense>
  )
}
```

**Step 2: Preload critical models**

Add `useGLTF.preload('/models/bench.glb')` etc. at module level for key assets.

**Step 3: Verify with a test model**

Download a free bench/chair model from Sketchfab or Poly Haven (CC0 license), convert to GLB, place in `public/models/`, render in Lobby.

**Step 4: Commit**
```bash
git add -A
git commit -m "feat: add GLTF model loading infrastructure"
```

---

### Task 4: Museum Furniture — Benches, Pedestals, Rope Barriers

**Files:**
- Create: `src/components/canvas/objects/MuseumBench.jsx`
- Create: `src/components/canvas/objects/RopeBarrier.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Add: `public/models/` (GLB files or procedural geometry)

**Skills:** `threejs-geometry`, `threejs-materials`, `threejs-loaders`

**Step 1: Create MuseumBench (procedural)**

If no GLTF available, build procedurally:
```jsx
// src/components/canvas/objects/MuseumBench.jsx
// - Seat: BoxGeometry(1.8, 0.08, 0.5) — dark leather/wood
// - Legs (4): BoxGeometry(0.06, 0.45, 0.06) — metallic
// - Material: MeshStandardMaterial, color #1a1a2e, metalness 0.4
// - Props: position, rotation
```

**Step 2: Create RopeBarrier**

Museum rope stanchions along gallery center:
```jsx
// src/components/canvas/objects/RopeBarrier.jsx
// - Post: CylinderGeometry(0.03, 0.03, 1.0, 8) — gold/brass
// - Base: CylinderGeometry(0.12, 0.12, 0.05, 16) — brass
// - Rope: CatmullRomCurve3 → TubeGeometry between two posts
// - Material: metallic gold (color #c8a000, metalness 0.8, roughness 0.2)
// - Props: startPos, endPos
```

**Step 3: Place furniture in rooms**

- Gallery: 3 benches along the center (every 10 units along Z), 4 rope barriers flanking walkway
- Lobby: 1 circular bench around the floor emblem

**Step 4: Add collision bounds for benches**

Add bench AABBs to `museumBounds.js` so player can't walk through them.

**Step 5: Verify and commit**
```bash
git add -A
git commit -m "feat: add museum benches and rope barriers"
```

---

### Task 5: Ambient Audio System

**Files:**
- Create: `src/components/canvas/AmbientAudio.jsx`
- Create: `src/hooks/useAudioManager.js`
- Add: `public/audio/` (audio files)
- Modify: `src/components/canvas/Experience.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/index.css`

**Skills:** `threejs-fundamentals` (Three.js AudioListener, Audio)

**Step 1: Download/create ambient audio**

Need 2-3 short looping audio files (royalty-free):
- `museum-ambience.mp3` — Very quiet reverb/room tone (5-15 second loop)
- `footstep.mp3` — Single footstep sound for walking (optional)

**Step 2: Create AmbientAudio component**

```jsx
// src/components/canvas/AmbientAudio.jsx
import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function AmbientAudio({ url, volume = 0.15, enabled = true }) {
  const { camera } = useThree()
  const audioRef = useRef()

  useEffect(() => {
    if (!enabled) return
    const listener = new THREE.AudioListener()
    camera.add(listener)
    const audio = new THREE.Audio(listener)
    audioRef.current = audio

    const loader = new THREE.AudioLoader()
    loader.load(url, (buffer) => {
      audio.setBuffer(buffer)
      audio.setLoop(true)
      audio.setVolume(volume)
      audio.play()
    })

    return () => {
      audio.stop()
      camera.remove(listener)
      audio.disconnect()
    }
  }, [camera, url, volume, enabled])

  return null
}
```

**Step 3: Add audio toggle to PauseMenu and HUD**

- Add `audioEnabled` state in App.jsx
- Add "Toggle Audio" button in PauseMenu
- Add small speaker icon in HUD corner
- Pass `audioEnabled` to Experience → AmbientAudio

**Step 4: Add AmbientAudio to Experience**

```jsx
<AmbientAudio url="/audio/museum-ambience.mp3" volume={0.15} enabled={audioEnabled} />
```

**Step 5: Verify and commit**
```bash
git add -A
git commit -m "feat: add ambient museum audio with toggle"
```

---

### Task 6: Raycasting Interaction System (E-key)

**Files:**
- Create: `src/hooks/useInteraction.js`
- Modify: `src/components/canvas/PlayerController.jsx`
- Modify: `src/components/canvas/objects/WallFrame.jsx`
- Modify: `src/components/canvas/objects/Pedestal.jsx`
- Modify: `src/components/canvas/Experience.jsx`
- Modify: `src/App.jsx`

**Skills:** `threejs-interaction`

**Step 1: Create useInteraction hook**

```jsx
// src/hooks/useInteraction.js
import { useRef, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const raycaster = new THREE.Raycaster()
raycaster.far = 5 // Only interact within 5 units

export default function useInteraction({ isLocked, onHover, onInteract }) {
  const { camera, scene } = useThree()
  const hoveredRef = useRef(null)
  const interactablesRef = useRef([])

  // Register/unregister interactive objects
  const register = useCallback((mesh, data) => {
    interactablesRef.current.push({ mesh, data })
    return () => {
      interactablesRef.current = interactablesRef.current.filter(i => i.mesh !== mesh)
    }
  }, [])

  useFrame(() => {
    if (!isLocked) return

    // Cast ray from camera center (forward direction)
    raycaster.setFromCamera({ x: 0, y: 0 }, camera)
    const meshes = interactablesRef.current.map(i => i.mesh).filter(Boolean)
    const intersects = raycaster.intersectObjects(meshes, true)

    if (intersects.length > 0) {
      const hit = intersects[0]
      const entry = interactablesRef.current.find(i =>
        i.mesh === hit.object || hit.object.parent === i.mesh
      )
      if (entry && hoveredRef.current !== entry) {
        hoveredRef.current = entry
        onHover?.(entry.data?.label || 'object')
      }
    } else if (hoveredRef.current) {
      hoveredRef.current = null
      onHover?.(null)
    }
  })

  const interact = useCallback(() => {
    if (hoveredRef.current) {
      onInteract?.(hoveredRef.current.data)
    }
  }, [onInteract])

  return { register, interact }
}
```

**Step 2: Wire E-key press in PlayerController**

Listen for 'E' keydown → call `interact()` from hook. Pass interact result up via callback.

**Step 3: Register WallFrame and Pedestal meshes**

Each interactive component calls `register(meshRef.current, { type: 'project', label: project.title, data: project })` on mount.

**Step 4: Update App.jsx to handle interactions**

When `onInteract` fires with type 'project', open ProjectModal. When type 'skill', show skill detail tooltip.

**Step 5: Verify and commit**
```bash
git add -A
git commit -m "feat: add raycasting E-key interaction system"
```

---

### Task 7: Animated Project Showcases (Gallery Enhancement)

**Files:**
- Create: `src/components/canvas/objects/ProjectShowcase.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`

**Skills:** `threejs-animation`, `threejs-materials`, `threejs-shaders`

**Step 1: Create ProjectShowcase**

Replace solid-color frame canvases with animated showcases:
```jsx
// src/components/canvas/objects/ProjectShowcase.jsx
// - Floating holographic display that shows project info IN the frame
// - Animated grid lines scrolling upward (shader or procedural)
// - Project title rendered on the "screen" with drei <Text>
// - Tech stack icons as small floating cubes
// - Subtle particle effect around the frame when hovered
// - Color-coded glow matching project.color
// - Uses custom ShaderMaterial for the animated screen effect
```

**Step 2: Screen shader (scrolling grid)**

```glsl
// Animated scanline/grid effect for the project frame "screen"
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
```

**Step 3: Mount in GalleryRoom**

Replace or wrap existing WallFrame with ProjectShowcase for enhanced display.

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "feat: add animated project showcase displays"
```

---

### Task 8: Enhanced Skills Room — Orbiting Tech Icons

**Files:**
- Create: `src/components/canvas/objects/SkillOrbit.jsx`
- Create: `src/shaders/energy.frag.glsl`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`

**Skills:** `threejs-animation`, `threejs-shaders`, `threejs-geometry`

**Step 1: Create SkillOrbit component**

Add orbiting ring of small tech-related shapes around each pedestal orb:

```jsx
// src/components/canvas/objects/SkillOrbit.jsx
// - 3-5 tiny shapes (cubes, spheres, tetrahedrons) orbiting the main orb
// - Orbit radius: 0.5 units
// - Orbit speed: varies per shape
// - Each shape has the skill color as emissive
// - Only visible when hovered (fade in/out)
// - Uses useFrame for orbital calculation
```

**Step 2: Create energy field shader**

Subtle energy field ground effect under each active pedestal:
```glsl
// Radial pulse from center, fading outward
// Color matches skill category
// Animates with uTime
```

**Step 3: Add center holographic display**

In the center of the Skills Room (inside the floor ring), add a floating holographic stats display:
- Total skills count
- Average proficiency
- Category breakdown
- Animated text cycling between stats

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "feat: add orbiting tech icons and energy field to skills room"
```

---

### Task 9: Portal Room — Full Contact Experience

**Files:**
- Modify: `src/components/canvas/rooms/PortalRoom.jsx`
- Modify: `src/components/canvas/objects/Portal.jsx`
- Create: `src/components/canvas/objects/ContactOrb.jsx`

**Skills:** `threejs-shaders`, `threejs-animation`, `threejs-interaction`

**Step 1: Create floating ContactOrb**

Instead of flat Html cards, create floating interactive orbs for each contact method:
```jsx
// src/components/canvas/objects/ContactOrb.jsx
// - Floating sphere with icon texture/text
// - Orbits around the portal at varying heights
// - Hover: orb grows, pulses, shows label
// - Click: opens link in new tab
// - Trail: leave a faint particle trail as they orbit
// - Color coded: Email=cyan, GitHub=white, LinkedIn=blue, Twitter=sky
```

**Step 2: Enhance portal shader**

Add depth to the portal:
- Second layer of noise at different scale
- Edge particle emission (sparks flying off the ring)
- Subtle pull animation (things drift toward center)

**Step 3: Add ground fog in Portal Room**

Low-lying fog effect near the floor using a large transparent plane with animated shader.

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "feat: enhance portal room with contact orbs and fog"
```

---

### Task 10: Lobby — Welcome Experience & Wayfinding

**Files:**
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Create: `src/components/canvas/objects/DirectionSign.jsx`
- Create: `src/components/canvas/objects/MuseumMap.jsx`

**Skills:** `threejs-geometry`, `threejs-materials`, `threejs-animation`

**Step 1: Create DirectionSign**

Floating directional signs pointing to each room:
```jsx
// src/components/canvas/objects/DirectionSign.jsx
// - Arrow shape (ConeGeometry rotated 90°) + label Text
// - Points toward each room's door
// - Subtle Float animation
// - 3 signs: "Gallery →", "← About", "Skills ↓"
// - Glass material with emissive text
// - Positioned above doorways
```

**Step 2: Create MuseumMap**

A 3D miniature of the museum layout displayed on a pedestal:
```jsx
// src/components/canvas/objects/MuseumMap.jsx
// - Small 3D recreation of the 5 rooms at 1:50 scale
// - Current room highlighted with glow
// - Player position shown as tiny glowing dot
// - Mounted on a pedestal in the center of the Lobby
// - Scale: entire museum fits in ~0.6m cube
```

**Step 3: Enhance welcome experience**

- Add animated "Welcome" text that types out letter-by-letter on first visit
- Subtle spotlight sweep animation in Lobby on first enter
- Particles briefly intensify around the name text

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "feat: add wayfinding signs and museum map to lobby"
```

---

### Task 11: Reflective Floors & Contact Shadows

**Files:**
- Modify: `src/components/canvas/rooms/RoomBuilder.jsx`
- Modify: `src/components/canvas/Experience.jsx`

**Skills:** `threejs-materials`, `threejs-lighting`

**Step 1: Add floor reflections**

Use `MeshPhysicalMaterial` for Lobby and Gallery floors with `reflectivity` and `clearcoat`:
```jsx
<meshPhysicalMaterial
  color={floorColor}
  metalness={0.15}
  roughness={0.1}
  clearcoat={0.3}
  clearcoatRoughness={0.2}
  reflectivity={0.5}
  envMapIntensity={0.3}
/>
```

**Step 2: Add ContactShadows**

Add `<ContactShadows>` from drei under key objects (pedestals, benches) for grounded look:
```jsx
<ContactShadows
  position={[0, 0.01, 0]}
  opacity={0.4}
  scale={10}
  blur={2}
  far={4}
/>
```

**Step 3: Verify and commit**
```bash
git add -A
git commit -m "feat: add reflective floors and contact shadows"
```

---

### Task 12: Advanced Post-Processing

**Files:**
- Modify: `src/components/canvas/Effects.jsx`

**Skills:** `threejs-postprocessing`

**Step 1: Add SSAO (Screen Space Ambient Occlusion)**

Darkens corners and crevices for realism:
```jsx
import { SSAO } from '@react-three/postprocessing'

<SSAO
  samples={16}
  radius={0.1}
  intensity={15}
  luminanceInfluence={0.6}
/>
```

**Step 2: Add ChromaticAberration (subtle)**

Very subtle color fringing at edges for cinematic lens feel:
```jsx
import { ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

<ChromaticAberration offset={new Vector2(0.0005, 0.0005)} />
```

**Step 3: Add ToneMapping**

Configure ACES Filmic tone mapping for richer darks and highlights:
```jsx
import { ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
```

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "feat: add SSAO, chromatic aberration, and ACES tone mapping"
```

---

### Task 13: Room Entrance Animations (Wire Existing Hook)

**Files:**
- Modify: `src/hooks/useRoomEntrance.js`
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- Modify: `src/components/canvas/rooms/AboutRoom.jsx`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`
- Modify: `src/components/canvas/rooms/PortalRoom.jsx`

**Skills:** `threejs-animation`

**Step 1: Enhance useRoomEntrance**

The hook exists but isn't connected. Update it to:
- Accept `roomName` and `playerRoom` (current room from App state)
- Trigger animation when `playerRoom === roomName` for the first time
- Return `{ progress, isFirstVisit }` where progress goes 0→1

**Step 2: Apply entrance animations to each room**

Each room wraps its content in a `<group>` whose opacity and scale are driven by the progress:
```jsx
const entranceRef = useRoomEntrance('GALLERY')

// In the room's content (not the RoomShell walls):
<group ref={(g) => {
  if (g && entranceRef.current < 1) {
    const p = entranceRef.current
    g.scale.setScalar(0.9 + 0.1 * p)
    // For meshes with materials, update opacity
  }
}}>
  {/* room content */}
</group>
```

Specific effects per room:
- **Lobby:** Name text fades in, shapes scale up from 0
- **Gallery:** Frames slide in from walls (X offset → 0)
- **Skills:** Pedestals rise up from floor (Y offset → 0)
- **About:** Bio panels fade in sequentially
- **Portal:** Portal ring expands from center, shader activates

**Step 3: Verify and commit**
```bash
git add -A
git commit -m "feat: wire room entrance animations to all rooms"
```

---

### Task 14: Performance — Model LOD & Room Culling

**Files:**
- Create: `src/hooks/useRoomVisibility.js`
- Modify: `src/components/canvas/Museum.jsx`
- Modify: `src/components/canvas/Experience.jsx`

**Skills:** `threejs-fundamentals`

**Step 1: Create room visibility hook**

```jsx
// src/hooks/useRoomVisibility.js
// - Takes current room name
// - Returns which rooms should be fully rendered vs. simplified
// - Current room + adjacent rooms: full render
// - Distant rooms: render only walls (no content)
// - Uses room adjacency map: LOBBY→[GALLERY, ABOUT, SKILLS], etc.
```

**Step 2: Apply conditional rendering in Museum.jsx**

```jsx
const visible = useRoomVisibility(currentRoom)

{visible.lobby && <Lobby />}
{visible.gallery && <GalleryRoom ... />}
// etc.
```

Always render room shells (walls) for visual continuity, but skip heavy content (models, Html, shaders) in distant rooms.

**Step 3: Add PerformanceMonitor**

Use drei's `<PerformanceMonitor>` to auto-adjust quality:
```jsx
import { PerformanceMonitor } from '@react-three/drei'

<PerformanceMonitor
  onDecline={() => setDpr(1)}
  onIncline={() => setDpr(2)}
>
  {/* scene */}
</PerformanceMonitor>
```

**Step 4: Verify and commit**
```bash
git add -A
git commit -m "perf: add room culling and performance monitor"
```

---

### Task 15: Polish — Loading Screen, Transitions & Final Touches

**Files:**
- Modify: `src/components/ui/Loader.jsx`
- Modify: `src/components/ui/HUD.jsx`
- Modify: `src/styles/index.css`
- Modify: `index.html`

**Skills:** `frontend-design`, `seo-meta`, `accessibility`

**Step 1: Enhanced loading screen**

Replace minimal loader with immersive loading experience:
- Museum silhouette/wireframe that fills in as loading progresses
- "Ahmed Sakr" name appears with typewriter effect
- "Building your experience..." subtitle
- Smooth transition: entire loader slides up to reveal scene

**Step 2: HUD minimap**

Small minimap in corner showing room layout:
- Current room highlighted
- Player direction indicator
- Toggle with M key

**Step 3: Room transition overlay**

Brief crossfade when entering a new room — subtle dark flash (100ms) for drama.

**Step 4: Final SEO & meta**

Ensure `index.html` has proper:
- `<title>` with name
- `og:image` meta tag (generate OG image)
- `manifest.json` for PWA-like behavior
- Favicon set

**Step 5: Verify and commit**
```bash
git add -A
git commit -m "feat: polish loading screen, add minimap, finalize SEO"
```

---

## Task Dependency Graph

```
Fix 0 (RoomBuilder bug) ─────────────────────────────────────────────────┐
                                                                         │
Task 1 (Floor Textures) ──┐                                              │
Task 2 (Wall Panels) ─────┼── Task 11 (Reflections) ── Task 12 (Post)   │
Task 3 (GLTF Loader) ─────┘         │                       │           │
        │                            │                       │           │
Task 4 (Furniture) ──────────────────┘                       │           │
Task 5 (Audio) ──────────────────────────────────────────────┤           │
Task 6 (Raycasting) ─────────────────────────────────────────┤           │
                                                             │           │
Task 7 (Gallery Showcase) ──────────┐                        │           │
Task 8 (Skills Orbit) ─────────────┼── Task 13 (Entrance) ──┤           │
Task 9 (Portal Enhancement) ───────┘         │               │           │
Task 10 (Lobby Wayfinding) ─────────────────┘               │           │
                                                             │           │
                                              Task 14 (Perf) ┤           │
                                              Task 15 (Polish)┘          │
                                                                         │
All tasks depend on ─────────────────────────────────────────────────────┘
```

**Parallel-safe batches:**
- **Batch A:** Fix 0 (must be first)
- **Batch B:** Tasks 1, 2, 3 (materials & loading infrastructure — independent)
- **Batch C:** Tasks 4, 5, 6 (furniture, audio, interaction — independent)
- **Batch D:** Tasks 7, 8, 9, 10 (room enhancements — independent per room)
- **Batch E:** Tasks 11, 12 (visual polish — depend on materials)
- **Batch F:** Tasks 13, 14, 15 (final polish — depend on content)

---

## Room Layout Reference

```
                  ┌──────────────┐
                  │              │
                  │  SKILLS      │
                  │  12×12×5     │
                  │  Dark Stone  │
                  └──────┬───────┘
                         │ door
  ┌────────┐      ┌──────┴───────┐      ┌───────────────────────────────┐
  │        │      │              │      │                               │
  │ ABOUT  │──door│   LOBBY      │door──│        GALLERY                │
  │ 8×8×4  │      │   14×14×4    │      │        8×30×5                 │
  │ Marble │      │   Marble     │      │        Marble                 │
  └────────┘      └──────────────┘      └───────────────┬───────────────┘
                                                        │ door
                                                 ┌──────┴───────┐
                                                 │              │
                                                 │  PORTAL      │
                                                 │  8×8×6       │
                                                 │  Dark Stone  │
                                                 └──────────────┘
```

---

Plan complete and saved to `docs/plans/2026-02-17-full-museum-environment.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
