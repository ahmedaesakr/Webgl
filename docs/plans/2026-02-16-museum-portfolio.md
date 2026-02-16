# 🏛️ Museum Portfolio — Full Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a first-person 3D museum where visitors walk through themed rooms to explore portfolio projects, skills, and contact info.

**Architecture:** Vite + React + React Three Fiber (R3F) + Drei helpers. First-person controls via PointerLock + WASD. Five rooms connected by archway doors: Lobby → Gallery (projects), About, Skills (pedestals), Portal (contact). Post-processing for cinematic ambience.

**Tech Stack:** Vite 7, React 19, React Three Fiber 9, Drei 10, @react-three/postprocessing 3, Three.js 0.182, GSAP 3

---

## 📊 Skills Audit — Relevant Local Skills

After auditing all 159 skills in `.agent/skills/`, here are the **directly useful** ones for this project:

### 🔴 Critical (Must Read Before Coding)

| Skill | Path | Use In Tasks |
|-------|------|-------------|
| **threejs-fundamentals** | `.agent/skills/threejs-fundamentals/SKILL.md` | All tasks — Scene, Camera, Object3D, Vector3 |
| **threejs-geometry** | `.agent/skills/threejs-geometry/SKILL.md` | Tasks 1-4, 6-8 — BoxGeometry, PlaneGeometry, CylinderGeometry, TorusGeometry, instancing |
| **threejs-materials** | `.agent/skills/threejs-materials/SKILL.md` | Tasks 2-4, 6-8 — MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, glass, metal |
| **threejs-lighting** | `.agent/skills/threejs-lighting/SKILL.md` | Tasks 3-4, 6-8 — SpotLight, PointLight, shadows, RectAreaLight |
| **threejs-textures** | `.agent/skills/threejs-textures/SKILL.md` | Tasks 4-5 — TextureLoader, useTexture, UV mapping, CanvasTexture |
| **threejs-interaction** | `.agent/skills/threejs-interaction/SKILL.md` | Tasks 4, 6 — Raycasting, PointerLock, hover/click detection |
| **threejs-animation** | `.agent/skills/threejs-animation/SKILL.md` | Tasks 5-9 — Procedural motion, Float, Spring, oscillation |
| **threejs-shaders** | `.agent/skills/threejs-shaders/SKILL.md` | Tasks 7-8 — GLSL, ShaderMaterial, uniforms, portal effect |
| **threejs-postprocessing** | `.agent/skills/threejs-postprocessing/SKILL.md` | Task 3 — Bloom, Vignette, SSAO, EffectComposer |
| **threejs-loaders** | `.agent/skills/threejs-loaders/SKILL.md` | Task 9 — GLTF loading, progress tracking, asset preloading |

### 🟡 Supporting (Read When Relevant)

| Skill | Path | Why |
|-------|------|-----|
| **accessibility** | `.agent/skills/accessibility/SKILL.md` | Task 12 — ARIA labels, keyboard nav, reduced motion |
| **frontend-design** | `.agent/skills/frontend-design/SKILL.md` | Task 9 — Premium UI patterns for modals, HUD |
| **seo-meta** | `.agent/skills/seo-meta/SKILL.md` | Task 12 — OG tags, title, meta description |
| **responsive-images** | `.agent/skills/responsive-images/SKILL.md` | Task 4 — Optimized project screenshot loading |
| **ai-image-generation** | `.agent/skills/ai-image-generation/SKILL.md` | Task 4 — Generate project screenshots with FLUX |
| **color-palette** | `.agent/skills/color-palette/SKILL.md` | Design — Ensure accessible, harmonious color system |
| **motion** | `.agent/skills/motion/SKILL.md` | Task 9 — React animation patterns for UI overlays |

### ❌ Not Relevant (135+ skills)

All Cloudflare, auth, backend, CMS, marketing, social media, Excel, PDF, mobile native, and framework-specific skills are **not needed** for this project.

---

## 📦 Current Codebase State

