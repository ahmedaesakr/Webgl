import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Simple seeded pseudo-random number generator (mulberry32).
 * Allows reproducible textures when the same seed is used.
 */
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Create an off-screen canvas of the given size and return both the canvas and
 * its 2D rendering context.
 */
function makeCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  return { canvas, ctx }
}

/**
 * Wrap a canvas in a THREE.CanvasTexture with RepeatWrapping on both axes.
 */
function canvasToTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

// ---------------------------------------------------------------------------
// 1. Marble texture
// ---------------------------------------------------------------------------

/**
 * Create a white / gray marble texture with convincing multi-layer veining.
 *
 * The approach layers several visual passes on a canvas:
 *   - A warm white base fill
 *   - Broad, very faint "cloud" washes for colour variation
 *   - Multiple vein networks at different scales, opacities and widths
 *   - Fine hairline cracks for realism
 *
 * All drawing uses only the Canvas 2D API -- no external images.
 *
 * @param {number} [width=512]
 * @param {number} [height=512]
 * @returns {THREE.CanvasTexture}
 */
export function createMarbleTexture(width = 512, height = 512) {
  const { canvas, ctx } = makeCanvas(width, height)
  const rand = mulberry32(42)

  // -- Base fill: warm off-white -------------------------------------------
  ctx.fillStyle = '#f0ece6'
  ctx.fillRect(0, 0, width, height)

  // -- Broad colour variation (soft clouds) --------------------------------
  for (let i = 0; i < 30; i++) {
    const x = rand() * width
    const y = rand() * height
    const radius = 60 + rand() * 180
    const lightness = 85 + rand() * 10 // 85-95 %
    const alpha = 0.08 + rand() * 0.1

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `hsla(30, 10%, ${lightness}%, ${alpha})`)
    gradient.addColorStop(1, `hsla(30, 10%, ${lightness}%, 0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  // -- Helper: draw a single vein path -------------------------------------
  function drawVein(startX, startY, angle, length, lineWidth, alpha, gray) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.strokeStyle = `rgb(${gray}, ${gray}, ${gray})`
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(startX, startY)

    const segments = 8 + Math.floor(rand() * 12)
    const segLen = length / segments
    let cx = startX
    let cy = startY
    let currentAngle = angle

    for (let s = 0; s < segments; s++) {
      // gently meander
      currentAngle += (rand() - 0.5) * 0.6
      cx += Math.cos(currentAngle) * segLen
      cy += Math.sin(currentAngle) * segLen

      // Use quadratic curves for smoothness
      const cpx = cx + (rand() - 0.5) * segLen * 0.5
      const cpy = cy + (rand() - 0.5) * segLen * 0.5
      ctx.quadraticCurveTo(cpx, cpy, cx, cy)
    }

    ctx.stroke()
    ctx.restore()
  }

  // -- Helper: draw a branching vein network -------------------------------
  function drawVeinNetwork(opts) {
    const {
      count,
      minWidth,
      maxWidth,
      minAlpha,
      maxAlpha,
      minGray,
      maxGray,
      minLen,
      maxLen,
      branchChance,
    } = opts

    for (let i = 0; i < count; i++) {
      const sx = rand() * width * 1.2 - width * 0.1
      const sy = rand() * height * 1.2 - height * 0.1
      const angle = rand() * Math.PI * 2
      const lw = minWidth + rand() * (maxWidth - minWidth)
      const a = minAlpha + rand() * (maxAlpha - minAlpha)
      const g = Math.floor(minGray + rand() * (maxGray - minGray))
      const len = minLen + rand() * (maxLen - minLen)

      drawVein(sx, sy, angle, len, lw, a, g)

      // Occasional branch
      if (rand() < branchChance) {
        const bAngle = angle + (rand() - 0.5) * 1.2
        const bLen = len * (0.3 + rand() * 0.4)
        const midFraction = 0.3 + rand() * 0.4
        const bx = sx + Math.cos(angle) * len * midFraction
        const by = sy + Math.sin(angle) * len * midFraction
        drawVein(bx, by, bAngle, bLen, lw * 0.6, a * 0.7, g)
      }
    }
  }

  // -- Layer 1: very broad, faint veins (large-scale colour flow) ----------
  drawVeinNetwork({
    count: 12,
    minWidth: 12,
    maxWidth: 30,
    minAlpha: 0.03,
    maxAlpha: 0.07,
    minGray: 160,
    maxGray: 200,
    minLen: width * 0.6,
    maxLen: width * 1.4,
    branchChance: 0.3,
  })

  // -- Layer 2: medium veins (the primary pattern) -------------------------
  drawVeinNetwork({
    count: 18,
    minWidth: 2,
    maxWidth: 6,
    minAlpha: 0.06,
    maxAlpha: 0.15,
    minGray: 120,
    maxGray: 180,
    minLen: width * 0.3,
    maxLen: width * 1.0,
    branchChance: 0.5,
  })

  // -- Layer 3: thin sharp veins -------------------------------------------
  drawVeinNetwork({
    count: 25,
    minWidth: 0.5,
    maxWidth: 2,
    minAlpha: 0.08,
    maxAlpha: 0.2,
    minGray: 100,
    maxGray: 160,
    minLen: width * 0.15,
    maxLen: width * 0.6,
    branchChance: 0.6,
  })

  // -- Layer 4: fine hairline cracks ---------------------------------------
  drawVeinNetwork({
    count: 35,
    minWidth: 0.3,
    maxWidth: 0.8,
    minAlpha: 0.05,
    maxAlpha: 0.12,
    minGray: 80,
    maxGray: 150,
    minLen: width * 0.05,
    maxLen: width * 0.3,
    branchChance: 0.7,
  })

  // -- Subtle warm-toned overlay veins for depth ---------------------------
  for (let i = 0; i < 8; i++) {
    const sx = rand() * width
    const sy = rand() * height
    const angle = rand() * Math.PI * 2
    const len = width * (0.3 + rand() * 0.5)

    ctx.save()
    ctx.globalAlpha = 0.03 + rand() * 0.04
    ctx.strokeStyle = `hsl(25, 20%, ${60 + rand() * 20}%)`
    ctx.lineWidth = 4 + rand() * 10
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(sx, sy)

    let cx = sx
    let cy = sy
    let a = angle
    const segs = 6 + Math.floor(rand() * 6)
    const sl = len / segs

    for (let s = 0; s < segs; s++) {
      a += (rand() - 0.5) * 0.4
      cx += Math.cos(a) * sl
      cy += Math.sin(a) * sl
      ctx.lineTo(cx, cy)
    }

    ctx.stroke()
    ctx.restore()
  }

  return canvasToTexture(canvas)
}

// ---------------------------------------------------------------------------
// 2. Dark polished stone texture
// ---------------------------------------------------------------------------

/**
 * Create a dark polished stone texture.
 *
 * Built from:
 *   - A very dark base (#1a1a1f)
 *   - Per-pixel noise for surface grain
 *   - Scattered lighter mineral specks
 *   - Soft radial gradients for tonal variation (like natural stone slabs)
 *
 * @param {number} [width=512]
 * @param {number} [height=512]
 * @returns {THREE.CanvasTexture}
 */
export function createDarkStoneTexture(width = 512, height = 512) {
  const { canvas, ctx } = makeCanvas(width, height)
  const rand = mulberry32(137)

  // -- Base fill -----------------------------------------------------------
  ctx.fillStyle = '#1a1a1f'
  ctx.fillRect(0, 0, width, height)

  // -- Per-pixel grain noise -----------------------------------------------
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = (rand() - 0.5) * 18 // +/- 9
    data[i] = Math.max(0, Math.min(255, data[i] + noise)) // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // B
    // alpha stays 255
  }

  ctx.putImageData(imageData, 0, 0)

  // -- Subtle tonal variation (soft radial patches) ------------------------
  for (let i = 0; i < 20; i++) {
    const x = rand() * width
    const y = rand() * height
    const radius = 40 + rand() * 140
    const lightness = 8 + rand() * 8 // 8-16 %
    const alpha = 0.08 + rand() * 0.12

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `hsla(230, 8%, ${lightness}%, ${alpha})`)
    gradient.addColorStop(1, `hsla(230, 8%, ${lightness}%, 0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  // -- Mineral specks ------------------------------------------------------
  for (let i = 0; i < 800; i++) {
    const x = rand() * width
    const y = rand() * height
    const size = 0.5 + rand() * 1.5
    const lightness = 25 + rand() * 35 // 25-60 %
    const alpha = 0.15 + rand() * 0.35

    ctx.fillStyle = `hsla(220, 4%, ${lightness}%, ${alpha})`
    ctx.fillRect(x, y, size, size)
  }

  // -- Occasional brighter specks (quartz-like) ----------------------------
  for (let i = 0; i < 120; i++) {
    const x = rand() * width
    const y = rand() * height
    const size = 0.5 + rand() * 1.0

    ctx.fillStyle = `hsla(200, 5%, ${50 + rand() * 20}%, ${0.1 + rand() * 0.2})`
    ctx.fillRect(x, y, size, size)
  }

  // -- Very subtle veins (polished stone often shows faint pattern) --------
  for (let i = 0; i < 6; i++) {
    const sx = rand() * width
    const sy = rand() * height
    const angle = rand() * Math.PI * 2
    const len = width * (0.2 + rand() * 0.4)
    const segs = 5 + Math.floor(rand() * 5)
    const sl = len / segs

    ctx.save()
    ctx.globalAlpha = 0.03 + rand() * 0.04
    ctx.strokeStyle = `hsl(220, 5%, ${20 + rand() * 10}%)`
    ctx.lineWidth = 2 + rand() * 4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(sx, sy)

    let cx = sx
    let cy = sy
    let a = angle

    for (let s = 0; s < segs; s++) {
      a += (rand() - 0.5) * 0.5
      cx += Math.cos(a) * sl
      cy += Math.sin(a) * sl
      ctx.lineTo(cx, cy)
    }

    ctx.stroke()
    ctx.restore()
  }

  return canvasToTexture(canvas)
}

// ---------------------------------------------------------------------------
// 3. Concrete / plaster normal map
// ---------------------------------------------------------------------------

/**
 * Create a subtle bumpy normal map suitable for museum walls.
 *
 * Normal maps encode surface direction as colours:
 *   - R = X direction  (128 = flat)
 *   - G = Y direction  (128 = flat)
 *   - B = Z direction  (255 = pointing straight out, 128 = neutral for tangent-space)
 *
 * The "flat" base colour is rgb(128, 128, 255). We add small random deviations
 * to the R and G channels to simulate a fine bumpy concrete surface.
 *
 * @param {number} [width=256]
 * @param {number} [height=256]
 * @returns {THREE.CanvasTexture}
 */
export function createConcreteNormalTexture(width = 256, height = 256) {
  const { canvas, ctx } = makeCanvas(width, height)
  const rand = mulberry32(256)

  // -- Fill with flat normal (128, 128, 255) --------------------------------
  ctx.fillStyle = 'rgb(128, 128, 255)'
  ctx.fillRect(0, 0, width, height)

  // -- Per-pixel random bumps -----------------------------------------------
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  // First pass: raw random perturbations
  const strength = 12 // max deviation in R/G channels from 128

  for (let i = 0; i < data.length; i += 4) {
    const dx = (rand() - 0.5) * 2 * strength
    const dy = (rand() - 0.5) * 2 * strength

    data[i] = Math.max(0, Math.min(255, 128 + dx)) // R
    data[i + 1] = Math.max(0, Math.min(255, 128 + dy)) // G
    // B stays at 255 — pointing outward
    data[i + 2] = 255
    data[i + 3] = 255 // fully opaque
  }

  // Second pass: simple box-blur to avoid looking like raw static.
  // We blur only R and G (the normal XY components).
  const blurred = new Uint8ClampedArray(data.length)
  const blurRadius = 1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumR = 0
      let sumG = 0
      let count = 0

      for (let dy = -blurRadius; dy <= blurRadius; dy++) {
        for (let dx = -blurRadius; dx <= blurRadius; dx++) {
          // Wrap around for seamless tiling
          const sx = (x + dx + width) % width
          const sy = (y + dy + height) % height
          const si = (sy * width + sx) * 4
          sumR += data[si]
          sumG += data[si + 1]
          count++
        }
      }

      const di = (y * width + x) * 4
      blurred[di] = sumR / count
      blurred[di + 1] = sumG / count
      blurred[di + 2] = 255 // B
      blurred[di + 3] = 255 // A
    }
  }

  // Write blurred data back
  for (let i = 0; i < data.length; i++) {
    data[i] = blurred[i]
  }

  ctx.putImageData(imageData, 0, 0)

  return canvasToTexture(canvas)
}
