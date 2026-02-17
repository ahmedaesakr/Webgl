# Museum Environment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a fully immersive, interactive 3D museum environment with atmospheric lighting, physics-based movement, and curated exhibits.

**Architecture:** React Three Fiber (R3F) scene with 5 distinct rooms (Lobby, Gallery, About, Skills, Portal). First-person controls (PointerLock). GLSL shaders for special effects. Post-processing for cinematic look.

**Tech Stack:** React 19, Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing, GSAP.

---

## 📋 Tasks

### Task 1: Environment Shell & Atmosphere
**Files:**
- Modify: `src/components/canvas/rooms/RoomBuilder.jsx`
- Modify: `src/components/canvas/rooms/Lobby.jsx`
- Modify: `src/components/canvas/Experience.jsx`
- See: `threejs-geometry`, `threejs-materials`, `threejs-lighting`

**Step 1: Enhance RoomBuilder with PBR Materials**
Refactor `RoomBuilder` to accept texture props for floor/walls. Apply `MeshStandardMaterial` with `roughness: 0.2`, `metalness: 0.1` for a polished museum floor look.

**Step 2: Add Volumetric Atmosphere**
Add `<Environment preset="night" />` (drei) in `Experience.jsx` with low intensity for base reflections. Add `fog` to the scene (`<scene fog={new THREE.FogExp2('#101015', 0.03)} />`) to hide room edges and create depth.

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: enhance room materials and add atmospheric fog"
```

### Task 2: Dramatic Lighting System
**Files:**
- Create: `src/components/canvas/objects/MuseumSpotlight.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- See: `threejs-lighting`

**Step 1: Create Reusable Spotlight**
Create `MuseumSpotlight.jsx` using `SpotLight` from drei.
- Props: position, target, color, intensity.
- Features: `castShadow`, `attenuation`, `anglePower`.
- Visuals: Add a visible "light cone" volumetric effect if performance allows (or fake it with a transparent cylinder).

**Step 2: Install Lights in Gallery**
Place spotlights along the Gallery walls, aiming at where art will be.
Setup: 3 lights on left wall, 3 on right. Cool white (`#eeffff`), high intensity for contrast.

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: implement museum spotlight system"
```

### Task 3: Interactive Gallery Frames
**Files:**
- Create: `src/components/canvas/objects/WallFrame.jsx`
- Modify: `src/components/canvas/rooms/GalleryRoom.jsx`
- See: `threejs-interaction`, `threejs-materials`

**Step 1: Build Frame Component**
Create `WallFrame.jsx`.
- Geometry: BoxGeometries for the frame (wood/metal texture).
- Canvas: PlaneGeometry for the art area.
- Interaction: `onPointerOver` triggers scaled-up glow (emissive intensity). `onClick` triggers modal.

**Step 2: Mount Frames**
Add `WallFrame` instances to `GalleryRoom.jsx`, positioned under the spotlights created in Task 2. Use placeholder colors/textures for now.

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add interactive gallery frames"
```

### Task 4: Skills Room Pedestals
**Files:**
- Create: `src/components/canvas/objects/Pedestal.jsx`
- Modify: `src/components/canvas/rooms/SkillsRoom.jsx`
- See: `threejs-geometry`, `threejs-animation`

**Step 1: Create Pedestal Component**
Create `Pedestal.jsx`.
- Base: Cylinder (marble).
- Floating Item: Sphere/Geometry floating above (`<Float>` from drei).
- Animation: Gentle rotation and bobbing.

**Step 2: Populate Skills Room**
Arrange pedestals in a circle in the center of the room. Add a central point light to illuminate them.

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add animated skill pedestals"
```

### Task 5: Portal Room Shader Effect
**Files:**
- Create: `src/shaders/portal.frag.glsl`
- Create: `src/shaders/portal.vert.glsl`
- Create: `src/components/canvas/objects/Portal.jsx`
- See: `threejs-shaders`

**Step 1: Write Portal Shader**
Create GLSL shader with swirling noise pattern and time-based uniform animation. Creates a "magical" gateway look.

**Step 2: Build Portal Component**
Implement `Portal.jsx` using `ShaderMaterial` on a `CircleGeometry`. Add a glowing ring (`TorusGeometry`).

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add magical portal shader"
```

### Task 6: Post-Processing Polish
**Files:**
- Modify: `src/components/canvas/Effects.jsx`
- See: `threejs-postprocessing`

**Step 1: Configure EffectComposer**
Add `Bloom` (for glowing lights/portal), `Vignette` (for cinematic focus), and `Noise` (subtle film grain).

**Step 2: Commit**
```bash
git add -A
git commit -m "feat: add cinematic post-processing effects"
```

### Task 7: Player Movement & Collision
**Files:**
- Modify: `src/hooks/usePlayerMovement.js`
- See: `threejs-interaction`

**Step 1: Refine Collision**
Ensure `usePlayerMovement` strictly respects room bounds defined in `museumBounds.js`. Prevent walking through walls.

**Step 2: Add Head Bob**
Implement subtle camera Y-axis sine wave motion while moving to simulate walking.

**Step 3: Commit**
```bash
git add -A
git commit -m "fix: refine player collision and head bob"
```

---

## Execution Handoff

Plan complete and saved. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints.

**Which approach?**