### ✅ DONE — Working Components
| File | Status | Lines |
|------|--------|-------|
| `src/App.jsx` | ✅ Canvas + HUD shell | 34 |
| `src/hooks/useKeyboard.js` | ✅ WASD + E + Shift tracking | 87 |
| `src/hooks/usePlayerMovement.js` | ✅ Movement + AABB collision + head-bob | 120 |
| `src/components/canvas/PlayerController.jsx` | ✅ Pointer lock + mouse look | 64 |
| `src/components/canvas/Experience.jsx` | ✅ Scene root (imports Museum) | 24 |
| `src/components/canvas/Museum.jsx` | ✅ Composes 5 rooms + 4 doors | 42 |
| `src/components/canvas/rooms/RoomBuilder.jsx` | ✅ Generic room shell (floor/ceiling/walls with gaps) | 104 |
| `src/components/canvas/rooms/Lobby.jsx` | ✅ 14×14 room, 3 doors | 23 |
| `src/components/canvas/rooms/GalleryRoom.jsx` | ✅ 8×30 corridor, 2 doors | 29 |
| `src/components/canvas/rooms/AboutRoom.jsx` | ✅ 8×8 room, 1 door | 28 |
| `src/components/canvas/rooms/SkillsRoom.jsx` | ✅ 12×12 room, 1 door | 28 |
| `src/components/canvas/rooms/PortalRoom.jsx` | ✅ 8×8 room, 1 door | 28 |
| `src/components/canvas/objects/Door.jsx` | ✅ Frame with emissive glow + point light | 57 |
| `src/data/museumBounds.js` | ✅ 5-room collision system with doorway gaps | 145 |
| `src/styles/index.css` | ✅ Glass cards, HUD, crosshair, responsive | 157 |

### ⚠️ NEEDS WORK — Placeholder/Minimal Components
| File | Issue |
|------|-------|
| `src/components/canvas/Effects.jsx` | Returns `null` — no post-processing |
| `src/components/canvas/Particles.jsx` | Generic 2000-particle cloud, not museum dust |
| `src/data/portfolio.js` | Only 1 project, 3 skills, placeholder info |
| `src/components/ui/InteractionPrompt.jsx` | Static — not wired to raycasting |

### ❌ NOT BUILT — Required Components
| Component | Purpose |
|-----------|---------|
| `WallFrame.jsx` | Framed project artwork on gallery walls |
| `InfoPanel.jsx` | Museum label (drei Html) near artworks |
| `Pedestal.jsx` | Skill sculpture on cylindrical base |
| `ProjectModal.jsx` | Full-screen project detail overlay |
| `useInteraction.js` | Raycasting hook for hover/click detection |
| Portal shader | Swirling energy effect (GLSL) |
| Room lighting | Spotlights per room, dramatic atmosphere |
| Lobby content | Welcome text, name display |
| About content | Bio panels, photo, stats |

---

## 📋 Tasks

### Task 1: Museum Lighting System

**Files:**
- Create: `src/components/canvas/objects/MuseumSpotlight.jsx`
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- Modify: `src/components/canvas/rooms/AboutRoom.jsx`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`
- Modify: `src/components/canvas/rooms/PortalRoom.jsx`

**Skills to read:**
- `threejs-lighting/SKILL.md` — SpotLight, shadows, PointLight, RectAreaLight
- `threejs-fundamentals/SKILL.md` — Object3D positioning

**Step 1: Create MuseumSpotlight component**

```jsx
// src/components/canvas/objects/MuseumSpotlight.jsx
import { useRef } from 'react'
import { SpotLight } from '@react-three/drei'

export default function MuseumSpotlight({
  position = [0, 4, 0],
  target = [0, 0, 0],
  color = '#fff5e6',
  intensity = 2,
  angle = 0.4,
  penumbra = 0.5,
  distance = 12,
  castShadow = true,
  debug = false,
}) {
  const lightRef = useRef()

  return (
    <SpotLight
      ref={lightRef}
      position={position}
      target-position={target}
      color={color}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      distance={distance}
      castShadow={castShadow}
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
      shadow-bias={-0.0001}
      attenuation={5}
      anglePower={4}
    />
  )
}
```

**Step 2: Add spotlights to Lobby**

Add to `Lobby.jsx` after `<RoomShell>`:
- 2 down-lights at center illuminating the floor emblem area
- 1 accent light pointing at the welcome text position
- Warm color `#fff5e6`

