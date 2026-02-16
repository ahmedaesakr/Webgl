# 🏛️ WebGL 3D Museum Portfolio — Skill-Driven Implementation Plan

> **Generated:** 2026-02-16
> **Status:** Ready to Execute
> **Based on:** `PLAN.md` + 10 Three.js Skills in `.agent/skills/`

---

## 📊 Project Audit — Current State

### ✅ What's Already Built (Phase 1 — ~70% Complete)
| File | Status | Notes |
|------|--------|-------|
| `src/hooks/useKeyboard.js` | ✅ Done | WASD + E + Shift tracking |
| `src/hooks/usePlayerMovement.js` | ✅ Done | Movement + AABB collision |
| `src/components/canvas/PlayerController.jsx` | ✅ Done | Pointer lock + mouse look |
| `src/App.jsx` | ✅ Done | Canvas + HUD + overlay structure |
| `src/data/museumBounds.js` | ⚠️ Partial | Only LOBBY room defined |
| `src/components/canvas/Experience.jsx` | ⚠️ Partial | Only lobby box walls, no rooms |
| `src/components/canvas/Particles.jsx` | ⚠️ Needs update | Still generic, needs museum dust |
| `src/components/ui/HUD.jsx` | ⚠️ Minimal | Room name + crosshair only |
| `src/components/ui/InteractionPrompt.jsx` | ⚠️ Minimal | Static, not wired to raycasting |
| `src/styles/index.css` | ✅ Good foundation | Glass cards, HUD, responsive |
| `src/data/portfolio.js` | ⚠️ Placeholder | 1 project, 3 skills |

### ❌ What's NOT Built Yet
- Museum room components (Lobby, Gallery, Skills, About, Portal)
- Door/archway components
- WallFrame (framed project artwork)
- Pedestal (skill sculptures)
- Spotlight component
- InfoPanel (drei Html overlay)
- ProjectModal (full project details)
- Post-processing (bloom, vignette, SSAO)
- Portal shader effect
- Room entrance animations
- Sound effects / ambient audio
- Mobile fallback
- SEO / deployment

---

## 🎯 Execution Strategy

### Session Structure
Each session should:
1. **READ** the listed skill files FIRST (mandatory)
2. **BUILD** the components for that phase
3. **TEST** by running `npm run dev` and verifying the checkpoint
4. **COMMIT** with a descriptive message

### Skill File Paths (All in `.agent/skills/`)
```
threejs-fundamentals    → .agent/skills/threejs-fundamentals/SKILL.md
threejs-geometry        → .agent/skills/threejs-geometry/SKILL.md
threejs-materials       → .agent/skills/threejs-materials/SKILL.md
threejs-lighting        → .agent/skills/threejs-lighting/SKILL.md
threejs-textures        → .agent/skills/threejs-textures/SKILL.md
threejs-animation       → .agent/skills/threejs-animation/SKILL.md
threejs-loaders         → .agent/skills/threejs-loaders/SKILL.md
threejs-shaders         → .agent/skills/threejs-shaders/SKILL.md
threejs-postprocessing  → .agent/skills/threejs-postprocessing/SKILL.md
threejs-interaction     → .agent/skills/threejs-interaction/SKILL.md
```

---

## 🔴 PHASE 1: Complete Player Controller (Session 1)
**Status:** ~70% done — needs finishing touches
**⏱️ Estimated:** 30 min
**📚 Skills to READ:**
- `threejs-fundamentals/SKILL.md` — Scene setup, Camera, Object3D
- `threejs-interaction/SKILL.md` — PointerLockControls pattern, keyboard input