**Step 3: Add spotlights to GalleryRoom**

Add to `GalleryRoom.jsx`:
- 8 spotlights (4 per wall) aimed at frame positions
- Every 6 units along the depth axis
- Cool white color `#e8f0ff`

**Step 4: Add spotlights to remaining rooms**

- AboutRoom: 1 warm spotlight on portrait wall, 1 ambient fill
- SkillsRoom: 6 spotlights in circle aimed at pedestal positions, cool tones
- PortalRoom: 2 purple/blue point lights, dramatic shadows

**Step 5: Verify and commit**

Run: `npm run dev`
Expected: Rooms have dramatic spotlight pools, dark corners, visible light cones
```bash
git add -A
git commit -m "feat: add museum spotlight system to all rooms"
```

---

### Task 2: Post-Processing Effects

**Files:**
- Modify: `src/components/canvas/Effects.jsx`
- Modify: `src/components/canvas/Experience.jsx`

**Skills to read:**
- `threejs-postprocessing/SKILL.md` — EffectComposer, Bloom, Vignette

**Step 1: Implement Effects component**

```jsx
// src/components/canvas/Effects.jsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.7} />
    </EffectComposer>
  )
}
```

**Step 2: Add Effects to Experience**

In `Experience.jsx`, add `<Effects />` inside the fragment after `<Museum />`.

**Step 3: Verify and commit**

Run: `npm run dev`
Expected: Emissive door frames glow with bloom, dark vignette on edges, cinematic feel
```bash
git add -A
git commit -m "feat: add bloom and vignette post-processing"
```

---

### Task 3: Museum Dust Particles

**Files:**
- Modify: `src/components/canvas/Particles.jsx`

**Skills to read:**
- `threejs-fundamentals/SKILL.md` — useFrame, Vector3
- `threejs-geometry/SKILL.md` — BufferAttribute

**Step 1: Rewrite Particles as museum dust motes**

```jsx
// src/components/canvas/Particles.jsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const COUNT = 500
const SPREAD_X = 30
const SPREAD_Y = 6
const SPREAD_Z = 60

export default function Particles() {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD_X
      pos[i * 3 + 1] = Math.random() * SPREAD_Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      spd[i] = 0.02 + Math.random() * 0.04
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3 + 1] += speeds[i] * 0.016 // slow upward drift
      posArr[i * 3]     += Math.sin(Date.now() * 0.001 + i) * 0.0003 // gentle sway
      if (posArr[i * 3 + 1] > SPREAD_Y) {
        posArr[i * 3 + 1] = 0
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8d6f0"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  )
}
```

**Step 2: Verify and commit**

Run: `npm run dev`
Expected: Tiny dust motes slowly drift upward with gentle sway, very subtle
```bash
git add -A
git commit -m "feat: replace particles with museum dust motes"
```

---

### Task 4: Gallery Wall Frames (Project Artwork)

**Files:**
- Create: `src/components/canvas/objects/WallFrame.jsx`
- Create: `src/components/canvas/objects/InfoPanel.jsx`
- Create: `src/hooks/useInteraction.js`
- Create: `src/components/ui/ProjectModal.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- Modify: `src/data/portfolio.js`
- Modify: `src/styles/index.css`
- Modify: `src/App.jsx`

**Skills to read:**
- `threejs-textures/SKILL.md` — useTexture, TextureLoader
- `threejs-interaction/SKILL.md` — Raycasting, onPointerOver/onPointerOut
- `threejs-materials/SKILL.md` — Emissive, metalness for frame
- `threejs-animation/SKILL.md` — Hover animation patterns

**Step 1: Expand portfolio data**

Add 6 projects to `src/data/portfolio.js` with: `id, title, description, image, tech[], liveUrl, githubUrl, color, year`. Use placeholder image paths `/textures/projects/project-N.jpg`.

**Step 2: Create WallFrame component**

```jsx
// src/components/canvas/objects/WallFrame.jsx
// - Outer frame: 4 BoxGeometry pieces (dark wood, metalness: 0.7, roughness: 0.35)
// - Inner canvas: PlaneGeometry with project screenshot via useTexture
// - Emissive on canvas so artwork visible in dark (intensity 0.1)
// - Props: project, position, rotation, onInteract, isActive
// - Hover: onPointerOver → frame emissive brightens, slight Z offset
// - Click: triggers onInteract callback
```

**Step 3: Create InfoPanel component**

```jsx
// src/components/canvas/objects/InfoPanel.jsx
// - drei <Html> with distanceFactor={4}
// - Shows: title, year, tech badge pills
// - Glassmorphism card styling
// - Positioned below the frame
```

**Step 4: Create useInteraction hook**

```jsx
// src/hooks/useInteraction.js
// - useFrame + raycaster from camera center
// - Returns: hoveredObject, interact()
// - Cast ray from camera (0,0,-1) in look direction
// - Check intersection with interactive meshes
// - If within 5 units, set hoveredObject
// - On E press, trigger interaction
```

**Step 5: Create ProjectModal component**

```jsx
// src/components/ui/ProjectModal.jsx
// - Full-screen overlay with glassmorphism backdrop
// - Large screenshot, title, description, tech tags, link buttons
// - Close with Escape or X button
// - CSS scale-up animation from center
// - Releases pointer lock when open
```

**Step 6: Mount frames in GalleryRoom**

Modify `GalleryRoom.jsx` to:
- Import WallFrame and project data
- Distribute 3 frames on left wall (-X side), 3 on right (+X side)
- Space evenly along Z axis (every ~8 units in the 30-unit corridor)
- Alternate frame rotations for wall-mounted orientation

**Step 7: Wire interaction in App.jsx**

- Add `selectedProject` state
- Pass `onSelectProject` prop through Experience → GalleryRoom → WallFrame
- Show `<ProjectModal>` when a project is selected
- Show `<InteractionPrompt>` when hovering a frame

**Step 8: Add modal styles to index.css**

Add: `.project-modal`, `.project-modal-backdrop`, `.project-modal-content`, `.tech-badge`, `.modal-enter` animation

**Step 9: Generate placeholder images**

Use `generate_image` tool to create 6 project preview images, save to `public/textures/projects/`

**Step 10: Verify and commit**

Run: `npm run dev`
Expected: Walk through gallery, see framed artwork. Hover shows glow + info. Press E opens modal.
```bash
git add -A
git commit -m "feat: add gallery wall frames with project interaction"
```

---

### Task 5: Lobby Content — Welcome & Name

**Files:**
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Modify: `src/data/portfolio.js`

**Skills to read:**
- `threejs-animation/SKILL.md` — Float from drei, procedural motion
- `threejs-materials/SKILL.md` — MeshPhysicalMaterial, iridescence
- `threejs-geometry/SKILL.md` — IcosahedronGeometry, TorusKnotGeometry

**Step 1: Add welcome content to Lobby**

Modify `Lobby.jsx` to include:
- `<Text>` (drei) — Your name, large, centered, emissive
- `<Text>` — "Creative Developer" subtitle below
- `<Text>` — "Explore the museum" hint below subtitle
- `<Float>` wrapping decorative shapes (icosahedrons, torus knots)
- Decorative shapes use `MeshPhysicalMaterial` with `iridescence: 1`
- Floor emblem: circular `RingGeometry` with emissive accent color

**Step 2: Update portfolio data**

Update `personalInfo` with real name and role.

**Step 3: Verify and commit**

Run: `npm run dev`
Expected: Lobby has floating name text, decorative shapes, and museum guidance
```bash
git add -A
git commit -m "feat: add lobby welcome content with floating text and decorations"
```

---

### Task 6: Skills Room — Interactive Pedestals

**Files:**
- Create: `src/components/canvas/objects/Pedestal.jsx`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`
- Modify: `src/data/portfolio.js`