### Tasks:
- [x] `useKeyboard.js` — ✅ Already complete
- [x] `usePlayerMovement.js` — ✅ Already complete (AABB collision, wall sliding)
- [x] `PlayerController.jsx` — ✅ Already complete (pointer lock, mouse look)
- [x] `App.jsx` — ✅ Already set up (Canvas + HUD)
- [ ] **Fix:** Verify collision boundaries work perfectly (player can't escape the lobby)
- [ ] **Fix:** Add camera head-bob when walking (subtle sine wave on Y position)
- [ ] **Test:** Run `npm run dev`, click canvas → pointer lock, WASD moves, can't walk through walls

### ✅ Checkpoint:
> Player can look around with mouse and walk with WASD in an empty dark scene. Pointer lock works on click. Can't walk through walls. Subtle head-bob on movement.

---

## 🔴 PHASE 2: Museum Architecture — Multi-Room Layout (Session 2)
**⏱️ Estimated:** 1.5-2 hours
**📚 Skills to READ FIRST:**
- `threejs-geometry/SKILL.md` — BoxGeometry, PlaneGeometry, CylinderGeometry
- `threejs-materials/SKILL.md` — MeshStandardMaterial, MeshPhysicalMaterial
- `threejs-textures/SKILL.md` — Texture repeat, UV mapping
- `threejs-lighting/SKILL.md` — AmbientLight, PointLight for doorways

### Files to CREATE:
```
src/components/canvas/Museum.jsx                  ← Master museum layout
src/components/canvas/rooms/Lobby.jsx             ← Entrance room (10×10×4)
src/components/canvas/rooms/GalleryRoom.jsx       ← Long corridor (8×30×5)
src/components/canvas/rooms/AboutRoom.jsx         ← Side room (8×8×4)
src/components/canvas/rooms/SkillsRoom.jsx        ← Circular room (12×12×5)
src/components/canvas/rooms/PortalRoom.jsx        ← Final room (8×8×6)
src/components/canvas/objects/Door.jsx            ← Archway between rooms
```

### Files to UPDATE:
```
src/data/museumBounds.js   ← Add ALL room boundaries + doorway gaps
src/components/canvas/Experience.jsx  ← Replace inline walls with <Museum />
```

### Tasks:
1. **Create `Museum.jsx`:**
   - Compose all 5 rooms in world space
   - Position according to PLAN.md layout diagram
   - Pass collision data to museumBounds

2. **Create each room component:**
   - Use `PlaneGeometry` for floors (rotated -90° X)
   - Use `BoxGeometry` for walls (thin boxes: width × height × 0.3)
   - Leave gaps in walls for doorways (2.5 units wide, 3 units tall)
   - Materials: `MeshStandardMaterial` with roughness/metalness tuned per surface
     - Floors: dark marble (#121212), roughness 0.3, metalness 0.15
     - Walls: dark concrete (#1d1d1d), roughness 0.85
     - Ceilings: very dark (#0d0d0d), roughness 0.9

3. **Create `Door.jsx`:**
   - Frame around doorway gap using 3 BoxGeometry pieces (sides + top)
   - Subtle emissive glow on edges (#6366f1, intensity 0.2)
   - Optional: PointLight at doorway for navigation guidance

4. **Update `museumBounds.js`:**
   - Define AABB colliders for ALL rooms' walls
   - Define doorway gaps (exclude from colliders)
   - Define ROOM_AABBS for room detection

5. **Update `Experience.jsx`:**
   - Replace inline walls with `<Museum />`
   - Keep ambient light, fog, and particles
   - Set fog: `args={['#050505', 1, 40]}`

### ✅ Checkpoint:
> Walk through 5 connected rooms via archway doorways. Walls, floors, ceilings all render. Player can't walk through walls. Doorways correctly allow passage.

---

## 🔴 PHASE 3: Museum Lighting & Atmosphere (Session 3)
**⏱️ Estimated:** 1-1.5 hours
**📚 Skills to READ FIRST:**
- `threejs-lighting/SKILL.md` — SpotLight, PointLight, shadow configuration
- `threejs-postprocessing/SKILL.md` — Bloom, Vignette, SSAO
- `threejs-shaders/SKILL.md` — Emissive effects (reference only)

### Files to CREATE:
```
src/components/canvas/objects/Spotlight.jsx  ← Configurable museum spotlight
```

### Files to UPDATE:
```
src/components/canvas/Effects.jsx     ← Bloom + Vignette post-processing
src/components/canvas/Particles.jsx   ← Museum dust motes
src/components/canvas/Experience.jsx  ← Add <Effects /> and update lighting
Per-room files                        ← Add room-specific spotlights
```

### Tasks:
1. **Create `Spotlight.jsx`:**
   - Wrap `<spotLight>` with sensible defaults for museum
   - Props: `position`, `target`, `color`, `intensity`, `angle`, `penumbra`
   - Use drei `<SpotLight>` for volumetric cone (optional)
   - Enable soft shadows: `shadow-mapSize={1024}`, `shadow-bias={-0.0001}`

2. **Update `Effects.jsx`** — Post-processing pipeline:
   ```jsx
   // Using @react-three/postprocessing
   <EffectComposer>
     <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
     <Vignette offset={0.3} darkness={0.7} />
   </EffectComposer>
   ```

3. **Update `Particles.jsx`** — Dust motes:
   - Reduce count to 500
   - Smaller size (0.005-0.01)
   - Slow upward + sideways drift
   - Very low opacity (0.15-0.3)

4. **Per-room lighting:**
   - Lobby: 2 spotlights on name text
   - Gallery: individual spotlights per wall position (for future frames)
   - Skills: cool-toned point lights for each pedestal position
   - About: warm single spotlight on portrait wall
   - Portal: blue/purple point lights, dramatic shadows

### ✅ Checkpoint:
> Museum feels atmospheric — dramatic spotlights create pools of light, dust particles drift through beams, dark corners have vignette. Bloom makes emissive elements glow.

---

## 🔴 PHASE 4: Gallery Wall — Project Frames (Session 4)
**⏱️ Estimated:** 2-2.5 hours
**📚 Skills to READ FIRST:**
- `threejs-textures/SKILL.md` — TextureLoader, image textures on planes, useTexture
- `threejs-interaction/SKILL.md` — Raycasting for hover/click detection
- `threejs-materials/SKILL.md` — Frame materials (metallic), glass effect
- `threejs-animation/SKILL.md` — Hover animations, procedural motion

### Files to CREATE:
```
src/components/canvas/objects/WallFrame.jsx   ← Framed project artwork
src/components/canvas/objects/InfoPanel.jsx   ← Museum label (drei Html)
src/components/ui/ProjectModal.jsx            ← Full project details overlay
```

### Files to UPDATE:
```
src/data/portfolio.js          ← Add 4-8 real projects with images
src/components/canvas/rooms/GalleryRoom.jsx  ← Mount frames on walls
src/components/ui/InteractionPrompt.jsx      ← Wire to raycasting
src/styles/index.css           ← Modal + info panel styles
```

### Tasks:
1. **Expand `portfolio.js`:**
   - Add 4-8 projects with screenshots (place in `public/textures/projects/`)
   - Include: `title`, `description`, `image`, `tech[]`, `liveUrl`, `githubUrl`, `color`, `year`
   - Generate placeholder images with `generate_image` tool if needed

2. **Create `WallFrame.jsx`:**
   - Outer frame: 4 BoxGeometry pieces forming picture frame
   - Material: dark wood metallic (`metalness: 0.7, roughness: 0.35, color: '#2a1f14'`)
   - Inner canvas: PlaneGeometry with project screenshot texture
   - Apply `emissive` so artwork is visible in dark (intensity 0.15)
   - Museum label below: `<Html>` from drei with title + year
   - **Interaction states:**
     - Default: normal appearance
     - Hover (player looking at it within 5 units): subtle glow, frame shifts forward 0.05
     - Active (press E): opens ProjectModal

3. **Create `InfoPanel.jsx`:**
   - `<Html>` from drei, `distanceFactor` for auto-scaling
   - Shows title, year, tech stack badge pills
   - Glassmorphism card styling
   - Only visible within ~4 units (`occlude` prop)

4. **Create `ProjectModal.jsx`:**
   - Full-screen overlay with glassmorphism backdrop
   - Large screenshot, title, description, tech tags, link buttons
   - Close with Escape or X button
   - Release pointer lock while open
   - CSS animation: scale up from center

5. **Mount in `GalleryRoom.jsx`:**
   - Distribute frames evenly along left and right walls
   - Add `<Spotlight>` aimed at each frame
   - Add red rope line (thin BoxGeometry) in front of frames

6. **Wire raycasting:**
   - In `PlayerController.jsx` or a new `useInteraction` hook
   - Cast ray from camera center (0,0) forward
   - If hits a WallFrame within 5 units → show InteractionPrompt
   - If E pressed → dispatch interaction event

### ✅ Checkpoint:
> Walk through gallery. See project screenshots in frames on walls. Look at one → "Press E" prompt. Press E → modal opens with project details. ESC closes. Spotlight on each frame.

---

## 🟡 PHASE 5: About Room — Bio & Personal Info (Session 5)
**⏱️ Estimated:** 1 hour
**📚 Skills to READ FIRST:**
- `threejs-textures/SKILL.md` — Photo texture
- `threejs-geometry/SKILL.md` — Decorative geometry shapes
- `threejs-animation/SKILL.md` — Float animation patterns

### Tasks:
1. **Populate `AboutRoom.jsx`:**
   - Large portrait/photo on back wall (reuse WallFrame, scaled up)
   - Bio text panels: `<Html>` mounted on walls (museum plaque style)
   - Split bio: Background, What I Do, Philosophy
   - 3D decorative shapes: `<Float>` from drei wrapping icosahedrons
   - Material: `MeshPhysicalMaterial` with `iridescence: 1`
   - Stats pedestals: 3 small CylinderGeometry with 3D numbers above
     - Years of Experience, Projects Completed, Technologies

2. **Update `portfolio.js`:**
   - Add `bio` object with sections
   - Add `stats` array

### ✅ Checkpoint:
> Walk into About room. See photo, bio text on walls, floating iridescent shapes, and stats on mini pedestals.

---

## 🔴 PHASE 6: Skills Room — Interactive Pedestals (Session 6)
**⏱️ Estimated:** 2 hours
**📚 Skills to READ FIRST:**
- `threejs-geometry/SKILL.md` — SphereGeometry, CylinderGeometry
- `threejs-animation/SKILL.md` — Float, rotate, procedural oscillation
- `threejs-interaction/SKILL.md` — Raycasting hover states
- `threejs-materials/SKILL.md` — Emissive, transmission (glass), iridescence
- `threejs-shaders/SKILL.md` — Energy glow shader for orbs

### Files to CREATE:
```
src/components/canvas/objects/Pedestal.jsx  ← Skill sculpture display
```

### Tasks:
1. **Create `Pedestal.jsx`:**
   - Base: CylinderGeometry (marble material, roughness 0.2, metalness 0.1)
   - Orb above: SphereGeometry floating with `<Float>` from drei
   - Orb material: `MeshPhysicalMaterial` with `transmission: 1, ior: 1.5` (glass)
   - Or: Custom `ShaderMaterial` with energy swirl (noise-based fragment shader)
   - Color matches skill category (frontend=cyan, backend=green, 3d=purple, animation=lime)
   - Size scales with skill level (normalize 0-100 → 0.3-0.8 radius)
   - Label: `<Text>` from drei below orb
   - Hover: glow brighter (`emissiveIntensity` lerp from 0.2 → 1.0)

2. **Expand `portfolio.js`:**
   - 8-12 skills with `id, name, level, category, color`

3. **Populate `SkillsRoom.jsx`:**
   - Arrange pedestals in circle (use cos/sin for positions)
   - Floor: `MeshPhysicalMaterial` with slight reflectivity
   - Color-coded ambient lighting per pedestal

4. **Interaction:**
   - Walk near → label fades in by distance
   - Look at (raycasting) → orb glows
   - Press E → detailed panel with category, level bar, years used

### ✅ Checkpoint:
> Walk into Skills room. Circle of pedestals with floating glowing orbs. Labels appear as you approach. Orbs glow when looked at.

---

## 🔴 PHASE 7: Portal Room — Contact & Social (Session 7)
**⏱️ Estimated:** 2 hours
**📚 Skills to READ FIRST:**
- `threejs-shaders/SKILL.md` — Noise functions, ShaderMaterial, uniforms
- `threejs-animation/SKILL.md` — Continuous shader animation
- `threejs-postprocessing/SKILL.md` — Enhanced bloom for portal
- `threejs-geometry/SKILL.md` — TorusGeometry for ring

### Files to CREATE:
```
src/shaders/portal.vert.glsl   ← Portal vertex shader
src/shaders/portal.frag.glsl   ← Portal fragment shader (swirling energy)
```

### Tasks:
1. **Portal ring:** `TorusGeometry(2, 0.15, 16, 100)` with emissive metallic
2. **Portal inner surface:**
   - `ShaderMaterial` with animated perlin noise
   - Uniforms: `time`, `color1` (#6366f1), `color2` (#a855f7), `playerDistance`
   - Fragment: swirling noise pattern that reacts to proximity
3. **Contact info panels:**
   - `<Html>` cards floating around portal (Email, GitHub, LinkedIn, Twitter)
   - Click → opens link in new tab
   - Glassmorphism styling
4. **"Let's Connect" 3D text:** `<Text>` from drei, emissive + bloom
5. **Room atmosphere:**
   - Blue/purple PointLights from portal
   - Intense dust particles near portal
   - Subtle camera shake when within 3 units

### ✅ Checkpoint:
> Walk into Portal room. See swirling energy portal with contact links. Shader animates continuously. Bloom makes portal glow dramatically.

---

## 🟡 PHASE 8: HUD & UI Polish (Session 8)
**⏱️ Estimated:** 1 hour
**📚 Skills:** CSS only — no Three.js skills needed

### Tasks:
1. **Enhance `HUD.jsx`:**
   - Room name with fade transition on change
   - Minimap (optional): rooms as rectangles + player dot
   - Controls hint: shown first 10 seconds then fade out
   - Glassmorphism styling

2. **Museum-themed loader (`Loader.jsx`):**
   - Dark background with "Entering Museum..."
   - Progress bar with door-opening animation
   - Tips: "Use WASD to move, Mouse to look"
   - Use `useProgress()` from drei

3. **Pause menu:**
   - ESC → release pointer lock + show overlay
   - Resume, Reset Position, Toggle Audio, Controls

4. **Update `index.css`:**
   - Modal styles, loader styles, minimap styles
   - Smooth transitions for all HUD elements

### ✅ Checkpoint:
> Clean HUD with crosshair, animated room name, fading controls hint. Loading screen works. Pause menu on ESC.

---

## 🟡 PHASE 9: Animations & Micro-Interactions (Session 9)
**⏱️ Estimated:** 1.5 hours
**📚 Skills to READ FIRST:**
- `threejs-animation/SKILL.md` — Procedural patterns, Spring, Oscillation
- `threejs-shaders/SKILL.md` — Animated uniforms

### Tasks:
1. **Room entrance animations:**
   - Track first entry per room (state object)
   - On first entry: lights fade in (0 → target), objects scale in (0 → 1)
   - Use `useFrame` + lerp for smooth transitions

2. **Continuous idle animations:**
   - Float bobbing on decorative shapes
   - Orb slow rotation
   - Portal shader continuous time uniform update
   - Dust particle drift

3. **Interaction feedback:**
   - Frame hover: emissive glow increase + frame shifts forward 0.05
   - Pedestal hover: orb pulses (scale oscillation)
   - Door proximity: arch emissive brightens
   - Walking: camera head-bob (sine on Y, ±0.03)

4. **Camera effects:**
   - Portal proximity: subtle noise on rotation (±0.001)
   - Keep ALL effects subtle

### ✅ Checkpoint:
> Rooms feel alive. Lights animate on first entry. Objects bob. Interactions have visual feedback. Walking has natural camera bob.

---

## 🟢 PHASE 10: Mobile & Performance (Session 10)
**⏱️ Estimated:** 1 hour
**📚 Skills:** Optimization — no skill files needed

### Tasks:
1. **Mobile detection + fallback:**
   - Detect touch devices
   - Option A: Virtual joystick + touch-drag look
   - Option B: Static "video tour" with key screenshots

2. **Performance:**
   - `<Instances>` for repeated geometries
   - `<Suspense>` per room for lazy loading
   - `<AdaptiveDpr>` and `<AdaptiveEvents>` from drei
   - Compress textures to `.webp`
   - Reduce particles on mobile (500 → 100)
   - Disable post-processing on mobile or reduce quality
   - `dpr={[1, 1]}` on mobile

3. **Frustum culling:**
   - Only render rooms within range (based on player position)
   - Use `visible` prop on room groups

### ✅ Checkpoint:
> 60fps on desktop, 30fps+ on mobile. Textures compressed. Mobile has alternative experience.

---

## 🟢 PHASE 11: Final Polish & Deploy (Session 11)
**⏱️ Estimated:** 45 min
**📚 Skills:** None — deployment phase

### Tasks:
1. **SEO in `index.html`:**
   - Title: "Ahmed Sakr — Interactive 3D Portfolio Museum"
   - Meta description, OG image, favicon

2. **Accessibility:**
   - Skip-to-content for screen readers
   - `prefers-reduced-motion`: show static fallback
   - ARIA labels on HUD elements

3. **Build & Deploy:**
   ```bash
   npm run build
   ```
   - Deploy to Vercel/Netlify/Cloudflare Pages

4. **README.md:** Screenshots, tech stack, how to run

### ✅ Final: Production-ready museum portfolio deployed.

---

## 📊 Quick Reference: Skill Usage Per Phase

| Phase | Skills to Read | Importance |
|-------|---------------|------------|
| 1 — Player Controller | `fundamentals`, `interaction` | 🔴 Critical |
| 2 — Museum Architecture | `geometry`, `materials`, `textures`, `lighting` | 🔴 Critical |
| 3 — Lighting & Atmosphere | `lighting`, `postprocessing`, `shaders` | 🔴 Critical |
| 4 — Gallery Frames | `textures`, `interaction`, `materials`, `animation` | 🔴 Critical |
| 5 — About Room | `textures`, `geometry`, `animation` | 🟡 Important |
| 6 — Skills Pedestals | `geometry`, `animation`, `interaction`, `materials`, `shaders` | 🔴 Critical |
| 7 — Portal Room | `shaders`, `animation`, `postprocessing`, `geometry` | 🔴 Critical |
| 8 — HUD & UI | None (CSS) | 🟡 Important |
| 9 — Animations | `animation`, `shaders` | 🟡 Important |
| 10 — Mobile & Perf | None (optimization) | 🟢 Nice to have |
| 11 — Deploy | None | 🟢 Nice to have |

---

## ⚠️ Critical Rules

1. **READ SKILL.md files BEFORE writing Three.js code.** They contain correct API signatures.
2. **Use R3F declarative syntax**, not imperative Three.js:
   - ✅ `<mesh><boxGeometry args={[1,3,0.1]} /><meshStandardMaterial color="#333" /></mesh>`
   - ❌ `new THREE.Mesh(new THREE.BoxGeometry(1,3,0.1), ...)`
3. **Use drei helpers:** `<Float>`, `<Text>`, `<Html>`, `<SpotLight>`, `useTexture`
4. **Follow phases in order.** Each depends on the previous.
5. **Test after each phase** with `npm run dev`.
6. **Commit after each phase** with descriptive message.
7. **Performance:** `useMemo` for expensive ops, keep `useFrame` light, dispose resources.
8. **Dark museum aesthetic:** Background #050505, dramatic spotlights, glassmorphism UI.

---

## 🚀 How to Start

```
Tell the AI:
"Read IMPLEMENTATION_PHASES.md, then execute Phase [N].
Read the listed skill files FIRST, then build all components.
Run npm run dev to verify the checkpoint."
```

**Start with Phase 1 to verify existing code, then Phase 2 to build rooms.**