**Skills to read:**
- `threejs-geometry/SKILL.md` — CylinderGeometry, SphereGeometry
- `threejs-materials/SKILL.md` — MeshPhysicalMaterial (transmission, ior for glass)
- `threejs-animation/SKILL.md` — Float, rotation, oscillation
- `threejs-shaders/SKILL.md` — Optional: energy swirl ShaderMaterial
- `threejs-interaction/SKILL.md` — Hover glow state

**Step 1: Expand skills data**

Add 8-12 skills to `portfolio.js`: `id, name, level, category, color`
Categories: frontend, backend, 3d, animation, tools

**Step 2: Create Pedestal component**

```jsx
// src/components/canvas/objects/Pedestal.jsx
// - Base: CylinderGeometry (marble, roughness: 0.2, metalness: 0.1)
// - Orb: SphereGeometry floating above with <Float> from drei
// - Orb material: MeshPhysicalMaterial with transmission: 1, ior: 1.5 (glass)
// - Orb color matches skill category
// - Orb size scales with skill level (0.3 to 0.8)
// - Label: <Text> from drei below orb
// - Hover state: emissiveIntensity lerps 0.2 → 1.0
// - onPointerOver / onPointerOut for glow
```

**Step 3: Mount pedestals in SkillsRoom**

Modify `SkillsRoom.jsx`:
- Arrange pedestals in circle (cos/sin for positions)
- Radius ~4 units from center
- Floor material: slight reflectivity
- Add per-pedestal PointLight from below

**Step 4: Verify and commit**

Run: `npm run dev`
Expected: Circle of pedestals with labeled glass orbs, glow on hover
```bash
git add -A
git commit -m "feat: add skills room with interactive pedestals"
```

---

### Task 7: About Room — Bio & Stats

**Files:**
- Modify: `src/components/canvas/rooms/AboutRoom.jsx`
- Modify: `src/data/portfolio.js`

**Skills to read:**
- `threejs-textures/SKILL.md` — Photo texture
- `threejs-animation/SKILL.md` — Float for decorative shapes
- `threejs-geometry/SKILL.md` — CylinderGeometry for mini pedestals

**Step 1: Add bio data to portfolio.js**

```javascript
export const bio = {
  background: 'Descriptive background paragraph...',
  whatIDo: 'What I build...',
  philosophy: 'My approach...',
}
export const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Completed', value: '30+' },
  { label: 'Technologies', value: '15+' },
]
```

**Step 2: Populate AboutRoom**

Modify `AboutRoom.jsx`:
- Large portrait WallFrame on back wall (or use `<Html>` with photo)
- Bio text on side walls: drei `<Html>` museum plaque style
- 3 mini CylinderGeometry pedestals with `<Text>` stats above
- `<Float>` decorative IcosahedronGeometry shapes
- Warm spotlight on portrait

**Step 3: Verify and commit**

Run: `npm run dev`
Expected: About room with photo, bio plaques, and stat pedestals
```bash
git add -A
git commit -m "feat: add about room with bio and stats"
```

---

### Task 8: Portal Room — Contact Shader

**Files:**
- Create: `src/shaders/portal.vert.glsl`
- Create: `src/shaders/portal.frag.glsl`
- Create: `src/components/canvas/objects/Portal.jsx`
- Modify: `src/components/canvas/rooms/PortalRoom.jsx`
- Modify: `src/data/portfolio.js`

**Skills to read:**
- `threejs-shaders/SKILL.md` — ShaderMaterial, uniforms, noise functions, GLSL
- `threejs-geometry/SKILL.md` — TorusGeometry for ring, CircleGeometry for surface
- `threejs-animation/SKILL.md` — Time-based shader animation
- `threejs-postprocessing/SKILL.md` — Bloom interaction with emissive

**Step 1: Create portal shader files**

```glsl
// src/shaders/portal.vert.glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl
// src/shaders/portal.frag.glsl
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

// Simplex noise function (include a 2D noise implementation)
// Swirling pattern: mix colors based on noise + time
void main() {
  vec2 center = vUv - 0.5;
  float dist = length(center);
  float angle = atan(center.y, center.x);
  float noise = /* noise calculation */ ;
  float swirl = sin(angle * 4.0 + uTime * 2.0 + noise * 3.0) * 0.5 + 0.5;
  vec3 color = mix(uColor1, uColor2, swirl);
  float alpha = smoothstep(0.5, 0.1, dist);
  gl_FragColor = vec4(color, alpha);
}
```

**Step 2: Create Portal component**

```jsx
// src/components/canvas/objects/Portal.jsx
// - Ring: TorusGeometry(2, 0.15, 16, 100) with emissive metallic
// - Inner surface: CircleGeometry(2, 64) with ShaderMaterial
// - Update uTime in useFrame
// - Bloom-compatible: emissive intensity 1.5+
```

**Step 3: Add contact info to portfolio.js**

```javascript
export const contact = {
  email: 'your@email.com',
  github: 'https://github.com/...',
  linkedin: 'https://linkedin.com/in/...',
  twitter: 'https://twitter.com/...',
}
```

**Step 4: Populate PortalRoom**

Modify `PortalRoom.jsx`:
- Mount `<Portal />` at center
- `<Html>` cards around portal (Email, GitHub, LinkedIn, Twitter)
- `<Text>` "Let's Connect" above portal with emissive
- 2-3 purple/blue PointLights
- Click links → `window.open(url, '_blank')`

**Step 5: Verify and commit**

Run: `npm run dev`
Expected: Swirling energy portal, glowing ring, contact cards, bloom makes it dramatic
```bash
git add -A
git commit -m "feat: add portal room with shader effect and contact links"
```

---

### Task 9: HUD & UI Polish

**Files:**
- Modify: `src/components/ui/HUD.jsx`
- Create: `src/components/ui/Loader.jsx` (rewrite)
- Create: `src/components/ui/PauseMenu.jsx`
- Modify: `src/components/ui/InteractionPrompt.jsx`
- Modify: `src/styles/index.css`
- Modify: `src/App.jsx`

**Skills to read:**
- `frontend-design/SKILL.md` — Premium UI patterns
- `accessibility/SKILL.md` — ARIA, keyboard nav, reduced motion

**Step 1: Enhance HUD**

```jsx
// - Room name with CSS transition on change
// - Crosshair (already exists)
// - Controls hint: show first 10s then fade out
// - Optional minimap: rooms as rectangles + player dot
```

**Step 2: Create Loader**

```jsx
// - Use useProgress() from drei
// - Dark background "Entering Museum..."
// - Progress bar with percentage
// - Fade out when loaded
```

**Step 3: Create PauseMenu**

```jsx
// - ESC → release pointer lock + show overlay
// - Resume, Reset Position, Toggle Audio buttons
// - Glassmorphism styling
```

**Step 4: Wire InteractionPrompt to raycasting**

Connect `useInteraction` hook → show "Press E to view" when hovering an interactive object.

**Step 5: Add all CSS styles**

Add loader, pause menu, minimap, and transition styles to `index.css`.

**Step 6: Verify and commit**

Run: `npm run dev`
Expected: HUD transitions, loader works, ESC pauses, interaction prompts appear
```bash
git add -A
git commit -m "feat: polish HUD, add loader and pause menu"
```

---

### Task 10: Room Entrance Animations

**Files:**
- Create: `src/hooks/useRoomEntrance.js`
- Modify: All room components

**Skills to read:**
- `threejs-animation/SKILL.md` — Procedural animation, lerp patterns

**Step 1: Create useRoomEntrance hook**

```jsx
// - Track first entry per room (Set/Map)
// - On first entry: return animation progress (0 → 1 over 1.5s)
// - Use in rooms to animate: light intensity fade in, object scale in
// - useFrame + lerp
```

**Step 2: Apply to each room**

Each room component reads the animation progress and applies:
- Lights: `intensity * progress`
- Objects: `scale={[progress, progress, progress]}`
- Text: opacity = progress

**Step 3: Verify and commit**

Run: `npm run dev`
Expected: First time entering a room, content fades/scales in smoothly
```bash
git add -A
git commit -m "feat: add room entrance animations"
```

---

### Task 11: Performance Optimization

**Files:**
- Modify: `src/App.jsx` — Add AdaptiveDpr, Suspense
- Modify: `src/components/canvas/Experience.jsx`
- Modify: `src/components/canvas/Particles.jsx`

**Skills to read:**
- `threejs-fundamentals/SKILL.md` — Performance tips, dispose patterns

**Step 1: Add performance helpers**

```jsx
// In App.jsx Canvas:
// - <AdaptiveDpr> from drei
// - <AdaptiveEvents> from drei
// - <Suspense> wrapping Museum

// In Experience.jsx:
// - Wrap each room in <Suspense> for lazy loading
```

**Step 2: Room visibility culling**

Only render rooms within player proximity (based on room detection).

**Step 3: Compress textures**

Convert all project images to `.webp` format for smaller file sizes.

**Step 4: Verify and commit**

Run: `npm run dev`
Expected: 60fps on desktop, smooth transitions, no jank
```bash
git add -A
git commit -m "perf: add adaptive rendering and room culling"
```

---

### Task 12: SEO, Accessibility & Deploy

**Files:**
- Modify: `index.html`
- Modify: `src/styles/index.css`
- Modify: `README.md`

**Skills to read:**
- `seo-meta/SKILL.md` — Title, meta, OG tags
- `accessibility/SKILL.md` — ARIA, reduced motion

**Step 1: Add SEO meta tags to index.html**

```html
<title>Ahmed Sakr — Interactive 3D Portfolio Museum</title>
<meta name="description" content="Walk through a 3D museum to explore my projects, skills, and connect.">
<meta property="og:title" content="Ahmed Sakr — 3D Portfolio Museum">
<meta property="og:description" content="An interactive WebGL museum portfolio built with Three.js">
<meta property="og:image" content="/og-image.png">
```

**Step 2: Add accessibility**

- `prefers-reduced-motion` media query → disable animations, show static layout
- ARIA labels on all HUD elements
- Skip-to-content link

**Step 3: Update README.md**

Add: description, screenshots, tech stack, how to run, deploy instructions.

**Step 4: Build and test**

```bash
npm run build
npm run preview
```
Expected: Production build works, no errors.

**Step 5: Commit and deploy**

```bash
git add -A
git commit -m "feat: add SEO, accessibility, update README"
git push origin main
```

---

## 📊 Task Dependency Graph

```
Task 1 (Lighting) ─────┐
Task 2 (Post-Processing)├── Task 4 (Gallery Frames) ── Task 9 (HUD Polish)
Task 3 (Particles) ─────┘         │                          │
                                   ├── Task 10 (Entrance Anim)
Task 5 (Lobby Content) ───────────┘         │
Task 6 (Skills Pedestals) ─────────────────┤
Task 7 (About Room) ──────────────────────┤
Task 8 (Portal Shader) ───────────────────┤
                                           ├── Task 11 (Performance)
                                           └── Task 12 (Deploy)
```

**Critical path:** Tasks 1-4 → 9 → 10 → 11 → 12
**Parallel safe:** Tasks 5, 6, 7, 8 can run in parallel after Task 1-3

---

## 📐 Room Layout Reference

```
                  ┌──────────────┐
                  │              │
                  │  SKILLS      │
                  │  12×12       │
                  │              │
                  └──────┬───────┘
                         │ door
  ┌────────┐      ┌──────┴───────┐      ┌───────────────────────────────┐
  │        │      │              │      │                               │
  │ ABOUT  │──door│   LOBBY      │door──│        GALLERY                │
  │ 8×8    │      │   14×14      │      │        8×30                   │
  │        │      │              │      │                               │
  └────────┘      └──────────────┘      └───────────────┬───────────────┘
                                                        │ door
                                                 ┌──────┴───────┐
                                                 │              │
                                                 │  PORTAL      │
                                                 │  8×8         │
                                                 │              │
                                                 └──────────────┘
```

---

Plan complete and saved to `docs/plans/2026-02-16-museum-portfolio.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
